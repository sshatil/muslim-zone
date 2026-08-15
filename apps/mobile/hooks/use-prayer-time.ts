import {
  getPrayerCalculationDate,
  getTodayPrayerTimes,
} from '@muslim-zone/core';

import { useQuery } from '@tanstack/react-query';

export const usePrayerTime = (lat?: number, lng?: number, dateKey?: string) => {
  return useQuery({
    queryKey: ['prayer-time', lat, lng, dateKey],

    enabled: typeof lat === 'number' && typeof lng === 'number' && !!dateKey,

    staleTime: Infinity,

    queryFn: async () => {
      if (typeof lat !== 'number' || typeof lng !== 'number' || !dateKey) {
        throw new Error('Missing location or dateKey');
      }

      const date = getPrayerCalculationDate(dateKey);

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
