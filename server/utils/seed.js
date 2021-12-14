const createStore = require("./store");

const db = createStore()

const seedSodas = [
    {
        label: 'Fizz',
        price: 1,
        quantity: 100
    },
    {
        label: 'Pop',
        price: 1,
        quantity: 100
    },
    {
        label: 'Cola',
        price: 1,
        quantity: 200
    },
    {
        label: 'Mega Pop',
        price: 1,
        quantity: 50
    },
]

const seedDatabase = async () => {
    for (let soda of seedSodas) {
        try {
            const result = await db.models.Soda.create(soda)
            console.log(result)
        } catch (err) {
            console.error(err);
        }
    }
    db.close();
}

db.sync({ force: true }).then(seedDatabase)
