const { DataTypes } = require('sequelize');
const db = require('../db');

const Soda = db.define('Soda', {
  id: {
    primaryKey: true,
    allowNull: false,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
  },
  label: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      min: {
        args: [1],
        msg: 'Name too short!',
      },
      max: {
        args: [25],
        msg: 'Name Too long!',
      },
    },
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,

    validate: {
      min: {
        args: [0.00],
        msg: 'Price cannot be $0.00!F',
      },
      max: {
        args: [100.00],
        msg: 'Price cannot be greater than $100.00',
      },
    },
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
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
