import { CalculationMethod, Coordinates, PrayerTimes } from 'adhan';

import type { PrayerTimesIso } from './types';

export function getTodayPrayerTimes(
  latitude: number,
  longitude: number,
  date: Date = new Date(),
) {
  const coordinates = new Coordinates(latitude, longitude);

  const params = CalculationMethod.MuslimWorldLeague();

  const prayers = new PrayerTimes(coordinates, date, params);

  const prayerTimes: PrayerTimesIso = {
    Fajr: prayers.fajr.toISOString(),
    Dhuhr: prayers.dhuhr.toISOString(),
    Asr: prayers.asr.toISOString(),
    Maghrib: prayers.maghrib.toISOString(),
    Isha: prayers.isha.toISOString(),
  };

  return {
    prayerTimes,
    currentPrayer: prayers.currentPrayer(),
    nextPrayer: prayers.nextPrayer(),
  };
}
