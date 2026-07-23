const express = require('express');
const path = require('path');

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const initialBooks = [
  {
    id: 1,
    title: 'The Hobbit',
    author: 'J.R.R. Tolkien',
    publishedYear: 1937,
    genre: 'Fantasy',
    price: 14.99,
    rating: 4.8,
    stock: 25,
    isbn: '978-0547928227',
    coverImage: 'https://images.unsplash.com/photo-1629992101753-56d196c8aced?auto=format&fit=crop&w=600&q=80',
    description: 'A classic fantasy novel following Bilbo Baggins on an epic quest to reclaim the lost Dwarf Kingdom of Erebor.'
  },
  {
    id: 2,
    title: '1984',
    author: 'George Orwell',
    publishedYear: 1949,
    genre: 'Dystopian',
    price: 12.99,
    rating: 4.7,
    stock: 18,
    isbn: '978-0451524935',
    coverImage: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80',
    description: 'A dystopian social science fiction novel and cautionary tale about totalitarianism, mass surveillance, and repressive regimentation.'
  },
  {
    id: 3,
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    publishedYear: 1960,
    genre: 'Classic',
    price: 15.49,
    rating: 4.9,
    stock: 30,
    isbn: '978-0060935467',
    coverImage: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&w=600&q=80',
    description: 'A gripping, heart-wrenching, and wholly remarkable tale of coming-of-age in a South poisoned by virulent prejudice.'
  }
];

const sampleSeedBooks = [
  ...initialBooks,
  {
    id: 4,
    title: 'Clean Code',
    author: 'Robert C. Martin',
    publishedYear: 2008,
    genre: 'Technology',
    price: 42.50,
    rating: 4.6,
    stock: 12,
    isbn: '978-0132350884',
    coverImage: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&w=600&q=80',
    description: 'A handbook of agile software craftsmanship packed with principles, patterns, and practices for writing cleaner code.'
  },
  {
    id: 5,
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    publishedYear: 1925,
    genre: 'Classic',
    price: 10.99,
    rating: 4.5,
    stock: 40,
    isbn: '978-0743273565',
    coverImage: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=600&q=80',
    description: 'A masterpiece of 20th-century American fiction exploring themes of decadence, idealism, social upheaval, and excess.'
  },
  {
    id: 6,
    title: 'Dune',
    author: 'Frank Herbert',
    publishedYear: 1965,
    genre: 'Sci-Fi',
    price: 18.99,
    rating: 4.9,
    stock: 15,
    isbn: '978-0441172719',
    coverImage: 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?auto=format&fit=crop&w=600&q=80',
    description: 'Set on the desert planet Arrakis, Dune is the story of Paul Atreides and his family taking over administration of Arrakis.'
  },
  {
    id: 7,
    title: 'Atomic Habits',
    author: 'James Clear',
    publishedYear: 2018,
    genre: 'Self-Help',
    price: 16.99,
    rating: 4.9,
    stock: 50,
    isbn: '978-0735211292',
    coverImage: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=600&q=80',
    description: 'An easy & proven way to build good habits & break bad ones, offering a framework for improving every single day.'
  },
  {
    id: 8,
    title: 'The Pragmatic Programmer',
    author: 'David Thomas, Andrew Hunt',
    publishedYear: 1999,
    genre: 'Technology',
    price: 39.99,
    rating: 4.8,
    stock: 20,
    isbn: '978-0201616224',
    coverImage: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80',
    description: 'Illustrates best practices and major pitfalls of software development with timeless insights for developers.'
  }
];

let books = JSON.parse(JSON.stringify(initialBooks));

function resetBooks() {
  books = JSON.parse(JSON.stringify(initialBooks));
}

function nextBookId() {
  return books.length > 0 ? Math.max(...books.map((book) => book.id)) + 1 : 1;
}

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Store statistics endpoint
app.get('/api/books/stats', (req, res) => {
  const totalBooks = books.length;
  const totalStock = books.reduce((acc, curr) => acc + (Number(curr.stock) || 0), 0);
  const avgPrice = totalBooks > 0 ? (books.reduce((acc, curr) => acc + (Number(curr.price) || 0), 0) / totalBooks).toFixed(2) : '0.00';
  const avgRating = totalBooks > 0 ? (books.reduce((acc, curr) => acc + (Number(curr.rating) || 0), 0) / totalBooks).toFixed(1) : '0.0';

  const genreCounts = {};
  books.forEach((b) => {
    const genre = b.genre || 'Uncategorized';
    genreCounts[genre] = (genreCounts[genre] || 0) + 1;
  });

  res.json({
    totalBooks,
    totalStock,
    avgPrice: Number(avgPrice),
    avgRating: Number(avgRating),
    genreCounts
  });
});

// Seed sample books endpoint
app.post('/api/books/seed', (req, res) => {
  books = JSON.parse(JSON.stringify(sampleSeedBooks));
  res.json({ message: 'Sample books seeded successfully', count: books.length, books });
});

// Reset books endpoint
app.post('/api/books/reset', (req, res) => {
  resetBooks();
  res.json({ message: 'Books reset to initial state', count: books.length, books });
});

