import Router from '@koa/router';
import bodyParser from '@koa/bodyparser';

const router = new Router();

router.get('/', (ctx) => {
  ctx.status = 200;
  ctx.body = 'hello world';
});

router.post('/users', bodyParser(), (ctx) => {
  let { name, age } = ctx.request.body;

  if (!name || typeof name !== 'string') {
    ctx.throw(400, 'name is required');
  }

  if (!age || typeof age !== 'number') {
    ctx.throw(400, 'age is required');
  }

  ctx.status = 201;
  ctx.body = {
    id: 1,
    name: name,
    age: age,
  };
});

router.get('/users/:id', (ctx) => {
  const id = Number(ctx.params.id);
  if (Number.isNaN(id) || !Number.isInteger(id)) {
    ctx.throw(400, '必须是整数');
  }

  ctx.status = 200;
  ctx.body = { id: id };
});

export const koaRouter = router.routes();
