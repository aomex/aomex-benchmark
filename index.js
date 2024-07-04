import { mdchain } from '@aomex/core';
import { routers } from '@aomex/router';
import { WebApp } from '@aomex/web';
import { expressRouter } from './mocks/express.router.js';
import express from 'express';
import Koa from 'koa';
import { koaRouter } from './mocks/koa.router.js';

{
  const app = new Koa();
  app.use(koaRouter);
  app.listen(3001, () => {
    console.log('koa:3001 ');
  });
}

{
  const app = express();
  app.use(expressRouter);
  app.listen(3002, () => {
    console.log('express:3002 ');
  });
}

{
  const app = new WebApp({
    mount: mdchain.web.mount(routers('./mocks/aomex.router.js')),
  });
  app.listen(3003, () => {
    console.log('aomex:3003 ');
  });
}
