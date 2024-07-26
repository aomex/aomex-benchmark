import { rule } from '@aomex/core';
import { body, params, Router } from '@aomex/web';

export const aomexRouter = new Router();

for (let i = 0; i < 100; ++i) {
  aomexRouter.get('/x/' + i, {
    action: (ctx) => {
      ctx.send(200, 'hello world');
    },
  });
  aomexRouter.get('/x/:id/' + i, {
    action: (ctx) => {
      ctx.send(200, 'hello world');
    },
  });
  aomexRouter.post('/x/' + i, {
    action: (ctx) => {
      ctx.send(200, 'hello world');
    },
  });
  aomexRouter.post('/x/:id/' + i, {
    action: (ctx) => {
      ctx.send(200, 'hello world');
    },
  });

  aomexRouter.put('/x/' + i, {
    action: (ctx) => {
      ctx.send(200, 'hello world');
    },
  });
  aomexRouter.put('/x/:id/' + i, {
    action: (ctx) => {
      ctx.send(200, 'hello world');
    },
  });

  aomexRouter.delete('/x/' + i, {
    action: (ctx) => {
      ctx.send(200, 'hello world');
    },
  });
  aomexRouter.delete('/x/:id/' + i, {
    action: (ctx) => {
      ctx.send(200, 'hello world');
    },
  });
}

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
      foo: {
        bar: {
          baz: 1,
        },
      },
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

    ctx.send(200, { id: id });
  },
});
