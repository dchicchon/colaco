const db = require('./db');
const app = require('./app');

const PORT = process.env.PORT || 4000;
db.sync().then(app.listen(PORT));
