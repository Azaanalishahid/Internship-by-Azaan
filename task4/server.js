import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { createReadStream } from 'node:fs';
import { extname, join, resolve } from 'node:path';

const rootDir = resolve(process.cwd());
const port = process.env.PORT || 3000;

const mimeTypes = new Map([
  ['.html', 'text/html; charset=utf-8'],
  ['.css', 'text/css; charset=utf-8'],
  ['.js', 'application/javascript; charset=utf-8'],
  ['.json', 'application/json; charset=utf-8'],
  ['.svg', 'image/svg+xml'],
  ['.png', 'image/png'],
  ['.jpg', 'image/jpeg'],
  ['.jpeg', 'image/jpeg'],
  ['.webp', 'image/webp']
]);

function sendNotFound(response) {
  response.statusCode = 404;
  response.setHeader('Content-Type', 'text/plain; charset=utf-8');
  response.end('Not found');
}

createServer(async (request, response) => {
  const urlPath = new URL(request.url, `http://${request.headers.host}`).pathname;
  const safePath = urlPath === '/' ? '/index.html' : urlPath;
  const filePath = join(rootDir, safePath);

  try {
    const fileStat = await stat(filePath);
    if (!fileStat.isFile()) {
      sendNotFound(response);
      return;
    }

    response.statusCode = 200;
    response.setHeader('Content-Type', mimeTypes.get(extname(filePath)) || 'application/octet-stream');
    createReadStream(filePath).pipe(response);
  } catch {
    sendNotFound(response);
  }
}).listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});