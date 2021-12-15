const { DataTypes } = require('sequelize');
const db = require('../db');

const Transaction = db.define('Transaction', {
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

module.exports = Transaction;
