const { Soda } = require('../models');
const db = require('../db');

const seedSodas = [
  {
    label: 'Fizz',
    price: 1,
    quantity: 100,
  },
  {
    label: 'Pop',
    price: 1,
    quantity: 100,
  },
  {
    label: 'Cola',
    price: 1,
    quantity: 200,
  },
  {
    label: 'Mega Pop',
    price: 1,
    quantity: 0,
  },
];

const seedDatabase = async () => {
  const promiseArr = [];
  for (let i = 0; i < seedSodas.length; i += 1) {
    const soda = seedSodas[i];
    const result = Soda.create(soda);
    promiseArr.push(result);
  }
  await Promise.all(promiseArr);
};

const seedTestingDB = async () => {
  await db.sync({ force: true });
  await seedDatabase();
};

module.exports = seedTestingDB;
