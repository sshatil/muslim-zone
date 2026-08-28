import { fetchLocationByIP, type UserLocation } from '@muslim-zone/core';

import { getDeviceLocation } from './get-device-location';

export type AutomaticLocationResult = {
  location: UserLocation;
  fallbackUsed: boolean;
  deviceError?: Error;
};

export async function getAutoLocation(): Promise<AutomaticLocationResult> {
  try {
    const location = await getDeviceLocation();

    return {
      location,
      fallbackUsed: false,
    };
  } catch (error) {
    const deviceError =
      error instanceof Error
        ? error
        : new Error('Device location is unavailable.');

    if (import.meta.env.DEV) {
      console.info(
        '[location] Device location unavailable; using IP fallback.',
        deviceError.message,
      );
    }

    const location = await fetchLocationByIP();

    return {
      location,
      fallbackUsed: true,
      deviceError,
    };
  }
}
