const { Sequelize, DataTypes } = require('sequelize');

const createStore = (testing) => {
  const db = new Sequelize({
    logging: false,
    dialect: 'sqlite',
    storage: testing ? './testStorage.sqlite' : './storage.sqlite',
  });

  db.define('Soda', {
    label: DataTypes.STRING,
    price: DataTypes.FLOAT,
    quantity: DataTypes.INTEGER,
  });

  db.authenticate();
  return db;
};

module.exports = { createStore };
