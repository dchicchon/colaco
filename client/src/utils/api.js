import axios from 'axios';

export const apiGetSodas = async () => {
  const result = await axios.get('http://localhost:4000/api/sodas');
  return result.data;
};

export const apiBuySoda = async (id) => {
  const result = await axios.put('http://localhost:4000/api/sodas', { id });
  return result.data;
};
