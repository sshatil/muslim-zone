import { getPrayerTimesForDays } from '@muslim-zone/core';
import { useMemo } from 'react';

import type { UserLocation } from '@muslim-zone/core';

export function usePrayerWeek(
  location: UserLocation | undefined,
  numberOfDays = 7,
) {
  const prayerDays = useMemo(() => {
    if (!location) {
      return [];
    }

    return getPrayerTimesForDays(
      location.latitude,
      location.longitude,
      new Date(),
      numberOfDays,
      location.timezone,
    );
  }, [
    location?.latitude,
    location?.longitude,
    location?.timezone,
    numberOfDays,
  ]);

  return {
    prayerDays,
    isLoading: !location,
  };
}
