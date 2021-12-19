const { Soda, Transaction } = require('../../models');
const db = require('../../db');

const seedSodas = [
  {
    label: 'Fizz',
    description: 'An effervescent fruity experience with hints of grape and coriander.',
    price: 1,
    quantity: 100,
  },
  {
    label: 'Pop',
    description: 'An explosion of flavor that will knock your socks off!',
    price: 1,
    quantity: 100,
  },
  {
    label: 'Cola',
    description: 'A basic no nonsense cola that is the perfect pick me up for any occasion.',
    price: 1,
    quantity: 200,
  },
  {
    label: 'Mega Pop',
    description: 'Not for the faint of heart. So flavorful and so invigorating, it should probably be illegal',
    price: 1,
    quantity: 50,
  },
];

const seedTransactions = [
  {
    label: 'Fizz',
    price: 1.00,
    time: new Date().toLocaleString(),
  },
  {
    label: 'Fizz',
    price: 1.00,
    time: new Date().toLocaleString(),
  },
];

const seedDatabase = async () => {
  const promises = [];
  seedSodas.forEach((soda) => {
    const result = Soda.create(soda);
    promises.push(result);
  });
  seedTransactions.forEach((transaction) => {
    const result = Transaction.create(transaction);
    promises.push(result);
  });
  await Promise.all(promises);
};

const seedTestingDB = async () => {
  await db.sync({ force: true });
  await seedDatabase();
};

module.exports = seedTestingDB;
