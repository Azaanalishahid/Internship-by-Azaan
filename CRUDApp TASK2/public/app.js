/**
 * BookVault - Interactive Client Application JavaScript
 */

// Application State
const state = {
  books: [],
  stats: {},
  activeGenre: 'All',
  sortBy: 'id',
  order: 'asc',
  view: 'grid',
  searchQuery: '',
  activeBook: null,
  activeApiEndpoint: 'get-books'
};

// DOM Element Selectors
const elements = {
  // Stats
  statTotalBooks: document.getElementById('statTotalBooks'),
  statTotalStock: document.getElementById('statTotalStock'),
  statAvgRating: document.getElementById('statAvgRating'),
  statTotalGenres: document.getElementById('statTotalGenres'),

  // Controls & Inputs
  searchInput: document.getElementById('searchInput'),
  clearSearchBtn: document.getElementById('clearSearchBtn'),
  genrePills: document.getElementById('genrePills'),
  sortBySelect: document.getElementById('sortBySelect'),
  sortOrderBtn: document.getElementById('sortOrderBtn'),
  sortOrderIcon: document.getElementById('sortOrderIcon'),
  gridViewBtn: document.getElementById('gridViewBtn'),
  tableViewBtn: document.getElementById('tableViewBtn'),

  // Catalog Containers
  bookGrid: document.getElementById('bookGrid'),
  bookTableWrapper: document.getElementById('bookTableWrapper'),
  bookTableBody: document.getElementById('bookTableBody'),
  loadingState: document.getElementById('loadingState'),
  emptyState: document.getElementById('emptyState'),
  resetFilterBtn: document.getElementById('resetFilterBtn'),
  emptySeedBtn: document.getElementById('emptySeedBtn'),
  seedDataBtn: document.getElementById('seedDataBtn'),
  addBookBtn: document.getElementById('addBookBtn'),

  // Form Modal
  bookModal: document.getElementById('bookModal'),
  modalTitle: document.getElementById('modalTitle'),
  bookForm: document.getElementById('bookForm'),
  bookIdInput: document.getElementById('bookId'),
  bookTitleInput: document.getElementById('bookTitle'),
  bookAuthorInput: document.getElementById('bookAuthor'),
  bookGenreSelect: document.getElementById('bookGenre'),
  bookYearInput: document.getElementById('bookYear'),
  bookPriceInput: document.getElementById('bookPrice'),
  bookRatingInput: document.getElementById('bookRating'),
  bookStockInput: document.getElementById('bookStock'),
  bookCoverInput: document.getElementById('bookCover'),
  bookDescriptionInput: document.getElementById('bookDescription'),
  closeModalBtn: document.getElementById('closeModalBtn'),
  cancelModalBtn: document.getElementById('cancelModalBtn'),
  saveBtnText: document.getElementById('saveBtnText'),

  // Detail Modal
  detailModal: document.getElementById('detailModal'),
  closeDetailBtn: document.getElementById('closeDetailBtn'),
  detailCover: document.getElementById('detailCover'),
  detailGenre: document.getElementById('detailGenre'),
  detailTitle: document.getElementById('detailTitle'),
  detailAuthor: document.getElementById('detailAuthor'),
  detailYear: document.getElementById('detailYear'),
  detailRating: document.getElementById('detailRating'),
  detailPrice: document.getElementById('detailPrice'),
  detailStock: document.getElementById('detailStock'),
  detailIsbn: document.getElementById('detailIsbn'),
  detailDescriptionText: document.getElementById('detailDescriptionText'),
  detailEditBtn: document.getElementById('detailEditBtn'),
  detailDeleteBtn: document.getElementById('detailDeleteBtn'),

  // Delete Modal
  deleteModal: document.getElementById('deleteModal'),
  closeDeleteBtn: document.getElementById('closeDeleteBtn'),
  cancelDeleteBtn: document.getElementById('cancelDeleteBtn'),
  confirmDeleteBtn: document.getElementById('confirmDeleteBtn'),
  deleteBookTitle: document.getElementById('deleteBookTitle'),

  // API Docs Modal
  apiDocsBtn: document.getElementById('apiDocsBtn'),
  apiDocsModal: document.getElementById('apiDocsModal'),
  closeApiDocsBtn: document.getElementById('closeApiDocsBtn'),
  apiMethodTitle: document.getElementById('apiMethodTitle'),
  apiDesc: document.getElementById('apiDesc'),
  requestBodyContainer: document.getElementById('requestBodyContainer'),
  apiRequestJson: document.getElementById('apiRequestJson'),
  runApiTestBtn: document.getElementById('runApiTestBtn'),
  responseStatus: document.getElementById('responseStatus'),
  apiResponseJson: document.getElementById('apiResponseJson'),

  // Toast Container
  toastContainer: document.getElementById('toastContainer')
};

