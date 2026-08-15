import { getTodayPrayerTimes } from '@/api/prayer-time';
import { useQuery } from '@tanstack/react-query';
import { DateTime } from 'luxon';

export const usePrayerTime = (lat?: number, lng?: number, dateKey?: string) => {
  return useQuery({
    queryKey: ['prayer-time', lat, lng, dateKey],
    enabled: typeof lat === 'number' && typeof lng === 'number' && !!dateKey,
    staleTime: Infinity,
    queryFn: async () => {
      if (typeof lat !== 'number' || typeof lng !== 'number' || !dateKey) {
        throw new Error('Missing location or dateKey');
      }

      const date = DateTime.fromFormat(dateKey, 'yyyy-MM-dd')
        .set({
          hour: 12,
          minute: 0,
          second: 0,
          millisecond: 0,
        })
        .toJSDate();

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
