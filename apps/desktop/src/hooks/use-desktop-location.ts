import { useAutoLocation } from './use-auto-location';

import { getSavedManualLocation } from '../lib/location/manual-location-storage';

import { useLocationPreference } from './use-location-preference';

export function useDesktopLocation() {
  const { mode } = useLocationPreference();

  const autoLocation = useAutoLocation();

  const manualLocation = getSavedManualLocation();

  if (mode === 'manual' && manualLocation) {
    return {
      data: manualLocation,

      isLoading: false,
      isFetching: false,
      error: null,

      refetch: async () => ({
        data: manualLocation,
      }),
    };
  }

  return {
    ...autoLocation,

    data: autoLocation.data?.location,
  };
}
