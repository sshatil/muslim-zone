import { useEffect, useState } from 'react';

import { DESKTOP_LOCATION_CHANGED_EVENT } from '../lib/location/location-events';

import {
  getSavedLocationMode,
  saveLocationMode,
  type LocationMode,
} from '../lib/location/location-preference';

export function useLocationPreference() {
  const [mode, setModeState] = useState<LocationMode>(() =>
    getSavedLocationMode(),
  );

  useEffect(() => {
    const syncMode = () => {
      setModeState(getSavedLocationMode());
    };

    window.addEventListener(DESKTOP_LOCATION_CHANGED_EVENT, syncMode);

    window.addEventListener('storage', syncMode);

    return () => {
      window.removeEventListener(DESKTOP_LOCATION_CHANGED_EVENT, syncMode);

      window.removeEventListener('storage', syncMode);
    };
  }, []);

  function setMode(nextMode: LocationMode) {
    saveLocationMode(nextMode);

    setModeState(nextMode);
  }

  return {
    mode,
    setMode,
  };
}
