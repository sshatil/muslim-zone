export const PRAYER_ORDER = [
  'Fajr',
  'Dhuhr',
  'Asr',
  'Maghrib',
  'Isha',
] as const;

export type PrayerName = (typeof PRAYER_ORDER)[number];

export type PrayerTimesIso = Record<PrayerName, string>;
