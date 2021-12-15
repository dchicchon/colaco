const app = require('express')();
const { Soda, Transaction } = require('../models');

app.get('/sodas', (req, res) => {
  Soda.findAll().then((sodas) => {
    res.json(sodas);
  }).catch((err) => {
    res.status(500);
    res.json(err);
  });
});

app.get('/transactions', (req, res) => {
  Transaction.findAll().then((transactions) => {
    res.json(transactions);
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

app.put('/sodas', async (req, res) => {
  Soda.update(req.body, { where: { id: req.body.id } }).then((result) => {
    res.json(result);
  }).catch((err) => {
    res.status(500);
    res.json(err);
  });
});

module.exports = app;
