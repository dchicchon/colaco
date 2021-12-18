import axios from 'axios';

const BASEURL = process.env.BASE_URL;

export const apiGetSodas = async () => {
  const result = await axios.get(`${BASEURL}/api/sodas`);
  return result.data;
};

export const apiBuySoda = async (id) => {
  const result = await axios.put(`${BASEURL}/api/sodas`, { id });
  return result.data;
};
