import TestAgent from 'supertest/lib/agent';
import { bench, describe } from 'vitest';
import Koa from 'koa';
import express from 'express';
import { WebApp } from '@aomex/web';
import supertest from 'supertest';
import { mdchain } from '@aomex/core';
import { koaRouter } from '../mocks/koa.router';
import { expressRouter } from '../mocks/express.router';
import { routers } from '@aomex/router';

describe('GET /', async () => {
  let aomexAgent: TestAgent;
  let koaAgent: TestAgent;
  let expressAgent: TestAgent;

  bench(
    'koa',
    async () => {
      await koaAgent.get('/');
    },
    {
      async setup(_, type) {
        if (type === 'run') return;
        const app = new Koa();
        app.use(koaRouter);
        koaAgent = supertest.agent(app.listen());
        await koaAgent.get('/').expect(200, 'hello world');
      },
    },
  );

  bench(
    'express',
    async () => {
      await expressAgent.get('/');
    },
    {
      async setup(_, type) {
        if (type === 'run') return;
        const app = express();
        app.use(expressRouter);
        expressAgent = supertest.agent(app.listen());
        await expressAgent.get('/').expect(200, 'hello world');
      },
    },
  );

  bench(
    'aomex',
    async () => {
      await aomexAgent.get('/');
    },
    {
      async setup(_, type) {
        if (type === 'run') return;

        const app = new WebApp({
          mount: mdchain.web.mount(routers('./mocks/aomex.router.js')),
        });
        aomexAgent = supertest.agent(app.listen());
        await aomexAgent.get('/').expect(200, 'hello world');
      },
    },
  );
});

describe('POST /users', async () => {
  let aomexAgent: TestAgent;
  let koaAgent: TestAgent;
  let expressAgent: TestAgent;

  bench(
    'koa',
    async () => {
      await koaAgent.post('/users').send({ name: 'jim', age: 10 });
    },
    {
      async setup(_, type) {
        if (type === 'run') return;
        const app = new Koa();
        app.use(koaRouter);
        koaAgent = supertest.agent(app.listen());
        await koaAgent
          .post('/users')
          .send({ name: 'jim', age: 10 })
          .expect(201, { id: 1, name: 'jim', age: 10 });
      },
    },
  );

  bench(
    'express',
    async () => {
      await expressAgent.post('/users').send({ name: 'jim', age: 10 });
    },
    {
      async setup(_, type) {
        if (type === 'run') return;
        const app = express();
        app.use(expressRouter);
        expressAgent = supertest.agent(app.listen());
        await expressAgent
          .post('/users')
          .send({ name: 'jim', age: 10 })
          .expect(201, { id: 1, name: 'jim', age: 10 });
      },
    },
  );

  bench(
    'aomex',
    async () => {
      await aomexAgent.post('/users').send({ name: 'jim', age: 10 });
    },
    {
      async setup(_, type) {
        if (type === 'run') return;

        const app = new WebApp({
          mount: mdchain.web.mount(routers('./mocks/aomex.router.js')),
        });
        aomexAgent = supertest.agent(app.listen());
        await aomexAgent
          .post('/users')
          .send({ name: 'jim', age: 10 })
          .expect(201, { id: 1, name: 'jim', age: 10 });
      },
    },
  );
});
