const { Sequelize } = require('sequelize');
const { isTest } = require('../utils/misc');

let db;
if (process.env.JAWSDB_URL) {
  db = new Sequelize(process.env.JAWSDB_URL);
} else {
  db = isTest()
    ? new Sequelize({
      logging: false,
      dialect: 'sqlite',
      storage: './testStorage.sqlite',
    })
    : new Sequelize({
      logging: false,
      dialect: 'sqlite',
      storage: './storage.sqlite',
    });
}
module.exports = db;
