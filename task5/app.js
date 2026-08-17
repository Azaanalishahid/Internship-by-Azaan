const SUPABASE_URL = "https://nncwixdgnxjfgmkdbsxp.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_d3Ldvgtg39YLH8TpYYO-fA_QfF2WaWD";

const storageKey = "simple-posts-demo";
const userStorageKey = "simple-posts-current-user";

let supabaseClient = null;
if (window.supabase && typeof window.supabase.createClient === "function") {
  try {
    supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    console.log("Supabase client initialized successfully");
  } catch (err) {
    console.error("Failed to initialize Supabase client:", err);
  }
}

const elements = {
  userName: document.getElementById("userName"),
  setUser: document.getElementById("setUser"),
  activeUserCard: document.getElementById("activeUserCard"),
  userAvatar: document.getElementById("userAvatar"),
  userNameDisplay: document.getElementById("userNameDisplay"),
  userPostCount: document.getElementById("userPostCount"),
  postForm: document.getElementById("postForm"),
  title: document.getElementById("title"),
  content: document.getElementById("content"),
  charCounter: document.getElementById("charCounter"),
  clearAll: document.getElementById("clearAll"),
  status: document.getElementById("status"),
  posts: document.getElementById("posts"),
  categorySelector: document.getElementById("categorySelector"),
  searchInput: document.getElementById("searchInput"),
  filterTabs: document.getElementById("filterTabs"),
  quickChips: document.querySelectorAll(".chip-btn"),
  // Edit Modal elements
  editModal: document.getElementById("editModal"),
  editForm: document.getElementById("editForm"),
  editPostId: document.getElementById("editPostId"),
  editCategory: document.getElementById("editCategory"),
  editTitle: document.getElementById("editTitle"),
  editContent: document.getElementById("editContent"),
  closeEditModal: document.getElementById("closeEditModal"),
  cancelEditModal: document.getElementById("cancelEditModal"),
  toastContainer: document.getElementById("toastContainer"),
};

const state = {
  user: localStorage.getItem(userStorageKey) || "Ayesha",
  selectedCategory: "General",
  activeFilterTab: "All",
  searchQuery: "",
  posts: [],
  isSupabaseActive: false,
};

const avatarGradients = [
  "linear-gradient(135deg, #6366f1 0%, #a855f7 100%)",
  "linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)",
  "linear-gradient(135deg, #10b981 0%, #059669 100%)",
  "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
  "linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)",
];

function getAvatarStyle(name) {
  if (!name) return avatarGradients[0];
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % avatarGradients.length;
  return avatarGradients[index];
}

