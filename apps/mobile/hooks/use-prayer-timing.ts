import { useLocation } from '@/hooks/use-location';
import { usePrayerTimingState } from '@/hooks/use-prayer-timing-state';

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
