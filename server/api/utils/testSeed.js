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
  console.log('Seeding Test Database...');
  const promiseArr = [];
  for (let i = 0; i < seedSodas.length; i += 1) {
    const soda = seedSodas[i];
    const result = Soda.create(soda);
    promiseArr.push(result);
  }
  await Promise.all(promiseArr);
  console.log('Done seeding database');
};

const seedTestingDB = async () => {
  seedDatabase();
  await db.sync({ force: true });
  console.log('Done Syncing');
};

module.exports = seedTestingDB;
