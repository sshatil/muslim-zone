import {
  getPrayerDateKey,
  normalizePrayerName,
  PRAYER_ORDER,
  type PrayerName,
  type UserLocation,
} from '@muslim-zone/core';

import { DateTime } from 'luxon';

import { useCallback, useEffect, useMemo, useState } from 'react';

import { usePrayerTime } from './use-prayer-time';

export function usePrayerTimingState(location?: UserLocation) {
  const timezone = location?.timezone;

  const [dateKey, setDateKey] = useState(() => getPrayerDateKey(timezone));

  const refreshPrayerDateKey = useCallback(() => {
    const nextDateKey = getPrayerDateKey(timezone);

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

    return () => {
      clearInterval(interval);
    };
  }, [refreshPrayerDateKey]);

  const {
    data: prayerData,
    isLoading: isPrayerLoading,
    isFetching: isPrayerFetching,
    error: prayerError,
  } = usePrayerTime(location?.latitude, location?.longitude, dateKey);

  const currentPrayerInfo = useMemo(() => {
    if (!prayerData) {
      return null;
    }

    const zone = timezone || undefined;

    const now = zone ? DateTime.now().setZone(zone) : DateTime.now();

    let currentPrayer: PrayerName =
      normalizePrayerName(prayerData.currentPrayer) ?? 'Fajr';

    let nextPrayerName: PrayerName =
      normalizePrayerName(prayerData.nextPrayer) ?? 'Fajr';

    let nextPrayerTime: DateTime | null = null;

    for (const prayerName of PRAYER_ORDER) {
      const prayerDate = prayerData.prayerTimes[prayerName];

      if (!prayerDate) {
        continue;
      }

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

      if (!fajrDate) {
        return null;
      }

      nextPrayerName = 'Fajr';

      nextPrayerTime = zone
        ? DateTime.fromJSDate(fajrDate).setZone(zone).plus({
            days: 1,
          })
        : DateTime.fromJSDate(fajrDate).plus({
            days: 1,
          });
    }

    const currentPrayerDate = prayerData.prayerTimes[currentPrayer];

    if (!currentPrayerDate) {
      return null;
    }

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
    if (!currentPrayerInfo) {
      return '';
    }

    const options: Intl.DateTimeFormatOptions = {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    };

    if (timezone) {
      options.timeZone = timezone;
    }

    return new Intl.DateTimeFormat('en-US-u-ca-islamic', options).format(
      currentPrayerInfo.currentPrayerTime.toJSDate(),
    );
  }, [currentPrayerInfo, timezone]);

  return {
    prayerData,
    currentPrayerInfo,
    arabicDate,

    dateKey,
    refreshPrayerDateKey,

    isPrayerLoading,
    isPrayerFetching,
    prayerError,
  };
}
