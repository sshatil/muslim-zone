import { fetchLocationByIP } from '@/api/location';
import { getGPSLocation } from '@/lib/get-gps-location';
import { useQuery } from '@tanstack/react-query';

export type UserLocation = {
  latitude: number;
  longitude: number;
  city?: string;
  country?: string;
  countryCode?: string;
  flag?: string;
  source: 'gps' | 'ip';
};

const getUserLocation = async (): Promise<UserLocation> => {
  try {
    // Try GPS first
    const gps = await getGPSLocation();
    return {
      ...gps,
      source: 'gps',
    };
  } catch {
    // Fallback to IP
    const ip = await fetchLocationByIP();
    return {
      latitude: ip.latitude,
      longitude: ip.longitude,
      city: ip.city,
      country: ip.country,
      countryCode: ip.countryCode,
      flag: ip.flag,
      source: 'ip',
    };
  }
};

export const useLocation = () => {
  return useQuery({
    queryKey: ['user-location'],
    queryFn: getUserLocation,
    staleTime: 1000 * 60 * 60, // 1 hour
  });
};
