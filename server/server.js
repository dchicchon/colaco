const express = require('express');
const app = express();
const PORT = 4000;



app.get('/', (req, res) => {
    res.send('Hello There!')
})

// This is a place where a user can 

app.listen(PORT, () => {
    console.log(`Server has started on http://localhost:${PORT}`)
})