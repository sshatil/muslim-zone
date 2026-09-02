import { clearManualLocation } from './manual-location-storage';

import { saveLocationMode } from './location-preference';

export function resetToAutomaticLocation() {
  clearManualLocation();

  saveLocationMode('automatic');
}
