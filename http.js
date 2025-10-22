'use strict';

const http = require('http');

const app = http.createServer((req, res) => {
  if ('/remote' === req.url) {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello Remote Page\n');
  } else {
    proxyToRemote(req, res);
  }
});

function proxyToRemote(req, res) {
  const options = {
    hostname: '127.0.0.1',
    port: 3000,
    path: '/remote',
    method: 'GET',
    headers: {
      'Accept': 'text/plain'
    }
  };

  const httpProxy = http.request(options, response => {
    // 将 /remote 的响应回写给原始请求
    res.writeHead(response.statusCode || 200, response.headers);
    response.pipe(res);
  });

  httpProxy.on('error', err => {
    // 防止未处理的错误导致进程崩溃
    if (!res.headersSent) {
      res.writeHead(502, { 'Content-Type': 'text/plain' });
    }
    res.end(`Bad Gateway: ${err.message}`);
  });

  // GET 无请求体，直接结束，避免 self-request 早关闭导致 ECONNRESET
  httpProxy.end();
}

app.listen(3000, function () {
  const PORT = app.address().port;
  console.log(`Server running at http://127.0.0.1:${PORT}/`);
});
