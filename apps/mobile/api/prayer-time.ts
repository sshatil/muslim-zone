// import { CalculationMethod, Coordinates, PrayerTimes } from 'adhan';

// export const getTodayPrayerTimes = (
//   latitude: number,
//   longitude: number,
//   date: Date = new Date()
// ) => {
//   const coordinates = new Coordinates(latitude, longitude);
//   const params = CalculationMethod.MuslimWorldLeague();

//   const prayers = new PrayerTimes(coordinates, date, params);
//   const nextPrayer = prayers.nextPrayer();

//   const prayerTimes = {
//     Fajr: prayers.fajr,
//     Dhuhr: prayers.dhuhr,
//     Asr: prayers.asr,
//     Maghrib: prayers.maghrib,
//     Isha: prayers.isha,
//   };

//   return {
//     prayerTimes,
//     nextPrayer,
//   };
// };

/////////////////
import { CalculationMethod, Coordinates, PrayerTimes } from 'adhan';

export const getTodayPrayerTimes = (
  latitude: number,
  longitude: number,
  date: Date = new Date()
) => {
  const coordinates = new Coordinates(latitude, longitude);
  const params = CalculationMethod.MuslimWorldLeague();

  const prayers = new PrayerTimes(coordinates, date, params);

  return {
    prayerTimes: {
      Fajr: prayers.fajr.toISOString(),
      Dhuhr: prayers.dhuhr.toISOString(),
      Asr: prayers.asr.toISOString(),
      Maghrib: prayers.maghrib.toISOString(),
      Isha: prayers.isha.toISOString(),
    },
    currentPrayer: prayers.currentPrayer(),
    nextPrayer: prayers.nextPrayer(),
  };
};
