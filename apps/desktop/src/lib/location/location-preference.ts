import { emitDesktopLocationChanged } from './location-events';

export type LocationMode = 'automatic' | 'manual';

export const LOCATION_MODE_STORAGE_KEY = 'muslim-zone-location-mode';

export function getSavedLocationMode(): LocationMode {
  try {
    const value = window.localStorage.getItem(LOCATION_MODE_STORAGE_KEY);

    if (value === 'automatic' || value === 'manual') {
      return value;
    }

    return 'automatic';
  } catch {
    return 'automatic';
  }
}

export function saveLocationMode(mode: LocationMode) {
  window.localStorage.setItem(LOCATION_MODE_STORAGE_KEY, mode);

  emitDesktopLocationChanged();
}
