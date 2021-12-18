const { Soda } = require('../models');
const db = require('../db');

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

const seedDatabase = async () => {
  const promiseArr = [];
  for (let i = 0; i < seedSodas.length; i += 1) {
    const soda = seedSodas[i];
    const result = Soda.create(soda);
    promiseArr.push(result);
  }
  await Promise.all(promiseArr);
};

db.sync({ force: true }).then(seedDatabase);
