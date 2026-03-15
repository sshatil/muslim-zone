import { getTodayPrayerTimes } from '@/api/prayer-time';
import { useQuery } from '@tanstack/react-query';

export const usePrayerTime = (
  lat: number,
  lng: number,
  dateKey: string, // only refetch in new day
) => {
  return useQuery({
    queryKey: ['prayer-time', lat, lng, dateKey],
    enabled: !!lat && !!lng && !!dateKey,
    staleTime: Infinity, // don’t refetch until key changes (e.g. new day)
    queryFn: async () => {
      const date = new Date(dateKey + 'T12:00:00');
      const data = await getTodayPrayerTimes(lat, lng, date);

      return {
        ...data,
        prayerTimes: {
          Fajr: new Date(data.prayerTimes.Fajr),
          Dhuhr: new Date(data.prayerTimes.Dhuhr),
          Asr: new Date(data.prayerTimes.Asr),
          Maghrib: new Date(data.prayerTimes.Maghrib),
          Isha: new Date(data.prayerTimes.Isha),
        },
      };
    },
  });
};
