const app = require('express')();
const {
  createSoda, getSodas, updateSoda, buySoda, getTransactions, deleteSoda,
} = require('../controllers');

app.get('/sodas', getSodas);
app.post('/sodas', createSoda);
app.put('/sodas/:id', updateSoda);
app.put('/sodas', buySoda);
app.delete('/sodas/:id', deleteSoda);
app.get('/transactions', getTransactions);

module.exports = app;
