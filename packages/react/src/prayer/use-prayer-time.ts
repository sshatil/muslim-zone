import {
  getPrayerCalculationDate,
  getTodayPrayerTimes,
} from '@muslim-zone/core';

import { useQuery } from '@tanstack/react-query';

export function usePrayerTime(
  latitude?: number,
  longitude?: number,
  dateKey?: string,
) {
  return useQuery({
    queryKey: ['prayer-time', latitude, longitude, dateKey],

    enabled:
      typeof latitude === 'number' &&
      typeof longitude === 'number' &&
      !!dateKey,

    staleTime: Infinity,

    queryFn: async () => {
      if (
        typeof latitude !== 'number' ||
        typeof longitude !== 'number' ||
        !dateKey
      ) {
        throw new Error('Missing location or dateKey');
      }

      const date = getPrayerCalculationDate(dateKey);

      const data = await getTodayPrayerTimes(latitude, longitude, date);

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
}
