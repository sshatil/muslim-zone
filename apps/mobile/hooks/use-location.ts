import { fetchLocationByIP } from '@/api/location';
import { getGPSLocation } from '@/lib/get-gps-location';
import { countryCodeToFlag } from '@/utils/utils';
import { useQuery } from '@tanstack/react-query';
import tzLookup from 'tz-lookup';

export type UserLocation = {
  latitude: number;
  longitude: number;
  city?: string;
  country?: string;
  countryCode?: string;
  flag?: string;
  timezone?: string;
  source: 'gps' | 'ip';
};

const GPS_TIMEOUT_MS = 40000;

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
    const gps = await withTimeout(
      getGPSLocation(),
      GPS_TIMEOUT_MS,
      'GPS location request timed out',
    );

    return {
      latitude: Number(gps.latitude),
      longitude: Number(gps.longitude),
      city: gps.city ?? '',
      country: gps.country ?? '',
      countryCode: gps.countryCode ?? '',
      flag: gps.flag ?? countryCodeToFlag(gps.countryCode),
      timezone: gps.timezone,
      source: 'gps',
    };
  } catch (error) {
    console.log(
      '[Location] GPS failed or timed out. Using IP fallback:',
      error,
    );

    const ip = await fetchLocationByIP();

    const latitude = Number(ip.latitude);
    const longitude = Number(ip.longitude);

    const countryCode = ip.countryCode ?? '';

    const timezone =
      ip.timezone?.id ??
      ip.timezone ??
      (Number.isFinite(latitude) && Number.isFinite(longitude)
        ? tzLookup(latitude, longitude)
        : undefined);

    return {
      latitude,
      longitude,
      city: ip.city ?? '',
      country: ip.country ?? '',
      countryCode,
      flag: countryCodeToFlag(countryCode),
      timezone,
      source: 'ip',
    };
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
