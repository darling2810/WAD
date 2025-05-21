// server.js
const http = require('http');
const os = require('os');
const path = require('path');
const EventEmitter = require('events');

// Custom event emitter for logging
class Logger extends EventEmitter {}
const logger = new Logger();
logger.on('request', (method, url) => {
  console.log(`Received ${method} request for ${url}`);
});

// Utility to get system info
const getSystemInfo = () => ({
  platform: os.platform(),
  cpuCores: os.cpus().length,
  freeMemoryMB: Math.round(os.freemem() / 1024 / 1024),
});

const server = http.createServer((req, res) => {
  // Emit custom event
  logger.emit('request', req.method, req.url);

  // Build response based on URL
  if (req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(`
      <h1>Welcome to Custom Node Server</h1>
      <p>System Info: ${JSON.stringify(getSystemInfo())}</p>
      <p>Normalized Path: ${path.normalize('../folder//file.txt')}</p>
    `);
  } else if (req.url === '/info') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(getSystemInfo()));
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('404 Not Found');
  }
});

const PORT = 3000;
server.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));