function loadLocalStoragePosts() {
  try {
    const raw = localStorage.getItem(storageKey);
    if (!raw) {
      return [
        {
          id: "seed-1",
          user: "Ayesha",
          title: "🚀 Welcome to PulsePosts!",
          content: "This is your personal interactive space connected to Supabase.",
          category: "Project",
          createdAt: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
        },
        {
          id: "seed-2",
          user: "Ayesha",
          title: "💡 Supabase Cloud Integration",
          content: "Posts are synced with your cloud database in real-time.",
          category: "Idea",
          createdAt: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
        }
      ];
    }
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

function saveLocalStoragePosts() {
  localStorage.setItem(storageKey, JSON.stringify(state.posts));
}

// Fetch posts from Supabase or fallback to LocalStorage
async function syncPosts() {
  if (!supabaseClient) {
    state.posts = loadLocalStoragePosts();
    state.isSupabaseActive = false;
    render();
    return;
  }

  try {
    const { data, error } = await supabaseClient
      .from("posts")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.warn("Supabase fetch warning, falling back to LocalStorage:", error.message);
      state.posts = loadLocalStoragePosts();
      state.isSupabaseActive = false;
    } else if (data) {
      state.posts = data.map((item) => ({
        id: String(item.id),
        user: item.user_name || item.user || "Ayesha",
        title: item.title,
        content: item.content,
        category: item.category || "General",
        createdAt: item.created_at || new Date().toISOString(),
      }));
      state.isSupabaseActive = true;
    }
  } catch (err) {
    console.error("Supabase sync error:", err);
    state.posts = loadLocalStoragePosts();
    state.isSupabaseActive = false;
  }

  render();
}

function showToast(message, type = "info") {
  if (!elements.toastContainer) return;
  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  
  let icon = `ℹ️`;
  if (type === "success") icon = `✅`;
  if (type === "danger") icon = `🗑️`;
  
  toast.innerHTML = `<span>${icon}</span> <span>${escapeHtml(message)}</span>`;
  elements.toastContainer.appendChild(toast);
  
  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateY(20px)";
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

function formatRelativeTime(isoString) {
  if (!isoString) return "";
  const date = new Date(isoString);
  const now = new Date();
  const diffInSeconds = Math.floor((now - date) / 1000);

  if (diffInSeconds < 60) return "Just now";
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;
  return date.toLocaleDateString();
}

function escapeHtml(value) {
  return String(value || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function setStatus(message) {
  if (elements.status) {
    elements.status.textContent = message;
  }
}

function setCurrentUser(name) {
  const trimmed = name.trim();
  if (!trimmed) {
    showToast("Please enter a valid user name", "danger");
    return;
  }
  state.user = trimmed;
  localStorage.setItem(userStorageKey, state.user);
  if (elements.userName) elements.userName.value = state.user;
  showToast(`Switched workspace to ${state.user}`, "info");
  render();
}

function renderUserHeader() {
  if (!state.user) {
    elements.userNameDisplay.textContent = "No user selected";
    elements.userAvatar.textContent = "?";
    elements.userAvatar.style.background = avatarGradients[0];
    elements.userPostCount.textContent = "0 posts";
    return;
  }

  const userPosts = state.posts.filter((p) => p.user === state.user);
  elements.userNameDisplay.textContent = state.user;
  elements.userAvatar.textContent = state.user.charAt(0).toUpperCase();
  elements.userAvatar.style.background = getAvatarStyle(state.user);
  elements.userPostCount.textContent = `${userPosts.length} ${userPosts.length === 1 ? "post" : "posts"}`;
}

function render() {
  renderUserHeader();

  let userPosts = state.posts.filter((post) => post.user === state.user);
  elements.posts.innerHTML = "";

  if (!state.user) {
    setStatus("Select or enter a user context to view personal workspace.");
    elements.posts.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">👤</div>
        <h4>No User Context Active</h4>
        <p>Type a name in the sidebar or pick a quick option to start.</p>
      </div>
    `;
    return;
  }

  if (state.activeFilterTab !== "All") {
    userPosts = userPosts.filter((p) => p.category === state.activeFilterTab);
  }

  if (state.searchQuery.trim() !== "") {
    const q = state.searchQuery.toLowerCase();
    userPosts = userPosts.filter(
      (p) => p.title.toLowerCase().includes(q) || p.content.toLowerCase().includes(q)
    );
  }

  const totalUserPostsCount = state.posts.filter((p) => p.user === state.user).length;
  const cloudBadge = state.isSupabaseActive ? " ☁️ [Supabase Cloud Live]" : " 💾 [LocalStorage]";

  if (totalUserPostsCount === 0) {
    setStatus(`Active session for ${state.user}.${cloudBadge} Workspace is empty.`);
    elements.posts.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">📝</div>
        <h4>No posts found for ${escapeHtml(state.user)}</h4>
        <p>Create your first post using the sidebar form!</p>
      </div>
    `;
    return;
  }

  if (userPosts.length === 0) {
    setStatus(`No posts match "${state.searchQuery || state.activeFilterTab}".${cloudBadge}`);
    elements.posts.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">🔍</div>
        <h4>No matching posts found</h4>
        <p>Try clearing your search query or changing category filter.</p>
      </div>
    `;
    return;
  }

  setStatus(`Viewing ${userPosts.length} of ${totalUserPostsCount} posts for ${state.user}.${cloudBadge}`);

  userPosts.forEach((post) => {
    const category = post.category || "General";
    const card = document.createElement("article");
    card.className = "post-card";
    card.innerHTML = `
      <div class="post-header">
        <div class="post-meta">
          <div class="post-avatar" style="background: ${getAvatarStyle(post.user)}">
            ${escapeHtml(post.user.charAt(0).toUpperCase())}
          </div>
          <div>
            <div class="post-author">${escapeHtml(post.user)}</div>
            <div class="post-time">${formatRelativeTime(post.createdAt)}</div>
          </div>
        </div>
        <span class="tag-badge cat-${category}">${escapeHtml(category)}</span>
      </div>
      <h3>${escapeHtml(post.title)}</h3>
      <p>${escapeHtml(post.content)}</p>
      <div class="post-actions">
        <button type="button" class="action-btn" data-action="edit" data-id="${post.id}">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
          </svg>
          Edit
        </button>
        <button type="button" class="action-btn delete-btn" data-action="delete" data-id="${post.id}">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="3 6 5 6 21 6"></polyline>
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
          </svg>
          Delete
        </button>
      </div>
    `;
    elements.posts.appendChild(card);
  });
}

function initEvents() {
  if (elements.userName) elements.userName.value = state.user;

  elements.setUser.addEventListener("click", () => {
    setCurrentUser(elements.userName.value);
  });

  elements.quickChips.forEach((chip) => {
    chip.addEventListener("click", () => {
      const name = chip.dataset.user;
      setCurrentUser(name);
    });
  });

  if (elements.categorySelector) {
    elements.categorySelector.addEventListener("click", (e) => {
      const chip = e.target.closest(".cat-chip");
      if (!chip) return;
      elements.categorySelector.querySelectorAll(".cat-chip").forEach((c) => c.classList.remove("active"));
      chip.classList.add("active");
      state.selectedCategory = chip.dataset.cat;
    });
  }

  if (elements.content && elements.charCounter) {
    elements.content.addEventListener("input", () => {
      const len = elements.content.value.length;
      elements.charCounter.textContent = `${len} / 500`;
    });
  }

  // Create Post
  elements.postForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (!state.user) {
      showToast("Please enter a user name first!", "danger");
      return;
    }

    const title = elements.title.value.trim();
    const content = elements.content.value.trim();

    if (!title || !content) {
      showToast("Add both a title and content", "danger");
      return;
    }

    const category = state.selectedCategory || "General";
    const nowIso = new Date().toISOString();

    if (supabaseClient && state.isSupabaseActive) {
      const { data, error } = await supabaseClient
        .from("posts")
        .insert([
          {
            user_name: state.user,
            title,
            content,
            category,
            created_at: nowIso,
          },
        ])
        .select();

      if (error) {
        console.error("Supabase insert error:", error);
        showToast(`Supabase Error: ${error.message}`, "danger");
      } else {
        showToast("Post published to Supabase Cloud!", "success");
        await syncPosts();
      }
    } else {
      // LocalStorage fallback
      const newPost = {
        id: crypto.randomUUID(),
        user: state.user,
        title,
        content,
        category,
        createdAt: nowIso,
      };
      state.posts.unshift(newPost);
      saveLocalStoragePosts();
      showToast("Post published locally!", "success");
      render();
    }

    elements.postForm.reset();
    if (elements.charCounter) elements.charCounter.textContent = "0 / 500";
  });

  // Clear All posts for user
  elements.clearAll.addEventListener("click", async () => {
    const userPosts = state.posts.filter((p) => p.user === state.user);
    if (userPosts.length === 0) {
      showToast("No posts to clear for this user", "info");
      return;
    }

    if (confirm(`Are you sure you want to clear all ${userPosts.length} posts for ${state.user}?`)) {
      if (supabaseClient && state.isSupabaseActive) {
        const { error } = await supabaseClient
          .from("posts")
          .delete()
          .eq("user_name", state.user);

        if (error) {
          showToast(`Supabase Error: ${error.message}`, "danger");
        } else {
          showToast(`Cleared all posts for ${state.user} on Supabase`, "danger");
          await syncPosts();
        }
      } else {
        state.posts = state.posts.filter((p) => p.user !== state.user);
        saveLocalStoragePosts();
        showToast(`Cleared all posts for ${state.user}`, "danger");
        render();
      }
    }
  });

  if (elements.searchInput) {
    elements.searchInput.addEventListener("input", (e) => {
      state.searchQuery = e.target.value;
      render();
    });
  }

  if (elements.filterTabs) {
    elements.filterTabs.addEventListener("click", (e) => {
      const tab = e.target.closest(".filter-tab");
      if (!tab) return;
      elements.filterTabs.querySelectorAll(".filter-tab").forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");
      state.activeFilterTab = tab.dataset.filter;
      render();
    });
  }

  // Edit & Delete actions
  elements.posts.addEventListener("click", async (event) => {
    const button = event.target.closest("button[data-action]");
    if (!button) return;

    const postId = button.dataset.id;
    const post = state.posts.find((item) => item.id === postId && item.user === state.user);
    if (!post) return;

    if (button.dataset.action === "delete") {
      if (supabaseClient && state.isSupabaseActive) {
        const { error } = await supabaseClient
          .from("posts")
          .delete()
          .eq("id", postId);

        if (error) {
          showToast(`Supabase Error: ${error.message}`, "danger");
        } else {
          showToast("Post deleted from Supabase", "danger");
          await syncPosts();
        }
      } else {
        state.posts = state.posts.filter((item) => item.id !== postId);
        saveLocalStoragePosts();
        showToast("Post deleted", "danger");
        render();
      }
      return;
    }

    if (button.dataset.action === "edit") {
      openEditModal(post);
    }
  });

  function openEditModal(post) {
    elements.editPostId.value = post.id;
    elements.editTitle.value = post.title;
    elements.editContent.value = post.content;
    elements.editCategory.value = post.category || "General";
    elements.editModal.classList.add("open");
  }

  function closeEditModal() {
    elements.editModal.classList.remove("open");
  }

  if (elements.closeEditModal) elements.closeEditModal.addEventListener("click", closeEditModal);
  if (elements.cancelEditModal) elements.cancelEditModal.addEventListener("click", closeEditModal);

  if (elements.editForm) {
    elements.editForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const id = elements.editPostId.value;
      const nextTitle = elements.editTitle.value.trim();
      const nextContent = elements.editContent.value.trim();
      const nextCategory = elements.editCategory.value;

      if (supabaseClient && state.isSupabaseActive) {
        const { error } = await supabaseClient
          .from("posts")
          .update({
            title: nextTitle,
            content: nextContent,
            category: nextCategory,
          })
          .eq("id", id);

        if (error) {
          showToast(`Supabase Error: ${error.message}`, "danger");
        } else {
          showToast("Post updated on Supabase!", "success");
          closeEditModal();
          await syncPosts();
        }
      } else {
        const post = state.posts.find((item) => item.id === id);
        if (post) {
          post.title = nextTitle;
          post.content = nextContent;
          post.category = nextCategory;
          saveLocalStoragePosts();
          showToast("Post updated!", "success");
          closeEditModal();
          render();
        }
      }
    });
  }
}

// Initialize application
initEvents();
syncPosts();