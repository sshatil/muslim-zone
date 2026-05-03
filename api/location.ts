import { countryCodeToFlag } from '@/hooks/use-location';
import axios from 'axios';

export const fetchLocationByIP = async () => {
  const { data } = await axios.get('https://ipwho.is/');

  return {
    latitude: data.latitude,
    longitude: data.longitude,
    city: data.city,
    country: data.country,
    countryCode: data.country_code,
    timezone: data.timezone,
    flag: countryCodeToFlag(data.country_code),
    source: 'ip',
  };
};
