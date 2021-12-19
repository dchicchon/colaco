const db = require('./db');
const app = require('./app');

const PORT = process.env.PORT || 4000;
// eslint-disable-next-line prefer-destructuring
process.title = process.argv[2];
db.sync().then(app.listen(PORT));