// GET /api/books (supports search, genre, sortBy, order)
app.get('/api/books', (req, res) => {
  let result = [...books];

  const { search, genre, sortBy, order } = req.query;

  if (search) {
    const query = String(search).toLowerCase();
    result = result.filter((b) =>
      (b.title && b.title.toLowerCase().includes(query)) ||
      (b.author && b.author.toLowerCase().includes(query)) ||
      (b.genre && b.genre.toLowerCase().includes(query)) ||
      (b.description && b.description.toLowerCase().includes(query)) ||
      (b.isbn && b.isbn.toLowerCase().includes(query))
    );
  }

  if (genre && genre !== 'All') {
    const genreQuery = String(genre).toLowerCase();
    result = result.filter((b) => b.genre && b.genre.toLowerCase() === genreQuery);
  }

  if (sortBy) {
    const isAsc = order !== 'desc';
    result.sort((a, b) => {
      let valA = a[sortBy];
      let valB = b[sortBy];

      if (typeof valA === 'string') valA = valA.toLowerCase();
      if (typeof valB === 'string') valB = valB.toLowerCase();

      if (valA < valB) return isAsc ? -1 : 1;
      if (valA > valB) return isAsc ? 1 : -1;
      return 0;
    });
  }

  res.json(result);
});

// GET /api/books/:id
app.get('/api/books/:id', (req, res) => {
  const bookId = Number(req.params.id);
  const book = books.find((item) => item.id === bookId);

  if (!book) {
    return res.status(404).json({ error: 'Book not found' });
  }

  return res.json(book);
});

// POST /api/books
app.post('/api/books', (req, res) => {
  const { title, author, publishedYear, genre, price, rating, stock, coverImage, isbn, description } = req.body;

  if (!title || !author) {
    return res.status(400).json({ error: 'Title and author are required' });
  }

  const newBook = {
    id: nextBookId(),
    title: String(title).trim(),
    author: String(author).trim(),
    publishedYear: publishedYear ? Number(publishedYear) : null,
    genre: genre ? String(genre).trim() : null,
    price: price !== undefined && price !== null ? Number(price) : 19.99,
    rating: rating !== undefined && rating !== null ? Number(rating) : 4.5,
    stock: stock !== undefined && stock !== null ? Number(stock) : 10,
    coverImage: coverImage || 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80',
    isbn: isbn || `978-${Math.floor(100000000 + Math.random() * 900000000)}`,
    description: description || 'No description provided.'
  };

  books.push(newBook);
  return res.status(201).json(newBook);
});

// PUT /api/books/:id
app.put('/api/books/:id', (req, res) => {
  const bookId = Number(req.params.id);
  const bookIndex = books.findIndex((item) => item.id === bookId);

  if (bookIndex === -1) {
    return res.status(404).json({ error: 'Book not found' });
  }

  const { title, author, publishedYear, genre, price, rating, stock, coverImage, isbn, description } = req.body;

  if (!title || !author) {
    return res.status(400).json({ error: 'Title and author are required' });
  }

  const updatedBook = {
    ...books[bookIndex],
    title: String(title).trim(),
    author: String(author).trim(),
    publishedYear: publishedYear ? Number(publishedYear) : null,
    genre: genre ? String(genre).trim() : null,
    price: price !== undefined && price !== null ? Number(price) : books[bookIndex].price ?? 19.99,
    rating: rating !== undefined && rating !== null ? Number(rating) : books[bookIndex].rating ?? 4.5,
    stock: stock !== undefined && stock !== null ? Number(stock) : books[bookIndex].stock ?? 10,
    coverImage: coverImage || books[bookIndex].coverImage,
    isbn: isbn || books[bookIndex].isbn,
    description: description || books[bookIndex].description
  };

  books[bookIndex] = updatedBook;
  return res.json(updatedBook);
});

// DELETE /api/books/:id
app.delete('/api/books/:id', (req, res) => {
  const bookId = Number(req.params.id);
  const bookIndex = books.findIndex((item) => item.id === bookId);

  if (bookIndex === -1) {
    return res.status(404).json({ error: 'Book not found' });
  }

  books.splice(bookIndex, 1);
  return res.status(204).send();
});

// Root API Endpoint description fallback
app.get('/api', (req, res) => {
  res.json({
    message: 'Welcome to Book Store CRUD API',
    endpoints: {
      'GET /': 'Web UI Application',
      'GET /health': 'Health check',
      'GET /api/books': 'List all books (query params: search, genre, sortBy, order)',
      'GET /api/books/:id': 'Get a specific book',
      'GET /api/books/stats': 'Get book store statistics',
      'POST /api/books': 'Create a new book (requires title and author)',
      'PUT /api/books/:id': 'Update a book (requires title and author)',
      'DELETE /api/books/:id': 'Delete a book',
      'POST /api/books/seed': 'Seed demo books dataset',
      'POST /api/books/reset': 'Reset books dataset to initial 3 books'
    }
  });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
});

module.exports = { app, resetBooks };

