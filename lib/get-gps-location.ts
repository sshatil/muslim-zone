import * as Location from 'expo-location';

const countryCodeToFlag = (countryCode: string): string => {
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
    accuracy: Location.Accuracy.BestForNavigation,
  });

  const address = await Location.reverseGeocodeAsync({
    latitude: location.coords.latitude,
    longitude: location.coords.longitude,
  });

  const place = address?.[0];

  const countryCode = place?.isoCountryCode ?? '';
  const flag = countryCodeToFlag(countryCode);

  console.log({
    country: place?.country,
    countryCode,
    flag,
  });

  return {
    latitude: location.coords.latitude,
    longitude: location.coords.longitude,
    city: place?.city ?? '',
    country: place?.country ?? '',
    countryCode,
    flag,
  };
};
