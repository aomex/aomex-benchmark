import { bench } from 'vitest';
import { describe } from 'node:test';
import supertest from 'supertest';
import { mdchain, middleware } from '@aomex/core';
import type TestAgent from 'supertest/lib/agent';
import Koa from 'koa';
import express from 'express';
import { WebApp } from '@aomex/web';

describe('原始请求', async () => {
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
        app.use((ctx) => {
          ctx.status = 200;
          ctx.body = 'hello world';
        });
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
        app.use((_, res) => {
          res.statusCode = 200;
          res.send('hello world');
        });
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
          mount: mdchain.web.mount(
            middleware.web((ctx) => {
              ctx.send(200, 'hello world');
            }),
          ),
        });
        aomexAgent = supertest.agent(app.listen());
        await aomexAgent.get('/').expect(200, 'hello world');
      },
    },
  );
});
