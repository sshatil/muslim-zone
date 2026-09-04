import type { PrayerName } from '@muslim-zone/core';

export const PRAYER_ARABIC_NAMES: Record<PrayerName, string> = {
  Fajr: 'الفجر',
  Dhuhr: 'الظهر',
  Asr: 'العصر',
  Maghrib: 'المغرب',
  Isha: 'العشاء',
};

export function formatPrayerTime(
  value: Date | string | undefined,
  timezone?: string,
) {
  if (!value) {
    return '--:--';
  }

  const date = value instanceof Date ? value : new Date(value);

  if (Number.isNaN(date.getTime())) {
    return '--:--';
  }

  try {
    return new Intl.DateTimeFormat(undefined, {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
      timeZone: timezone,
    }).format(date);
  } catch {
    return new Intl.DateTimeFormat(undefined, {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    }).format(date);
  }
}

export function formatLocation(city?: string, country?: string) {
  if (city && country) {
    return `${city}, ${country}`;
  }

  return city ?? country ?? 'Current location';
}

export function getLocationSourceLabel(source?: string) {
  switch (source) {
    case 'manual':
      return 'Manual';

    case 'gps':
      return 'Device';

    case 'ip':
      return 'IP';

    default:
      return 'Unknown';
  }
}
