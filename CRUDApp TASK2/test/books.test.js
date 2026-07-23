const test = require('node:test');
const assert = require('node:assert/strict');
const http = require('node:http');
const { app, resetBooks } = require('../app');

let server;
let port;

function startServer() {
  return new Promise((resolve) => {
    server = http.createServer(app);
    server.listen(0, '127.0.0.1', () => {
      const address = server.address();
      port = address.port;
      resolve();
    });
  });
}

async function request(path, options = {}) {
  const response = await fetch(`http://127.0.0.1:${port}${path}`, options);
  const text = await response.text();

  return {
    status: response.status,
    body: text ? JSON.parse(text) : null
  };
}

test.before(async () => {
  await startServer();
});

test.after(async () => {
  await new Promise((resolve, reject) => {
    server.close((error) => (error ? reject(error) : resolve()));
  });
});

test.beforeEach(() => {
  resetBooks();
});

test('GET /api/books returns the initial book list', async () => {
  const response = await request('/api/books');

  assert.equal(response.status, 200);
  assert.equal(response.body.length, 3);
  assert.equal(response.body[0].title, 'The Hobbit');
});

test('POST /api/books creates a new book', async () => {
  const response = await request('/api/books', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title: 'Dune', author: 'Frank Herbert', publishedYear: 1965, genre: 'Sci-Fi' })
  });

  assert.equal(response.status, 201);
  assert.equal(response.body.title, 'Dune');
});

test('PUT /api/books/:id updates an existing book', async () => {
  const response = await request('/api/books/1', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title: 'The Hobbit Updated', author: 'J.R.R. Tolkien', publishedYear: 1937, genre: 'Fantasy' })
  });

  assert.equal(response.status, 200);
  assert.equal(response.body.title, 'The Hobbit Updated');
});

test('DELETE /api/books/:id removes a book', async () => {
  const response = await request('/api/books/1', { method: 'DELETE' });

  assert.equal(response.status, 204);
});
