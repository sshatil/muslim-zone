export type LocationMode = 'automatic' | 'manual';

export const LOCATION_MODE_STORAGE_KEY = 'muslim-zone-location-mode';

export function getSavedLocationMode(): LocationMode {
  try {
    const value = localStorage.getItem(LOCATION_MODE_STORAGE_KEY);

    if (value === 'manual' || value === 'automatic') {
      return value;
    }

    return 'automatic';
  } catch {
    return 'automatic';
  }
}

export function saveLocationMode(mode: LocationMode) {
  localStorage.setItem(LOCATION_MODE_STORAGE_KEY, mode);
}
