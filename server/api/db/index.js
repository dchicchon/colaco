const { Sequelize } = require('sequelize');
const { isTest } = require('../utils/misc');

const db = isTest()
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
module.exports = db;
