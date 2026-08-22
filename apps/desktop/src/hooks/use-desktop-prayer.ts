import { usePrayerTimingState } from '@muslim-zone/react';
import { useDesktopLocation } from './use-desktop-location';

export function useDesktopPrayer() {
  const {
    data: locationData,
    isLoading: isLocationLoading,
    isFetching: isLocationFetching,
    error: locationError,
    refetch: refetchLocation,
  } = useDesktopLocation();

  console.log('locationData', locationData);

  const prayerTiming = usePrayerTimingState(locationData);

  return {
    locationData,

    ...prayerTiming,

    isLocationLoading,
    isLocationFetching,
    locationError,

    refetchLocation,
  };
}

export type DesktopPrayerState = ReturnType<typeof useDesktopPrayer>;
