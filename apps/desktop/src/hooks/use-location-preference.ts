import { useState } from 'react';

import {
  getSavedLocationMode,
  saveLocationMode,
  type LocationMode,
} from '../lib/location/location-preference';

export function useLocationPreference() {
  const [mode, setModeState] = useState<LocationMode>(() =>
    getSavedLocationMode(),
  );

  function setMode(nextMode: LocationMode) {
    saveLocationMode(nextMode);

    setModeState(nextMode);
  }

  return {
    mode,
    setMode,
  };
}
