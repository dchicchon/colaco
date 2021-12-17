import axios from 'axios';

const BASEURL = process.env.REACT_APP_BASE_URL;

export default {
  getSodas: () => axios.get(`${BASEURL}/api/sodas`),

  addSoda: (soda) => axios.post(`${BASEURL}/api/sodas`, soda),

  updateSoda: (soda) => axios.put(`${BASEURL}/api/sodas/${soda.id}`, soda),

  deleteSoda: (id) => axios.delete(`${BASEURL}/api/sodas/${id}`),

  getTransactions: () => axios.get(`${BASEURL}/api/transactions`),

};
