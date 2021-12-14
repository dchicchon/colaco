const { createStore } = require('./store');

const db = createStore(false);

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
    quantity: 50,
  },
];

const seedDatabase = async () => {
  const promiseArr = [];
  for (let i = 0; i < seedSodas.length; i += 1) {
    const soda = seedSodas[i];
    const result = db.models.Soda.create(soda);
    promiseArr.push(result);
  }
  await Promise.all(promiseArr);
  db.close();
};

db.sync({ force: true }).then(seedDatabase);
