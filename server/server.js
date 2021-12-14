const express = require('express');
const createStore = require('./utils/store');
const app = express();
const PORT = process.env.PORT || 4000;
const db = createStore();
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', async (req, res) => {
    // Show the current status of the api
    res.sendFile(__dirname + '/public/index.html')
    // buttons on the index.html will allow the website admin to add sodas to the file
    // allows admin to change prices of sodas
})

app.get('/sodas', async (req, res) => {
    const sodas = await db.models.Soda.findAll()
    console.log(sodas)
    // const sodas = [{ quantity: 100, price: 1, label: 'Sprite' }, { quantity: 100, price: 1, label: 'Dr.Pepper' }, { quantity: 100, price: 1, label: 'Coke' }, { quantity: 100, price: 1, label: 'Squirt' }]
    // this should be a method to get all sodas from our db
    res.json(sodas)
})

db.sync().then(app.listen(PORT, () => {
    console.log(`Server has started on http://localhost:${PORT}`)
}))


