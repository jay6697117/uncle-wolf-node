'use strict';

const http = require('http');

http
  .createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end('Hello World 2222!');
  })
  .listen(8080, '127.0.0.1');
