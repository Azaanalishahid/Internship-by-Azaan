const SUPABASE_URL = 'https://nncwixdgnxjfgmkdbsxp.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_d3Ldvgtg39YLH8TpYYO-fA_QfF2WaWD';
const USERS_TABLE = 'users';

const statusEl = document.getElementById('connection-status');
const usersBody = document.getElementById('users-tbody');

function isConfigured() {
  return !SUPABASE_URL.includes('YOUR_PROJECT') && !SUPABASE_ANON_KEY.includes('YOUR_SUPABASE_ANON_KEY');
}

function renderUserRow(user) {
  return `
    <tr>
      <td>${user.name ?? 'Unknown user'}</td>
      <td>${user.email ?? 'No email'}</td>
      <td>${user.age ?? 'n/a'}</td>
      <td>${user.created_at ? new Date(user.created_at).toLocaleString() : '—'}</td>
    </tr>
  `;
}

function renderStatus(message, isError = false) {
  if (!statusEl) {
    return;
  }

  statusEl.textContent = message;
  statusEl.style.background = isError ? 'rgba(255, 106, 106, 0.1)' : 'rgba(124, 247, 212, 0.08)';
  statusEl.style.borderColor = isError ? 'rgba(255, 106, 106, 0.22)' : 'rgba(124, 247, 212, 0.18)';
}

async function loadUsers() {
  if (!isConfigured()) {
    renderStatus('Waiting for Supabase credentials... update script.js to load live users.', false);
    return;
  }

  const client = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  renderStatus('Connected. Loading users from public.users...', false);

  const { data, error } = await client
    .from(USERS_TABLE)
    .select('id, name, email, age, created_at')
    .order('created_at', { ascending: false });

  if (error) {
    renderStatus(`Supabase error: ${error.message}`, true);
    return;
  }

  const rows = Array.isArray(data) ? data : [];
  usersBody.innerHTML = rows.length
    ? rows.map(renderUserRow).join('')
    : '<tr><td colspan="4" class="empty-state">No users found.</td></tr>';

  renderStatus(`Connected to public.users. Loaded ${rows.length} user(s).`, false);
}

loadUsers().catch((error) => {
  renderStatus(`Unable to connect: ${error.message}`, true);
});