const app = require('express')();

const { createStore } = require('../utils/store');

const db = createStore();

app.get('/sodas', async (req, res) => {
  const sodas = await db.models.Soda.findAll();
  res.json(sodas);
});

app.post('/sodas', async (req, res) => {
  const soda = await db.models.Soda.create(req.body);
  res.json(soda);
});

app.put('/sodas', async (req, res) => {
  const result = await db.models.Soda.update(req.body, { where: { id: req.body.id } });
  res.json(result);
});

module.exports = app;