// Initialize Application
document.addEventListener('DOMContentLoaded', () => {
  setupEventListeners();
  loadData();
});

// Load Books & Statistics
async function loadData() {
  showLoading(true);
  try {
    await Promise.all([fetchBooks(), fetchStats()]);
  } catch (error) {
    showToast('Failed to load book data', 'error');
    console.error(error);
  } finally {
    showLoading(false);
  }
}

// Fetch Books from API
async function fetchBooks() {
  const params = new URLSearchParams();
  if (state.searchQuery) params.append('search', state.searchQuery);
  if (state.activeGenre !== 'All') params.append('genre', state.activeGenre);
  if (state.sortBy) params.append('sortBy', state.sortBy);
  if (state.order) params.append('order', state.order);

  const res = await fetch(`/api/books?${params.toString()}`);
  if (!res.ok) throw new Error('Failed to fetch books');

  const books = await res.json();
  state.books = books;
  renderCatalog();
}

// Fetch Statistics from API
async function fetchStats() {
  const res = await fetch('/api/books/stats');
  if (!res.ok) return;

  const stats = await res.json();
  state.stats = stats;

  elements.statTotalBooks.textContent = stats.totalBooks || 0;
  elements.statTotalStock.textContent = stats.totalStock || 0;
  elements.statAvgRating.textContent = stats.avgRating || '0.0';
  elements.statTotalGenres.textContent = Object.keys(stats.genreCounts || {}).length;
}

// Render Book Catalog (Grid / Table view)
function renderCatalog() {
  if (state.books.length === 0) {
    elements.bookGrid.classList.add('hidden');
    elements.bookTableWrapper.classList.add('hidden');
    elements.emptyState.classList.remove('hidden');
    return;
  }

  elements.emptyState.classList.add('hidden');

  if (state.view === 'grid') {
    elements.bookTableWrapper.classList.add('hidden');
    elements.bookGrid.classList.remove('hidden');
    renderGrid();
  } else {
    elements.bookGrid.classList.add('hidden');
    elements.bookTableWrapper.classList.remove('hidden');
    renderTable();
  }
}

