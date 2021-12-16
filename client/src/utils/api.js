import axios from 'axios';

export const apiGetSodas = async () => {
  const result = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/sodas`);
  return result.data;
};

export const apiBuySoda = async (id) => {
  const result = await axios.put(`${process.env.REACT_APP_BASE_URL}/api/sodas`, { id });
  return result.data;
};
