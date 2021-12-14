const express = require('express');
const cors = require('cors');

const app = express();
const routes = require('./routes');
const { createStore } = require('./utils/store');

const PORT = process.env.PORT || 4000;
const db = createStore(false);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(routes);

db.sync().then(app.listen(PORT, () => {
  // console.log(`Server has started on http://localhost:${PORT}`);
}));
