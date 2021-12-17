const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const routes = require('./routes');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../api-interface/build')));
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../api-interface/build/index.html'));
  });
} else {
  app.get('/', (req, res) => {
    res.send('Welcome to the development server');
  });
}

app.use(routes);

module.exports = app;
