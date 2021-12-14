import axios from 'axios';

export const apiGetSodas = async () => {
  const result = await axios.get('/api/sodas');
  return result.data;
};

export const apiAddSoda = async (soda) => {
  const result = await axios.post('/admin/sodas', soda);
  return result.data;
};

export const apiUpdateSoda = async (soda) => {
  const result = await axios.put('/admin/sodas', soda);
  return result.data;
};
