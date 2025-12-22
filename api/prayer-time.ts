import axios from 'axios';

export const fetchMonthlyPrayerTimes = async (
  lat: number,
  lng: number,
  month: number,
  year: number
) => {
  const { data } = await axios.get(`https://api.aladhan.com/v1/calendar`, {
    params: {
      latitude: lat,
      longitude: lng,
      method: 2,
      month,
      year,
    },
  });

  return data.data;
};
