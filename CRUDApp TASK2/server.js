const http = require('http');
const { app } = require('./app');

const PORT = process.env.PORT || 3000;

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Book Store API running on http://localhost:${PORT}`);
});
