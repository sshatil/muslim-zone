import { DateTime } from 'luxon';

import type { PrayerName } from './types';

export function getPrayerDateKey(
  timezone?: string,
  now: Date = new Date(),
): string {
  return DateTime.fromJSDate(now)
    .setZone(timezone || 'local')
    .toFormat('yyyy-MM-dd');
}

export function getPrayerCalculationDate(dateKey: string): Date {
  return DateTime.fromFormat(dateKey, 'yyyy-MM-dd')
    .set({
      hour: 12,
      minute: 0,
      second: 0,
      millisecond: 0,
    })
    .toJSDate();
}

export function normalizePrayerName(name?: unknown): PrayerName | null {
  if (typeof name !== 'string') {
    return null;
  }

  const lower = name.toLowerCase();

  if (lower === 'fajr') return 'Fajr';
  if (lower === 'dhuhr') return 'Dhuhr';
  if (lower === 'asr') return 'Asr';
  if (lower === 'maghrib') return 'Maghrib';
  if (lower === 'isha') return 'Isha';

  return null;
}
