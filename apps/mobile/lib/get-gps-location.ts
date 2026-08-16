import {
  countryCodeToFlag,
  getTimezoneFromCoordinates,
  type UserLocation,
} from '@muslim-zone/core';

import * as Location from 'expo-location';

export const getGPSLocation = async (): Promise<UserLocation> => {
  const { status } = await Location.requestForegroundPermissionsAsync();

  if (status !== 'granted') {
    throw new Error('Location permission denied');
  }

  const location = await Location.getCurrentPositionAsync({
    accuracy: Location.Accuracy.Lowest,
  });

  const { latitude, longitude } = location.coords;

  const address = await Location.reverseGeocodeAsync({
    latitude,
    longitude,
  });

  const place = address?.[0];

  const countryCode = place?.isoCountryCode ?? '';

  return {
    latitude,
    longitude,

    city: place?.city ?? '',
    country: place?.country ?? '',
    countryCode,

    flag: countryCodeToFlag(countryCode),

    timezone: getTimezoneFromCoordinates(latitude, longitude),

    source: 'gps',
  };
};
