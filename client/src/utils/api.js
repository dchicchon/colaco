import axios from 'axios';

const BASEURL = process.env.BASE_URL;

export default {
  getSodas: () => axios.get(`${BASEURL}/api/sodas`),

  buySoda: (id) => axios.put(`${BASEURL}/api/sodas`, { id }),

};
