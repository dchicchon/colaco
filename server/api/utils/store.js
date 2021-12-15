const { Sequelize, DataTypes } = require('sequelize');

const createStore = (testing) => {
  const db = new Sequelize({
    logging: false,
    dialect: 'sqlite',
    storage: testing ? './testStorage.sqlite' : './storage.sqlite',
  });

  db.define('Soda', {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
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
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
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
