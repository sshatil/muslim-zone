import { CalculationMethod, Coordinates, PrayerTimes } from 'adhan';

import { DateTime } from 'luxon';

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

export function getPrayerTimesForDays(
  latitude: number,
  longitude: number,
  startDate: Date,
  numberOfDays: number,
  timezone?: string,
) {
  const start = DateTime.fromJSDate(startDate).setZone(timezone || 'local');

  return Array.from({ length: numberOfDays }, (_, index) => {
    const date = start.plus({ days: index });

    const calculationDate = date
      .set({
        hour: 12,
        minute: 0,
        second: 0,
        millisecond: 0,
      })
      .toJSDate();

    const data = getTodayPrayerTimes(latitude, longitude, calculationDate);

    return {
      date: date.toFormat('yyyy-MM-dd'),
      prayerTimes: data.prayerTimes,
    };
  });
}
