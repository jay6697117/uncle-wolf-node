const fs = require('fs').promises; // 使用 Promise 版本的 fs
const Koa = require('koa');
const app = new Koa();

app.use(async ctx => {
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

  // 使用 async/await (最简洁优雅的方式)
  try {
    const data = await fs.readFile('somefile.txt', 'utf8');
    console.log('data 1:', data);
    ctx.body = data;
  } catch (err) {
    console.log('catch err:', err);
    ctx.status = 500;
    ctx.body = 'Internal Server Error';
  } finally {
    console.log('离开 try/catch');
  }
});

process.on('uncaughtException', err => {
  console.log('uncaughtException', err);
});

app.listen(3000);
