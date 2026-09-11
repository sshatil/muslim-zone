import {
  getTimezoneFromCoordinates,
  type UserLocation,
} from '@muslim-zone/core';

const LOCATION_TIMEOUT_MS = 10_000;

function getCurrentPosition(): Promise<GeolocationPosition> {
  return new Promise((resolve, reject) => {
    if (typeof navigator === 'undefined' || !navigator.geolocation) {
      reject(new Error('Device location is not available on this system.'));

      return;
    }

    navigator.geolocation.getCurrentPosition(
      resolve,

      (error) => {
        switch (error.code) {
          case error.PERMISSION_DENIED:
            reject(new Error('Location permission was denied.'));
            break;

          case error.POSITION_UNAVAILABLE:
            reject(new Error('Device location is unavailable.'));
            break;

          case error.TIMEOUT:
            reject(new Error('Device location request timed out.'));
            break;

          default:
            reject(
              new Error(error.message || 'Unable to get device location.'),
            );
        }
      },

      {
        enableHighAccuracy: false,

        timeout: LOCATION_TIMEOUT_MS,

        maximumAge: 5 * 60 * 1000,
      },
    );
  });
}

export async function getDeviceLocation(): Promise<UserLocation> {
  const position = await getCurrentPosition();

  const latitude = position.coords.latitude;

  const longitude = position.coords.longitude;

  const timezone = getTimezoneFromCoordinates(latitude, longitude);

  return {
    latitude,
    longitude,
    timezone,
    source: 'gps',
  };
}
