import axios from 'axios';

import type { UserLocation } from './types';

import type { LocationSearchResult } from './search-types';

import { countryCodeToFlag, getTimezoneFromCoordinates } from './utils';

const OPEN_METEO_GEOCODING_URL =
  'https://geocoding-api.open-meteo.com/v1/search';

type OpenMeteoLocation = {
  id: number;
  name: string;

  latitude: number;
  longitude: number;

  country?: string;
  country_code?: string;

  admin1?: string;
  admin2?: string;

  timezone?: string;
};

type OpenMeteoGeocodingResponse = {
  results?: OpenMeteoLocation[];
};

export async function searchLocations(
  query: string,
): Promise<LocationSearchResult[]> {
  const normalizedQuery = query.trim();

  if (normalizedQuery.length < 2) {
    return [];
  }

  const response = await axios.get<OpenMeteoGeocodingResponse>(
    OPEN_METEO_GEOCODING_URL,
    {
      params: {
        name: normalizedQuery,
        count: 8,
        language: 'en',
        format: 'json',
      },

      timeout: 10_000,
    },
  );

  const results = response.data.results ?? [];

  return results.map((location) => ({
    id: location.id,

    name: location.name,

    latitude: location.latitude,

    longitude: location.longitude,

    country: location.country,

    countryCode: location.country_code,

    admin1: location.admin1,

    admin2: location.admin2,

    timezone: location.timezone,
  }));
}

export function locationSearchResultToManualLocation(
  result: LocationSearchResult,
): UserLocation {
  const timezone =
    result.timezone ??
    getTimezoneFromCoordinates(result.latitude, result.longitude);

  return {
    latitude: result.latitude,

    longitude: result.longitude,

    city: result.name,

    country: result.country,

    countryCode: result.countryCode,

    flag: result.countryCode
      ? countryCodeToFlag(result.countryCode)
      : undefined,

    timezone,

    source: 'manual',
  };
}
