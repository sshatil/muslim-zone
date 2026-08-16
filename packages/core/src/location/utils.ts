import tzLookup from 'tz-lookup';

export function countryCodeToFlag(countryCode?: string): string {
  if (!countryCode || countryCode.length !== 2) {
    return '';
  }

  return countryCode
    .toUpperCase()
    .replace(/./g, (char) => String.fromCodePoint(127397 + char.charCodeAt(0)));
}

export function getTimezoneFromCoordinates(
  latitude: number,
  longitude: number,
): string | undefined {
  if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) {
    return undefined;
  }

  try {
    return tzLookup(latitude, longitude);
  } catch {
    return undefined;
  }
}
