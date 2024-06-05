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

export const koaRouter = router.routes();
