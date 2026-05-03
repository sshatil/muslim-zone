import * as Location from 'expo-location';
import tzLookup from 'tz-lookup';

const countryCodeToFlag = (countryCode?: string): string => {
  if (!countryCode || countryCode.length !== 2) return '';

  return countryCode
    .toUpperCase()
    .replace(/./g, (char) => String.fromCodePoint(127397 + char.charCodeAt(0)));
};

export const getGPSLocation = async () => {
  const { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== 'granted') {
    throw new Error('Location permission denied');
  }

  const location = await Location.getCurrentPositionAsync({
    accuracy: Location.Accuracy.Balanced, // Use Balanced accuracy for general usage
  });

  const { latitude, longitude } = location.coords;

  const address = await Location.reverseGeocodeAsync({
    latitude,
    longitude,
  });

  const place = address?.[0];
  const countryCode = place?.isoCountryCode ?? '';
  const flag = countryCodeToFlag(countryCode);

  const timezone = tzLookup(latitude, longitude);

  return {
    latitude,
    longitude,
    city: place?.city ?? '',
    country: place?.country ?? '',
    countryCode,
    flag,
    timezone, // Correct timezone data
    source: 'gps',
  };
};
