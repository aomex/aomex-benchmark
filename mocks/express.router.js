import { Router } from 'express';
import bodyParser from 'body-parser';

export const expressRouter = Router();

expressRouter.get('/', (_, res) => {
  res.statusCode = 200;
  res.send('hello world');
});

expressRouter.post('/users', bodyParser.json(), (req, res) => {
  let { name, age } = req.body;

  if (!name || typeof name !== 'string') {
    res.statusCode = 400;
    res.send('name is required');
    return;
  }

  if (!age || typeof age !== 'number') {
    res.statusCode = 400;
    res.send('age is required');
    return;
  }

  res.statusCode = 201;
  res.json({
    id: 1,
    name: name,
    age: age,
  });
});
