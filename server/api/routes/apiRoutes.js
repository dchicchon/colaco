const app = require('express')();
const {
  createSoda, getSodas, getRevenue, updateSoda, buySoda, getTransactions, deleteSoda,
} = require('../controllers');

app.options('/sodas');
app.get('/sodas', getSodas);
app.put('/sodas', buySoda);
app.post('/sodas', createSoda);
app.put('/sodas/:id', updateSoda);
app.delete('/sodas/:id', deleteSoda);
app.get('/transactions', getTransactions);
app.get('/revenue', getRevenue);

module.exports = app;
