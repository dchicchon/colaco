import axios from 'axios';

export const apiGetSodas = async () => {
  const result = await axios.get('/api/sodas');
  return result.data;
};

export const apiUpdateSoda = async () => {
  const result = await axios.put('/api/sodas');
  return result.data;
};
