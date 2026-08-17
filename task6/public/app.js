document.addEventListener('DOMContentLoaded', () => {
  // Session LocalStorage State
  let sessionData = JSON.parse(localStorage.getItem('nexus_session')) || null;
  let userData = JSON.parse(localStorage.getItem('nexus_user')) || null;

  // Navigation Elements
  const navPills = document.querySelectorAll('.nav-pill');
  const sectionViews = document.querySelectorAll('.section-view');
  const sessionDot = document.getElementById('session-dot');
  const serverBadge = document.getElementById('server-status-badge');
  const serverText = document.getElementById('server-status-text');

  // Forms & Spinners
  const signupForm = document.getElementById('signup-form');
  const loginForm = document.getElementById('login-form');
  const signupSpin = document.getElementById('signup-spin');
  const loginSpin = document.getElementById('login-spin');
  const fillDemoBtn = document.getElementById('fill-demo-btn');
  const rateLimitBanner = document.getElementById('rate-limit-banner');

  // Profile Section Views & Elements
  const loggedOutState = document.getElementById('logged-out-state');
  const loggedInState = document.getElementById('logged-in-state');
  const profileName = document.getElementById('profile-display-name');
  const profileEmail = document.getElementById('profile-display-email');
  const avatarLetters = document.getElementById('avatar-letters');
  const valUserId = document.getElementById('val-user-id');
  const valCreatedAt = document.getElementById('val-created-at');
  const valLastLogin = document.getElementById('val-last-login');
  const valStatus = document.getElementById('val-status');
  
  // Buttons
  const logoutBtn = document.getElementById('logout-btn');
  const refreshBtn = document.getElementById('refresh-btn');

  // 1. Check Express Server Health
  checkHealth();

  // 2. Global Section Switching Function
  window.switchSection = function(targetSectionId) {
    navPills.forEach(pill => {
      if (pill.getAttribute('data-section') === targetSectionId) {
        pill.classList.add('active');
      } else {
        pill.classList.remove('active');
      }
    });

    sectionViews.forEach(sec => {
      if (sec.id === targetSectionId) {
        sec.classList.add('active-section');
      } else {
        sec.classList.remove('active-section');
      }
    });
  };

  // 3. Tab Pill Event Listeners
  navPills.forEach(pill => {
    pill.addEventListener('click', () => {
      const targetSec = pill.getAttribute('data-section');
      switchSection(targetSec);
    });
  });

  // 4. Password Toggle Buttons
  document.querySelectorAll('.toggle-pwd-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const input = btn.previousElementSibling;
      if (input.type === 'password') {
        input.type = 'text';
        btn.textContent = '🙈';
      } else {
        input.type = 'password';
        btn.textContent = '👁️';
      }
    });
  });

  // 5. Fill Demo Credentials
  if (fillDemoBtn) {
    fillDemoBtn.addEventListener('click', () => {
      document.getElementById('login-email').value = 'islamjutt.dev@gmail.com';
      document.getElementById('login-password').value = 'SuperSecret123!';
      showToast('success', 'Demo credentials pre-filled!');
    });
  }

  // Initial UI Render
  renderProfileUI();

  // 6. SIGN UP Form Submission -> Redirect to Login
  signupForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('signup-name').value.trim();
    const email = document.getElementById('signup-email').value.trim();
    const password = document.getElementById('signup-password').value;

    signupSpin.classList.remove('hidden');
    if (rateLimitBanner) rateLimitBanner.classList.add('hidden');

    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Registration failed.');
      }

      showToast('success', 'Account created! Redirecting to Sign In screen...');

      // Pre-fill email in Login form
      document.getElementById('login-email').value = email;
      document.getElementById('login-password').value = password;

      // AUTOMATIC REDIRECT TO LOGIN SECTION
      setTimeout(() => {
        switchSection('login-section');
      }, 1000);

    } catch (err) {
      if (err.message && err.message.toLowerCase().includes('rate limit')) {
        showToast('error', '⚠️ Supabase Email Rate Limit Reached (429). See instructions below.');
        if (rateLimitBanner) rateLimitBanner.classList.remove('hidden');
      } else {
        showToast('error', err.message);
      }
    } finally {
      signupSpin.classList.add('hidden');
    }
  });

  // 7. LOGIN Form Submission -> Redirect to Profile with Full User Data
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email').value.trim();
    const password = document.getElementById('login-password').value;

    loginSpin.classList.remove('hidden');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Sign in failed.');
      }

      sessionData = data.data.session;
      userData = data.data.user;

      if (data.data.custom_table_record) {
        userData.custom_record = data.data.custom_table_record;
      }

      saveState();

      showToast('success', 'Login successful! Opening your profile...');
      renderProfileUI();

      // AUTOMATIC REDIRECT TO PROFILE SECTION
      setTimeout(() => {
        switchSection('profile-section');
      }, 800);

    } catch (err) {
      showToast('error', err.message);
    } finally {
      loginSpin.classList.add('hidden');
    }
  });

  // 8. LOGOUT Event Handler
  logoutBtn.addEventListener('click', async () => {
    if (!sessionData || !sessionData.access_token) {
      clearState();
      switchSection('login-section');
      return;
    }

    try {
      const res = await fetch('/api/auth/logout', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${sessionData.access_token}` }
      });
      const data = await res.json();
      showToast('success', data.message || 'Signed out successfully.');
    } catch (err) {
      console.warn('Logout note:', err);
    } finally {
      clearState();
      switchSection('login-section');
    }
  });

  // 9. REFRESH TOKEN Event Handler
  refreshBtn.addEventListener('click', async () => {
    if (!sessionData || !sessionData.refresh_token) {
      showToast('error', 'No refresh token available.');
      return;
    }

    try {
      const res = await fetch('/api/auth/refresh', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refresh_token: sessionData.refresh_token })
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Failed to refresh session.');
      }

      sessionData = data.data.session;
      saveState();
      showToast('success', 'Session refreshed successfully!');
      renderProfileUI();
    } catch (err) {
      showToast('error', err.message);
    }
  });

  // Helper Functions
  async function checkHealth() {
    try {
      const res = await fetch('/health');
      if (res.ok) {
        serverBadge.style.display = 'flex';
        serverText.textContent = 'Server Active';
      }
    } catch {
      serverText.textContent = 'Server Offline';
    }
  }

  async function fetchLiveProfile() {
    if (!sessionData || !sessionData.access_token) return;

    try {
      const res = await fetch('/api/auth/me', {
        headers: { 'Authorization': `Bearer ${sessionData.access_token}` }
      });

      const data = await res.json();

      if (res.ok && data.success) {
        userData = data.data.user;
        if (data.data.custom_table_record) {
          userData.custom_record = data.data.custom_table_record;
        }
        saveState();
        updateProfileFields();
      } else {
        throw new Error(data.message || 'Session expired.');
      }
    } catch (err) {
      showToast('error', 'Session expired. Please sign in again.');
      clearState();
      switchSection('login-section');
    }
  }

  function updateProfileFields() {
    const displayName = userData?.user_metadata?.display_name || userData?.custom_record?.full_name || userData?.email?.split('@')[0] || 'User Profile';
    const displayEmail = userData?.email || 'N/A';

    profileName.textContent = displayName;
    profileEmail.textContent = displayEmail;

    // Generate Initials
    const parts = displayName.trim().split(' ');
    const initials = parts.length > 1 
      ? (parts[0][0] + parts[1][0]).toUpperCase()
      : displayName.substring(0, 2).toUpperCase();
    avatarLetters.textContent = initials;

    if (valUserId) valUserId.textContent = userData?.id || 'N/A';
    if (valCreatedAt) valCreatedAt.textContent = userData?.created_at ? new Date(userData.created_at).toLocaleString() : 'N/A';
    if (valLastLogin) valLastLogin.textContent = userData?.last_sign_in_at ? new Date(userData.last_sign_in_at).toLocaleString() : 'Just Now';
    if (valStatus) valStatus.textContent = userData?.custom_record?.status || 'Active Member';
  }

  function renderProfileUI() {
    if (sessionData && sessionData.access_token) {
      sessionDot.classList.add('online');
      loggedOutState.classList.add('hidden');
      loggedInState.classList.remove('hidden');

      updateProfileFields();
      fetchLiveProfile();
    } else {
      sessionDot.classList.remove('online');
      loggedOutState.classList.remove('hidden');
      loggedInState.classList.add('hidden');
    }
  }

  function saveState() {
    localStorage.setItem('nexus_session', JSON.stringify(sessionData));
    localStorage.setItem('nexus_user', JSON.stringify(userData));
  }

  function clearState() {
    sessionData = null;
    userData = null;
    localStorage.removeItem('nexus_session');
    localStorage.removeItem('nexus_user');
    renderProfileUI();
  }

  function showToast(type, msg) {
    const container = document.getElementById('toast-wrapper');
    const toast = document.createElement('div');
    toast.className = `toast-msg ${type}`;
    toast.innerHTML = `
      <span>${type === 'success' ? '✅' : '❌'}</span>
      <span>${msg}</span>
    `;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(100%)';
      setTimeout(() => toast.remove(), 350);
    }, 4500);
  }
});
