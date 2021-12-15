const { Sequelize, DataTypes } = require('sequelize');

const createStore = (testing) => {
  const db = new Sequelize({
    logging: false,
    dialect: 'sqlite',
    storage: testing ? './testStorage.sqlite' : './storage.sqlite',
  });

  db.define('Soda', {
    label: {
      type: DataTypes.STRING,
    },
    price: {
      type: DataTypes.FLOAT,
    },
    quantity: {
      type: DataTypes.INTEGER,
    },
  });

  db.define('Transaction', {
    label: {
      type: DataTypes.STRING,
    },
    price: {
      type: DataTypes.FLOAT,
    },
  });

  db.authenticate();
  return db;
};

module.exports = { createStore };
