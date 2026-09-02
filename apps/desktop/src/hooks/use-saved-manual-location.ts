import { useEffect, useState } from 'react';

import type { UserLocation } from '@muslim-zone/core';

import { DESKTOP_LOCATION_CHANGED_EVENT } from '../lib/location/location-events';

import { getSavedManualLocation } from '../lib/location/manual-location-storage';

export function useSavedManualLocation() {
  const [location, setLocation] = useState<UserLocation | null>(() =>
    getSavedManualLocation(),
  );

  useEffect(() => {
    const syncLocation = () => {
      setLocation(getSavedManualLocation());
    };

    window.addEventListener(DESKTOP_LOCATION_CHANGED_EVENT, syncLocation);

    window.addEventListener('storage', syncLocation);

    return () => {
      window.removeEventListener(DESKTOP_LOCATION_CHANGED_EVENT, syncLocation);

      window.removeEventListener('storage', syncLocation);
    };
  }, []);

  return location;
}
