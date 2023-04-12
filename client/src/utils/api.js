import { addSoda, buySoda, deleteSoda, getRevenue, getSodas, getTransactions, updateSoda } from './db';

export default {
  getSodas: () => {
    // after we get sodas, lets reset the context
    return getSodas()
  },
  buySoda: (key) => {
    return buySoda(key)
  },
  getRevenue: () => {
    return getRevenue();
  },
  getTransactions: () => {
    return getTransactions();
  },
  deleteSoda: (key) => {
    return deleteSoda(key);
  },
  updateSoda: (soda) => {
    return updateSoda(soda);
  },
  addSoda: (soda) => {
    return addSoda(soda);
  },

};
