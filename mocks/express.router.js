import { Router } from 'express';
import bodyParser from 'body-parser';

export const expressRouter = Router();

for (let i = 0; i < 100; ++i) {
  expressRouter.get('/x/' + i, (_, res) => {
    res.contentType('text');
    res.status(200).send('hello world');
  });
  expressRouter.get('/x/:id/' + i, (_, res) => {
    res.contentType('text');
    res.status(200).send('hello world');
  });

  expressRouter.post('/x/' + i, (_, res) => {
    res.contentType('text');
    res.status(200).send('hello world');
  });
  expressRouter.post('/x/:id/' + i, (_, res) => {
    res.contentType('text');
    res.status(200).send('hello world');
  });

  expressRouter.put('/x/' + i, (_, res) => {
    res.contentType('text');
    res.status(200).send('hello world');
  });
  expressRouter.put('/x/:id/' + i, (_, res) => {
    res.contentType('text');
    res.status(200).send('hello world');
  });

  expressRouter.delete('/x/' + i, (_, res) => {
    res.contentType('text');
    res.status(200).send('hello world');
  });
  expressRouter.delete('/x/:id/' + i, (_, res) => {
    res.contentType('text');
    res.status(200).send('hello world');
  });
}

expressRouter.get('/', (_, res) => {
  res.contentType('text');
  res.status(200).send('hello world');
});

expressRouter.post('/users', bodyParser.json(), (req, res) => {
  let { name, age } = req.body;

  if (!name || typeof name !== 'string') {
    res.status(400).send('name is required');
    return;
  }

  if (!age || typeof age !== 'number') {
    res.status(400).send('age is required');
    return;
  }

  res.status(201).json({
    id: 1,
    name: name,
    age: age,
    foo: {
      bar: {
        baz: 1,
      },
    },
  });
});

expressRouter.get('/users/:id', (req, res) => {
  const id = Number(req.params.id);
  if (Number.isNaN(id) || !Number.isInteger(id)) {
    res.status(400).send('必须是整数');
    return;
  }

  res.status(200).json({ id: id });
});
