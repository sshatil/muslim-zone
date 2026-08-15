import { useLocation } from '@/hooks/use-location';
import { usePrayerTime } from '@/hooks/use-prayer-time';
import { DateTime } from 'luxon';
import { useCallback, useEffect, useMemo, useState } from 'react';

function getDateKey(timezone?: string): string {
  return DateTime.now()
    .setZone(timezone || 'local')
    .toFormat('yyyy-MM-dd');
}

function normalizePrayerName(name?: string) {
  if (!name) return null;

  const lower = name.toLowerCase();

  if (lower === 'fajr') return 'Fajr';
  if (lower === 'dhuhr') return 'Dhuhr';
  if (lower === 'asr') return 'Asr';
  if (lower === 'maghrib') return 'Maghrib';
  if (lower === 'isha') return 'Isha';

  return null;
}

export function usePrayerTiming() {
  const {
    data: locationData,
    isLoading: isLocationLoading,
    isFetching: isLocationFetching,
    error: locationError,
  } = useLocation();

  const timezone = locationData?.timezone;

  const [dateKey, setDateKey] = useState(() => getDateKey());

  const refreshPrayerDateKey = useCallback(() => {
    const nextDateKey = getDateKey(timezone);

    setDateKey((previousDateKey) =>
      previousDateKey !== nextDateKey ? nextDateKey : previousDateKey,
    );
  }, [timezone]);

  useEffect(() => {
    refreshPrayerDateKey();
  }, [refreshPrayerDateKey]);

  useEffect(() => {
    const interval = setInterval(() => {
      refreshPrayerDateKey();
    }, 60_000);

    return () => clearInterval(interval);
  }, [refreshPrayerDateKey]);

  const {
    data: prayerData,
    isLoading: isPrayerLoading,
    isFetching: isPrayerFetching,
    error: prayerError,
  } = usePrayerTime(locationData?.latitude, locationData?.longitude, dateKey);

  const currentPrayerInfo = useMemo(() => {
    if (!prayerData) return null;

    const zone = timezone || undefined;

    const now = zone ? DateTime.now().setZone(zone) : DateTime.now();

    const prayerOrder = ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'] as const;

    type PrayerName = (typeof prayerOrder)[number];

    let currentPrayer: PrayerName =
      normalizePrayerName(prayerData.currentPrayer) ?? 'Fajr';

    let nextPrayerName: PrayerName =
      normalizePrayerName(prayerData.nextPrayer) ?? 'Fajr';

    let nextPrayerTime: DateTime | null = null;

    for (const prayerName of prayerOrder) {
      const prayerDate = prayerData.prayerTimes[prayerName];

      if (!prayerDate) continue;

      const prayerTime = zone
        ? DateTime.fromJSDate(prayerDate).setZone(zone)
        : DateTime.fromJSDate(prayerDate);

      if (now < prayerTime) {
        nextPrayerName = prayerName;
        nextPrayerTime = prayerTime;
        break;
      }

      currentPrayer = prayerName;
    }

    if (!nextPrayerTime) {
      const fajrDate = prayerData.prayerTimes.Fajr;

      if (!fajrDate) return null;

      nextPrayerName = 'Fajr';

      nextPrayerTime = zone
        ? DateTime.fromJSDate(fajrDate).setZone(zone).plus({ days: 1 })
        : DateTime.fromJSDate(fajrDate).plus({ days: 1 });
    }

    const currentPrayerDate = prayerData.prayerTimes[currentPrayer];

    if (!currentPrayerDate) return null;

    const currentPrayerTime = zone
      ? DateTime.fromJSDate(currentPrayerDate).setZone(zone)
      : DateTime.fromJSDate(currentPrayerDate);

    return {
      currentPrayer,
      nextPrayerName,
      currentPrayerTime,
      nextPrayerTime,
    };
  }, [prayerData, timezone]);

  const arabicDate = useMemo(() => {
    if (!currentPrayerInfo) return '';

    const formatterOptions: Intl.DateTimeFormatOptions = {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    };

    if (timezone) {
      formatterOptions.timeZone = timezone;
    }

    return new Intl.DateTimeFormat(
      'en-US-u-ca-islamic',
      formatterOptions,
    ).format(currentPrayerInfo.currentPrayerTime.toJSDate());
  }, [currentPrayerInfo, timezone]);

  return {
    locationData,
    prayerData,
    currentPrayerInfo,
    arabicDate,

    dateKey,
    refreshPrayerDateKey,

    isLocationLoading,
    isLocationFetching,
    locationError,

    isPrayerLoading,
    isPrayerFetching,
    prayerError,
  };
}
