const app = require('express')();
const { Soda, Transaction } = require('../models');

// this should be a method to get all sodas from our db
app.get('/sodas', async (req, res) => {
  Soda.findAll().then((sodas) => {
    res.json(sodas);
  }).catch((err) => {
    res.status(500);
    res.json(err);
  });
});

app.post('/sodas', async (req, res) => {
  Soda.create(req.body).then((soda) => {
    res.json(soda);
  }).catch((err) => {
    res.status(500);
    res.json(err);
  });
});

app.put('/sodas/:id', async (req, res) => {
  Soda.update(req.body, { where: { id: req.params.id } }).then((result) => {
    res.json(result);
  }).catch((err) => {
    res.status(500);
    res.json(err);
  });
});

// This is a post to buy a soda from the user
app.put('/sodas', async (req, res) => {
  await Soda.decrement('quantity', { where: { id: req.body.id } });
  const result = await Soda.findOne({ where: { id: req.body.id } });
  const date = new Date();
  const transaction = {
    label: result.label,
    price: result.price,
    time: date,
  };
  const soda = {
    id: result.id,
    label: result.label,
  };
  await Transaction.create(transaction);
  res.json(soda);
});

app.get('/transactions', (req, res) => {
  Transaction.findAll().then((transactions) => {
    res.json(transactions);
  }).catch((err) => {
    res.status(500);
    res.json(err);
  });
});

module.exports = app;
