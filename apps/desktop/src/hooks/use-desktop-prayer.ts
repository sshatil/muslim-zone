import { usePrayerTimingState } from '@muslim-zone/react';

import { useDesktopLocation } from './use-desktop-location';

export function useDesktopPrayer() {
  const location = useDesktopLocation();

  const prayerTiming = usePrayerTimingState(location.data);

  return {
    locationData: location.data,

    ...prayerTiming,

    isLocationLoading: location.isLoading,

    isLocationFetching: location.isFetching,

    locationError: location.error,

    refetchLocation: location.refetch,

    locationMode: location.mode,

    isManualLocation: location.isManual,

    automaticFallbackUsed: location.automaticFallbackUsed,

    deviceLocationError: location.deviceError,
  };
}
