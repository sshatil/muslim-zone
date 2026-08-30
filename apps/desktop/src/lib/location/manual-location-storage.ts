import type { UserLocation } from '@muslim-zone/core';

export const MANUAL_LOCATION_STORAGE_KEY =
  'muslim-zone-desktop-manual-location';

function isValidManualLocation(value: unknown): value is UserLocation {
  if (!value || typeof value !== 'object') {
    return false;
  }

  const location = value as Partial<UserLocation>;

  return (
    typeof location.latitude === 'number' &&
    Number.isFinite(location.latitude) &&
    typeof location.longitude === 'number' &&
    Number.isFinite(location.longitude) &&
    location.source === 'manual'
  );
}

export function getSavedManualLocation(): UserLocation | null {
  try {
    const stored = window.localStorage.getItem(MANUAL_LOCATION_STORAGE_KEY);

    if (!stored) {
      return null;
    }

    const parsed = JSON.parse(stored);

    if (!isValidManualLocation(parsed)) {
      window.localStorage.removeItem(MANUAL_LOCATION_STORAGE_KEY);

      return null;
    }

    return parsed;
  } catch {
    return null;
  }
}

export function saveManualLocation(location: UserLocation) {
  if (location.source !== 'manual') {
    throw new Error('Only manual locations can be saved as a manual location.');
  }

  window.localStorage.setItem(
    MANUAL_LOCATION_STORAGE_KEY,
    JSON.stringify(location),
  );
}

export function clearManualLocation() {
  window.localStorage.removeItem(MANUAL_LOCATION_STORAGE_KEY);
}
