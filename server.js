const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = 3000;
const HOSTNAME = 'localhost';

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

const server = http.createServer((req, res) => {
  // Parse URL
  const parsedUrl = url.parse(req.url, true);
  let pathname = parsedUrl.pathname;

  // Default to index.html for root
  if (pathname === '/') {
    pathname = '/index.html';
  }

  // Build file path
  const filePath = path.join(__dirname, pathname);

  // Get file extension
  const ext = path.parse(filePath).ext;

  // Read file from file system
  fs.readFile(filePath, (err, data) => {
    if (err) {
      if (err.code === 'ENOENT') {
        // File not found
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        // Try to serve custom 404 page
        fs.readFile(path.join(__dirname, '404.html'), (err, data) => {
          if (err) {
            res.end('<h1>404 - Page Not Found</h1><p>The requested file does not exist.</p>');
          } else {
            res.end(data);
          }
        });
      } else {
        // Server error
        res.statusCode = 500;
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        res.end(`<h1>500 - Server Error</h1><p>${err.message}</p>`);
      }
    } else {
      // Success
      res.statusCode = 200;
      res.setHeader('Content-Type', mimeTypes[ext] || 'text/plain; charset=utf-8');
      
      // Add cache headers
      if (ext === '.html') {
        res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
      } else if (['.css', '.js', '.svg', '.png', '.jpg', '.jpeg', '.gif'].includes(ext)) {
        res.setHeader('Cache-Control', 'public, max-age=3600');
      }
      
      // Add CORS headers for development
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
      
      res.end(data);
    }
  });
});

server.listen(PORT, HOSTNAME, () => {
  console.log(`
╔════════════════════════════════════════════════════════════╗
║  Siliguri Security Services - Development Server Running  ║
╚════════════════════════════════════════════════════════════╝

🌐 Server: http://${HOSTNAME}:${PORT}
📂 Root:   ${__dirname}

✅ Ready to serve all files. Press Ctrl+C to stop.

📋 Available Pages:
  • Homepage:      http://localhost:${PORT}/
  • About:         http://localhost:${PORT}/pages/about.html
  • Services:      http://localhost:${PORT}/pages/services.html
  • Quote Form:    http://localhost:${PORT}/pages/quote.html
  • Contact:       http://localhost:${PORT}/pages/contact.html
  • Locations:     http://localhost:${PORT}/pages/locations.html
  • Sectors:       http://localhost:${PORT}/pages/sectors.html
  • Compliance:    http://localhost:${PORT}/pages/compliance.html
  • Facilities:    http://localhost:${PORT}/pages/facilities.html
  • Careers:       http://localhost:${PORT}/pages/careers.html
  • Blog:          http://localhost:${PORT}/pages/blog-list.html
  • Privacy:       http://localhost:${PORT}/pages/privacy.html
  • Terms:         http://localhost:${PORT}/pages/terms.html

🔍 Open DevTools (F12) to check for any remaining warnings/errors.

  `);
});

// Error handling
server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`❌ Port ${PORT} is already in use. Try another port.`);
  } else {
    console.error(`❌ Server error: ${err.message}`);
  }
  process.exit(1);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('\n✋ Server shutting down...');
  server.close();
});
