const { DataTypes } = require('sequelize');
const db = require('../db');

const Soda = db.define('Soda', {
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
    validate: {
      min: {
        args: [0],
        msg: 'Quantity must be greater than 0',
      },
      max: {
        args: [1000],
        msg: 'Cannot fit anymore sodas of this type',
      },
    },
  },
});

module.exports = Soda;
