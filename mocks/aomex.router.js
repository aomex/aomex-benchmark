import { rule } from '@aomex/core';
import { Router } from '@aomex/router';
import { body, params } from '@aomex/web';

export const aomexRouter = new Router();

aomexRouter.get('/', {
  action: (ctx) => {
    ctx.send(200, 'hello world');
  },
});

aomexRouter.post('/users', {
  mount: [
    body({
      name: rule.string(),
      age: rule.number(),
    }),
  ],
  action: (ctx) => {
    const { name, age } = ctx.body;

    ctx.send(201, {
      id: 1,
      name: name,
      age: age,
    });
  },
});

aomexRouter.get('/users/:id', {
  mount: [
    params({
      id: rule.int(),
    }),
  ],
  action: (ctx) => {
    const { id } = ctx.params;

    ctx.send(200, {
      id: id,
    });
  },
});
