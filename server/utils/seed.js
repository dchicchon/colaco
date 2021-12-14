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

db.sync({ force: true }).then(() => {
    // seed the database here
    db.models.Soda.create()
})