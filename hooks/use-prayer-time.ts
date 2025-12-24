// import { getTodayPrayerTimes } from '@/api/prayer-time';
// import { useQuery } from '@tanstack/react-query';

// export const usePrayerTime = (
//   lat: number,
//   lng: number,
//   date: Date = new Date()
// ) => {
//   return useQuery({
//     queryKey: ['prayer-time', lat, lng, date],
//     queryFn: () => getTodayPrayerTimes(lat, lng, date),
//     enabled: !!lat && !!lng && !!date,
//   });
// };

///////////
import { getTodayPrayerTimes } from '@/api/prayer-time';
import { useQuery } from '@tanstack/react-query';

export const usePrayerTime = (
  lat: number,
  lng: number,
  date: Date = new Date()
) => {
  return useQuery({
    queryKey: ['prayer-time', lat, lng, date.toDateString()],
    enabled: !!lat && !!lng,
    queryFn: async () => {
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
