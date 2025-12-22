import axios from 'axios';

export const fetchLocationByIP = async () => {
  const { data } = await axios.get('https://ipwho.is/');
  return data;
};
