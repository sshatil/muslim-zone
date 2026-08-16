import { fetchLocationByIP, type UserLocation } from '@muslim-zone/core';

import { getGPSLocation } from '@/lib/get-gps-location';

import { useQuery } from '@tanstack/react-query';

const GPS_TIMEOUT_MS = 40_000;

const withTimeout = async <T>(
  promise: Promise<T>,
  timeoutMs: number,
  errorMessage: string,
): Promise<T> => {
  let timeoutId: ReturnType<typeof setTimeout> | undefined;

  const timeoutPromise = new Promise<never>((_, reject) => {
    timeoutId = setTimeout(() => {
      reject(new Error(errorMessage));
    }, timeoutMs);
  });

  try {
    return await Promise.race([promise, timeoutPromise]);
  } finally {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
  }
};

const getUserLocation = async (): Promise<UserLocation> => {
  try {
    return await withTimeout(
      getGPSLocation(),
      GPS_TIMEOUT_MS,
      'GPS location request timed out',
    );
  } catch (error) {
    console.log(
      '[Location] GPS failed or timed out. Using IP fallback:',
      error,
    );

    return fetchLocationByIP();
  }
};

export const useLocation = () => {
  return useQuery({
    queryKey: ['user-location'],
    queryFn: getUserLocation,

    staleTime: 1000 * 60 * 60,

    retry: 1,
  });
};
