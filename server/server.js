const express = require('express');
const createStore = require('./store');
const app = express();
const PORT = process.env.PORT || 4000;

app.get('/', (req, res) => {
    // Show the current status of the api
    res.sendFile(__dirname + '/public/index.html')
})

const main = async () => {
    const store = await createStore();
    app.listen(PORT, () => {
        console.log(`Server has started on http://localhost:${PORT}`)
    })
};

main();

