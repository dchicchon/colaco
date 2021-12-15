const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const routes = require('./routes');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../api-interface', '/build')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../api-interface/build/index.html'));
});

app.use(routes);

module.exports = app;
