import type { UserLocation } from '@muslim-zone/core';

import { useAutoLocation } from './use-auto-location';

import { useLocationPreference } from './use-location-preference';

import { useSavedManualLocation } from './use-saved-manual-location';

import type { LocationMode } from '../lib/location/location-preference';

type DesktopLocationResult = {
  data: UserLocation | undefined;

  isLoading: boolean;
  isFetching: boolean;

  error: Error | null;

  refetch: () => Promise<void>;

  mode: LocationMode;

  isManual: boolean;

  automaticFallbackUsed: boolean;

  deviceError?: Error;
};

export function useDesktopLocation(): DesktopLocationResult {
  const { mode } = useLocationPreference();

  const manualLocation = useSavedManualLocation();

  const isManual = mode === 'manual' && manualLocation !== null;

  const autoLocation = useAutoLocation(!isManual);

  if (isManual && manualLocation) {
    return {
      data: manualLocation,

      isLoading: false,

      isFetching: false,

      error: null,

      refetch: async () => {
        // Manual locations do not
        // require a network refresh.
      },

      mode,

      isManual: true,

      automaticFallbackUsed: false,
    };
  }

  return {
    data: autoLocation.data?.location,

    isLoading: autoLocation.isLoading,

    isFetching: autoLocation.isFetching,

    error: autoLocation.error,

    refetch: async () => {
      await autoLocation.refetch();
    },

    mode,

    isManual: false,

    automaticFallbackUsed: autoLocation.data?.fallbackUsed ?? false,

    deviceError: autoLocation.data?.deviceError,
  };
}
