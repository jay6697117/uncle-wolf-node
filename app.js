const fs = require('fs');
const Koa = require('koa');
const app = new Koa();

app.use(ctx => {
  if(ctx.path === '/good'){
    return ctx.body = 'Hello good';
  }
  fs.readFile('somefile.txt', (err, data) => {
    if (err) throw err;
    console.log('data:', data);
    return ctx.body = 'Hello Koa';
  });
});

process.on  ('uncaughtException', (err) => {
  console.log('uncaughtException', err);
});

app.listen(3000);
