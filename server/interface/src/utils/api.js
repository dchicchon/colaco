import axios from 'axios';

export const apiGetSodas = async () => {
  const result = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/sodas`);
  return result.data;
};

export const apiAddSoda = async (soda) => {
  const result = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/sodas`, soda);
  return result.data;
};

export const apiUpdateSoda = async (soda) => {
  const result = await axios.put(`${process.env.REACT_APP_BASE_URL}/api/sodas/${soda.id}`, soda);
  return result.data;
};

export const apiGetTransactions = async () => {
  const result = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/transactions`);
  return result.data;
};
