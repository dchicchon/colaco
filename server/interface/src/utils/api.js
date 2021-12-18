import axios from 'axios';

export default {
  getSodas: () => axios.get('/api/sodas'),

  addSoda: (soda) => axios.post('/api/sodas', soda),

  updateSoda: (soda) => axios.put(`/api/sodas/${soda.id}`, soda),

  deleteSoda: (id) => axios.delete(`/api/sodas/${id}`),

  getTransactions: () => axios.get('/api/transactions'),

};