// Render Grid View Cards
function renderGrid() {
  elements.bookGrid.innerHTML = state.books.map((book) => {
    const stockBadgeClass = book.stock > 10 ? 'in-stock' : book.stock > 0 ? 'low-stock' : 'out-of-stock';
    const stockText = book.stock > 0 ? `${book.stock} in stock` : 'Out of Stock';

    return `
      <div class="book-card" data-id="${book.id}">
        <div class="card-cover">
          <img src="${escapeHtml(book.coverImage)}" alt="${escapeHtml(book.title)}" onerror="this.src='https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80'">
          <div class="cover-overlay"></div>
          <span class="badge badge-genre badge-float-genre">${escapeHtml(book.genre || 'General')}</span>
          <span class="badge-float-rating"><i class="fa-solid fa-star"></i> ${book.rating || '4.5'}</span>
        </div>
        <div class="card-body">
          <h3 class="card-title">${escapeHtml(book.title)}</h3>
          <p class="card-author">by ${escapeHtml(book.author)} (${book.publishedYear || 'N/A'})</p>
          <p class="card-desc">${escapeHtml(book.description || 'No description available.')}</p>
          
          <div class="card-meta-bar">
            <span class="price-tag">$${Number(book.price || 0).toFixed(2)}</span>
            <span class="stock-tag ${stockBadgeClass}">${stockText}</span>
          </div>

          <div class="card-actions">
            <button class="btn btn-secondary btn-sm view-details-btn" onclick="openDetailModal(${book.id})">
              <i class="fa-solid fa-eye"></i> Details
            </button>
            <button class="btn btn-secondary btn-sm edit-book-btn" onclick="openEditModal(${book.id})">
              <i class="fa-solid fa-pen-to-square"></i> Edit
            </button>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

// Render Table View Rows
function renderTable() {
  elements.bookTableBody.innerHTML = state.books.map((book) => {
    const stockBadgeClass = book.stock > 10 ? 'in-stock' : book.stock > 0 ? 'low-stock' : 'out-of-stock';

    return `
      <tr>
        <td>
          <img class="table-cover" src="${escapeHtml(book.coverImage)}" alt="Cover" onerror="this.src='https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80'">
        </td>
        <td>
          <strong>${escapeHtml(book.title)}</strong>
          <div style="font-size:0.75rem; color:var(--text-muted);">${escapeHtml(book.author)}</div>
        </td>
        <td><span class="badge badge-genre">${escapeHtml(book.genre || 'General')}</span></td>
        <td>${book.publishedYear || '-'}</td>
        <td><strong>$${Number(book.price || 0).toFixed(2)}</strong></td>
        <td><span style="color:var(--status-amber); font-weight:700;"><i class="fa-solid fa-star"></i> ${book.rating || '4.5'}</span></td>
        <td><span class="stock-tag ${stockBadgeClass}">${book.stock || 0}</span></td>
        <td>
          <div class="table-actions">
            <button class="btn-icon-box" onclick="openDetailModal(${book.id})" title="View Details"><i class="fa-solid fa-eye"></i></button>
            <button class="btn-icon-box" onclick="openEditModal(${book.id})" title="Edit Book"><i class="fa-solid fa-pen-to-square"></i></button>
            <button class="btn-icon-box text-danger" onclick="openDeleteModal(${book.id}, '${escapeHtml(book.title)}')" title="Delete Book"><i class="fa-solid fa-trash"></i></button>
          </div>
        </td>
      </tr>
    `;
  }).join('');
}

// Event Listeners Setup
function setupEventListeners() {
  // Search
  elements.searchInput.addEventListener('input', (e) => {
    state.searchQuery = e.target.value.trim();
    if (state.searchQuery) {
      elements.clearSearchBtn.classList.remove('hidden');
    } else {
      elements.clearSearchBtn.classList.add('hidden');
    }
    fetchBooks();
  });

  elements.clearSearchBtn.addEventListener('click', () => {
    elements.searchInput.value = '';
    state.searchQuery = '';
    elements.clearSearchBtn.classList.add('hidden');
    fetchBooks();
  });

  // Genre Filters
  elements.genrePills.addEventListener('click', (e) => {
    if (!e.target.classList.contains('pill')) return;

    document.querySelectorAll('.genre-pills .pill').forEach(p => p.classList.remove('active'));
    e.target.classList.add('active');

    state.activeGenre = e.target.dataset.genre;
    fetchBooks();
  });

  // Sort Controls
  elements.sortBySelect.addEventListener('change', (e) => {
    state.sortBy = e.target.value;
    fetchBooks();
  });

  elements.sortOrderBtn.addEventListener('click', () => {
    state.order = state.order === 'asc' ? 'desc' : 'asc';
    elements.sortOrderIcon.className = state.order === 'asc' ? 'fa-solid fa-arrow-up-a-z' : 'fa-solid fa-arrow-down-z-a';
    fetchBooks();
  });

  // Layout View Switcher
  elements.gridViewBtn.addEventListener('click', () => {
    state.view = 'grid';
    elements.gridViewBtn.classList.add('active');
    elements.tableViewBtn.classList.remove('active');
    renderCatalog();
  });

  elements.tableViewBtn.addEventListener('click', () => {
    state.view = 'table';
    elements.tableViewBtn.classList.add('active');
    elements.gridViewBtn.classList.remove('active');
    renderCatalog();
  });

  // Modals Open/Close
  elements.addBookBtn.addEventListener('click', openAddModal);
  elements.closeModalBtn.addEventListener('click', closeAddModal);
  elements.cancelModalBtn.addEventListener('click', closeAddModal);

  elements.closeDetailBtn.addEventListener('click', () => elements.detailModal.classList.add('hidden'));
  elements.closeDeleteBtn.addEventListener('click', () => elements.deleteModal.classList.add('hidden'));
  elements.cancelDeleteBtn.addEventListener('click', () => elements.deleteModal.classList.add('hidden'));

  // Save Book Form Submit
  elements.bookForm.addEventListener('submit', handleSaveBook);

  // Confirm Delete
  elements.confirmDeleteBtn.addEventListener('click', handleDeleteBook);

  // Seed Data
  elements.seedDataBtn.addEventListener('click', handleSeedData);
  elements.emptySeedBtn.addEventListener('click', handleSeedData);
  elements.resetFilterBtn.addEventListener('click', () => {
    state.searchQuery = '';
    state.activeGenre = 'All';
    elements.searchInput.value = '';
    document.querySelectorAll('.genre-pills .pill').forEach(p => p.classList.remove('active'));
    document.querySelector('.genre-pills .pill[data-genre="All"]').classList.add('active');
    fetchBooks();
  });

  // Detail Modal Actions
  elements.detailEditBtn.addEventListener('click', () => {
    if (state.activeBook) {
      elements.detailModal.classList.add('hidden');
      openEditModal(state.activeBook.id);
    }
  });

  elements.detailDeleteBtn.addEventListener('click', () => {
    if (state.activeBook) {
      elements.detailModal.classList.add('hidden');
      openDeleteModal(state.activeBook.id, state.activeBook.title);
    }
  });

  // API Explorer Modal
  elements.apiDocsBtn.addEventListener('click', openApiDocsModal);
  elements.closeApiDocsBtn.addEventListener('click', () => elements.apiDocsModal.classList.add('hidden'));
  
  document.querySelectorAll('.api-endpoints-list .endpoint-item').forEach(item => {
    item.addEventListener('click', (e) => {
      document.querySelectorAll('.api-endpoints-list .endpoint-item').forEach(i => i.classList.remove('active'));
      const target = e.currentTarget;
      target.classList.add('active');
      switchApiEndpoint(target.dataset.endpoint);
    });
  });

  elements.runApiTestBtn.addEventListener('click', executeApiTest);
}

// Open Add Book Modal
function openAddModal() {
  elements.modalTitle.innerHTML = '<i class="fa-solid fa-plus-circle"></i> Add New Book';
  elements.saveBtnText.textContent = 'Save Book';
  elements.bookForm.reset();
  elements.bookIdInput.value = '';
  elements.bookModal.classList.remove('hidden');
}

// Open Edit Book Modal
function openEditModal(id) {
  const book = state.books.find(b => b.id === id);
  if (!book) return;

  elements.modalTitle.innerHTML = '<i class="fa-solid fa-pen-to-square"></i> Edit Book';
  elements.saveBtnText.textContent = 'Update Book';

  elements.bookIdInput.value = book.id;
  elements.bookTitleInput.value = book.title || '';
  elements.bookAuthorInput.value = book.author || '';
  elements.bookGenreSelect.value = book.genre || 'Fantasy';
  elements.bookYearInput.value = book.publishedYear || '';
  elements.bookPriceInput.value = book.price || '';
  elements.bookRatingInput.value = book.rating || '';
  elements.bookStockInput.value = book.stock || '';
  elements.bookCoverInput.value = book.coverImage || '';
  elements.bookDescriptionInput.value = book.description || '';

  elements.bookModal.classList.remove('hidden');
}

function closeAddModal() {
  elements.bookModal.classList.add('hidden');
}

// Handle Create / Update Book Form Submission
async function handleSaveBook(e) {
  e.preventDefault();

  const id = elements.bookIdInput.value;
  const payload = {
    title: elements.bookTitleInput.value.trim(),
    author: elements.bookAuthorInput.value.trim(),
    genre: elements.bookGenreSelect.value,
    publishedYear: elements.bookYearInput.value ? Number(elements.bookYearInput.value) : null,
    price: elements.bookPriceInput.value ? Number(elements.bookPriceInput.value) : 19.99,
    rating: elements.bookRatingInput.value ? Number(elements.bookRatingInput.value) : 4.5,
    stock: elements.bookStockInput.value ? Number(elements.bookStockInput.value) : 10,
    coverImage: elements.bookCoverInput.value.trim() || undefined,
    description: elements.bookDescriptionInput.value.trim() || undefined
  };

  try {
    let res;
    if (id) {
      // Update (PUT)
      res = await fetch(`/api/books/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
    } else {
      // Create (POST)
      res = await fetch('/api/books', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
    }

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || 'Failed to save book');
    }

    showToast(id ? 'Book updated successfully!' : 'New book added successfully!', 'success');
    closeAddModal();
    loadData();
  } catch (error) {
    showToast(error.message, 'error');
  }
}

