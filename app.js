const fs = require('fs');
const Koa = require('koa');
const app = new Koa();

app.use(ctx => {
  if(ctx.path === '/good'){
    ctx.body = 'Hello good';
    return;
  }
  return new Promise((resolve, reject) => {
    fs.readFile('somefile.txt', (err, data) => {
      if (err) reject(err);
      console.log('data:', data);
      ctx.body = data;
      resolve();
    });
  });
});

process.on  ('uncaughtException', (err) => {
  console.log('uncaughtException', err);
});

app.listen(3000);
