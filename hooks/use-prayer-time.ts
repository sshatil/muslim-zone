import { fetchMonthlyPrayerTimes } from '@/api/prayer-time';
import { useQuery } from '@tanstack/react-query';

export const usePrayerTime = (
  lat: number,
  lng: number,
  month: number,
  year: number
) => {
  return useQuery({
    queryKey: ['prayer-time', lat, lng, month, year],
    queryFn: () => fetchMonthlyPrayerTimes(lat, lng, month, year),
    enabled: !!lat && !!lng,
  });
};