// Open Detail View Modal
function openDetailModal(id) {
  const book = state.books.find(b => b.id === id);
  if (!book) return;

  state.activeBook = book;

  elements.detailCover.src = book.coverImage || 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80';
  elements.detailGenre.textContent = book.genre || 'General';
  elements.detailTitle.textContent = book.title;
  elements.detailAuthor.textContent = `by ${book.author}`;
  elements.detailYear.textContent = book.publishedYear || 'Unknown';
  elements.detailRating.textContent = `⭐ ${book.rating || '4.5'} / 5.0`;
  elements.detailPrice.textContent = `$${Number(book.price || 0).toFixed(2)}`;
  elements.detailStock.textContent = `${book.stock || 0} copies`;
  elements.detailIsbn.textContent = book.isbn || 'N/A';
  elements.detailDescriptionText.textContent = book.description || 'No description provided.';

  elements.detailModal.classList.remove('hidden');
}

// Open Delete Confirmation Modal
function openDeleteModal(id, title) {
  state.activeBook = { id, title };
  elements.deleteBookTitle.textContent = `"${title}"`;
  elements.deleteModal.classList.remove('hidden');
}

// Delete Book Action
async function handleDeleteBook() {
  if (!state.activeBook) return;

  try {
    const res = await fetch(`/api/books/${state.activeBook.id}`, { method: 'DELETE' });
    if (!res.ok && res.status !== 204) throw new Error('Failed to delete book');

    showToast('Book deleted successfully', 'info');
    elements.deleteModal.classList.add('hidden');
    loadData();
  } catch (error) {
    showToast(error.message, 'error');
  }
}

