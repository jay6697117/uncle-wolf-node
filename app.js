const fs = require('fs');
const Koa = require('koa');
const app = new Koa();

app.use(ctx => {
  // 忽略浏览器自动发送的请求（静默处理，不记录日志）
  if (ctx.path === '/favicon.ico' || ctx.path.startsWith('/.well-known/')) {
    ctx.status = 204; // No Content
    return;
  }

  // 添加日志查看请求路径
  console.log('收到请求:', ctx.method, ctx.path);

  if (ctx.path === '/good') {
    ctx.body = 'hello good';
    return;
  }

  return new Promise((resolve, reject) => {
    fs.readFile('somefile.txt', 'utf8', (err, data) => {
      try {
        if (err) reject(err);
        console.log('data 1:', data);
        ctx.body = data;
        resolve();
      } catch (err) {
        console.log('catch err:', err);
      } finally {
        console.log('离开try/catch');
      }
    });
  });
});

process.on('uncaughtException', err => {
  console.log('uncaughtException', err);
});

app.listen(3000);
