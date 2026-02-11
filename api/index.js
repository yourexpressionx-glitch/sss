const fs = require('fs');
const path = require('path');

// MIME types
const mimeTypes = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.xml': 'application/xml',
  '.txt': 'text/plain'
};

module.exports = (req, res) => {
  // Set CORS headers for development
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Remove /api prefix from pathname
  let pathname = req.url.replace(/^\/api/, '');
  
  // Default to index.html for root
  if (pathname === '/' || pathname === '') {
    pathname = '/index.html';
  }

  // Construct file path
  const filePath = path.join(__dirname, '..', pathname);
  const ext = path.extname(filePath).toLowerCase();

  // Security: Prevent path traversal
  const realPath = path.resolve(filePath);
  const allowedDir = path.resolve(__dirname, '..');
  
  if (!realPath.startsWith(allowedDir)) {
    res.statusCode = 403;
    res.end('Forbidden');
    return;
  }

  // Read the file
  fs.readFile(filePath, (err, data) => {
    if (err) {
      // Serve 404.html for not found
      const notFoundPath = path.join(__dirname, '..', '404.html');
      fs.readFile(notFoundPath, (notFoundErr, notFoundData) => {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        if (!notFoundErr) {
          res.end(notFoundData);
        } else {
          res.end('<h1>404 - Page Not Found</h1>');
        }
      });
    } else {
      res.statusCode = 200;
      res.setHeader('Content-Type', mimeTypes[ext] || 'application/octet-stream');
      
      // Set cache headers
      if (ext === '.html') {
        res.setHeader('Cache-Control', 'no-cache, must-revalidate');
      } else {
        res.setHeader('Cache-Control', 'public, max-age=3600');
      }
      
      res.end(data);
    }
  });
};