// Seed Demo Books Action
async function handleSeedData() {
  try {
    const res = await fetch('/api/books/seed', { method: 'POST' });
    if (!res.ok) throw new Error('Failed to seed books');

    showToast('Demo library dataset seeded!', 'success');
    loadData();
  } catch (error) {
    showToast(error.message, 'error');
  }
}

// Interactive API Playground Logic
function openApiDocsModal() {
  elements.apiDocsModal.classList.remove('hidden');
  switchApiEndpoint('get-books');
}

function switchApiEndpoint(endpointKey) {
  state.activeApiEndpoint = endpointKey;
  elements.requestBodyContainer.classList.add('hidden');

  switch (endpointKey) {
    case 'get-books':
      elements.apiMethodTitle.innerHTML = '<span class="http-method get">GET</span> /api/books';
      elements.apiDesc.textContent = 'Returns list of all books. Supports search, genre filter, sortBy, and order parameters.';
      break;
    case 'get-book-by-id':
      elements.apiMethodTitle.innerHTML = '<span class="http-method get">GET</span> /api/books/1';
      elements.apiDesc.textContent = 'Returns details for a single book by ID.';
      break;
    case 'post-books':
      elements.apiMethodTitle.innerHTML = '<span class="http-method post">POST</span> /api/books';
      elements.apiDesc.textContent = 'Creates a new book. Title and Author are required.';
      elements.requestBodyContainer.classList.remove('hidden');
      elements.apiRequestJson.value = JSON.stringify({
        title: 'Design Patterns',
        author: 'Erich Gamma, Richard Helm',
        genre: 'Technology',
        publishedYear: 1994,
        price: 34.99,
        rating: 4.9,
        stock: 15,
        description: 'Elements of Reusable Object-Oriented Software.'
      }, null, 2);
      break;
    case 'put-books':
      elements.apiMethodTitle.innerHTML = '<span class="http-method put">PUT</span> /api/books/1';
      elements.apiDesc.textContent = 'Updates an existing book by ID.';
      elements.requestBodyContainer.classList.remove('hidden');
      elements.apiRequestJson.value = JSON.stringify({
        title: 'The Hobbit (Illustrated Edition)',
        author: 'J.R.R. Tolkien',
        genre: 'Fantasy',
        publishedYear: 1937,
        price: 19.99,
        rating: 4.9,
        stock: 20
      }, null, 2);
      break;
    case 'delete-books':
      elements.apiMethodTitle.innerHTML = '<span class="http-method delete">DELETE</span> /api/books/1';
      elements.apiDesc.textContent = 'Deletes a book by ID. Returns HTTP status 204 No Content.';
      break;
    case 'get-stats':
      elements.apiMethodTitle.innerHTML = '<span class="http-method get">GET</span> /api/books/stats';
      elements.apiDesc.textContent = 'Returns analytical store metrics (total books, inventory stock, ratings, genre distribution).';
      break;
  }
}

