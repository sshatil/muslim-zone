import { usePrayerTimingState } from '@muslim-zone/react';

import { useLocation } from '@/hooks/use-location';

export function usePrayerTiming() {
  const {
    data: locationData,
    isLoading: isLocationLoading,
    isFetching: isLocationFetching,
    error: locationError,
  } = useLocation();

  const prayerTiming = usePrayerTimingState(locationData);

  return {
    locationData,

    ...prayerTiming,

    isLocationLoading,
    isLocationFetching,
    locationError,
  };
}
