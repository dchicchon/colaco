const app = require('express')();

const { createStore } = require('../utils/store');

const db = createStore();

app.put('/sodas', async (req, res) => {
  console.log(req.body);
  const result = db.models.Soda.update(req.body, { where: { id: req.body.id } });
  res.json(result);
});

module.exports = app;
