import axios from 'axios';

import type { UserLocation } from './types';

import { countryCodeToFlag, getTimezoneFromCoordinates } from './utils';

type IpWhoIsTimezone = {
  id?: string;
};

type IpWhoIsResponse = {
  success?: boolean;
  message?: string;

  latitude?: number | string;
  longitude?: number | string;

  city?: string;
  country?: string;
  country_code?: string;

  timezone?: string | IpWhoIsTimezone;
};

function getTimezoneId(
  timezone?: IpWhoIsResponse['timezone'],
): string | undefined {
  if (typeof timezone === 'string') {
    return timezone;
  }

  return timezone?.id;
}

export async function fetchLocationByIP(): Promise<UserLocation> {
  const { data } = await axios.get<IpWhoIsResponse>('https://ipwho.is/');

  if (data.success === false) {
    throw new Error(data.message || 'Unable to determine location from IP');
  }

  const latitude = Number(data.latitude);
  const longitude = Number(data.longitude);

  if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) {
    throw new Error('Invalid coordinates returned by IP location service');
  }

  const countryCode = data.country_code ?? '';

  const timezone =
    getTimezoneId(data.timezone) ??
    getTimezoneFromCoordinates(latitude, longitude);

  return {
    latitude,
    longitude,

    city: data.city ?? '',
    country: data.country ?? '',
    countryCode,

    flag: countryCodeToFlag(countryCode),

    timezone,

    source: 'ip',
  };
}