async function executeApiTest() {
  elements.responseStatus.textContent = 'Sending...';
  elements.apiResponseJson.textContent = 'Waiting for server response...';

  try {
    let url = '/api/books';
    let options = { method: 'GET' };

    switch (state.activeApiEndpoint) {
      case 'get-books':
        url = '/api/books';
        break;
      case 'get-book-by-id':
        url = '/api/books/1';
        break;
      case 'post-books':
        url = '/api/books';
        options = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: elements.apiRequestJson.value
        };
        break;
      case 'put-books':
        url = '/api/books/1';
        options = {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: elements.apiRequestJson.value
        };
        break;
      case 'delete-books':
        url = '/api/books/1';
        options = { method: 'DELETE' };
        break;
      case 'get-stats':
        url = '/api/books/stats';
        break;
    }

    const res = await fetch(url, options);
    elements.responseStatus.textContent = `${res.status} ${res.statusText}`;

    if (res.status === 204) {
      elements.apiResponseJson.textContent = '/* Status 204 No Content (Book removed successfully) */';
      loadData();
      return;
    }

    const json = await res.json();
    elements.apiResponseJson.textContent = JSON.stringify(json, null, 2);
    loadData();
  } catch (error) {
    elements.responseStatus.textContent = 'Error';
    elements.apiResponseJson.textContent = error.message;
  }
}

// Helpers
function showLoading(show) {
  if (show) {
    elements.loadingState.classList.remove('hidden');
    elements.bookGrid.classList.add('hidden');
    elements.bookTableWrapper.classList.add('hidden');
  } else {
    elements.loadingState.classList.add('hidden');
  }
}

function showToast(message, type = 'info') {
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  
  const icon = type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-circle-xmark' : 'fa-info-circle';
  toast.innerHTML = `<i class="fa-solid ${icon}"></i> <span>${escapeHtml(message)}</span>`;

  elements.toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.style.animation = 'toastIn 0.3s reverse forwards';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
