import axios from 'axios';

export const apiGetSodas = async () => {
  console.log('Getting Sodas');
  const result = await axios.get('http://localhost:4000/api/sodas');
  console.log(result.data);
  return result.data;
};

export const apiBuySoda = async (id) => {
  let result;
  try {
    result = await axios.put('http://localhost:4000/api/sodas', { id });
  } catch (err) {
    console.error(err);
    result = err;
  }
  /// now allow the user to download the soda.json
  return result;
};
