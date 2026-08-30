import type { LocationSearchResult } from '@muslim-zone/core';

export function formatSearchLocation(location: LocationSearchResult) {
  const parts = [location.name, location.admin1, location.country].filter(
    (value, index, values) => Boolean(value) && values.indexOf(value) === index,
  );

  return parts.join(', ');
}
