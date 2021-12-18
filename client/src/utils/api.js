import axios from 'axios';

const BASEURL = process.env.REACT_APP_BASE_URL || 'http://localhost:4000';

export default {
  getSodas: () => axios.get(`${BASEURL}/api/sodas`),

  buySoda: (id) => axios.put(`${BASEURL}/api/sodas`, { id }),

};
