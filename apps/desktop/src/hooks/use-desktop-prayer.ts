import { usePrayerTimingState } from '@muslim-zone/react';
import { useQueryClient } from '@tanstack/react-query';

import { useDesktopLocation } from './use-desktop-location';

export function useDesktopPrayer() {
  const location = useDesktopLocation();
  const queryClient = useQueryClient();

  const prayerTiming = usePrayerTimingState(location.data);

  const refetchPrayer = async () => {
    if (!location.data || !prayerTiming.dateKey) {
      return;
    }

    await queryClient.refetchQueries({
      queryKey: [
        'prayer-time',
        location.data.latitude,
        location.data.longitude,
        prayerTiming.dateKey,
      ],
      exact: true,
    });
  };

  return {
    locationData: location.data,

    ...prayerTiming,

    isLocationLoading: location.isLoading,
    isLocationFetching: location.isFetching,

    locationError: location.error,

    refetchLocation: location.refetch,
    refetchPrayer,

    locationMode: location.mode,
    isManualLocation: location.isManual,
    automaticFallbackUsed: location.automaticFallbackUsed,
    deviceLocationError: location.deviceError,
  };
}
