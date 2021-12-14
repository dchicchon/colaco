const app = require('express')();
// const path = require('path');
const { createStore } = require('../utils/store');

const db = createStore();

// app.get('/', async (req, res) => {
//   // Show the current status of the api
//   // buttons on the index.html will allow the website admin to add sodas to the file
//   // allows admin to change prices of sodas
//   // res.sendFile(path.join(__dirname, '../public', 'index.html'));
// });

app.get('/sodas', async (req, res) => {
  // this should be a method to get all sodas from our db
  const sodas = await db.models.Soda.findAll();
  // console.log(sodas);
  res.json(sodas);
});

// This is a post to buy a soda from the user
app.put('/sodas', async (req, res) => {
  // console.log(req.body);
  const result = await db.models.Soda.decrement('quantity', { where: { id: req.body.id } });

  res.json(result);
});

module.exports = app;
