import { useQuery } from '@tanstack/react-query';

import { getAutoLocation } from '../lib/location/get-auto-location';

export const autoLocationQueryKey = [
  'desktop',
  'location',
  'automatic',
] as const;

export function useAutoLocation() {
  return useQuery({
    queryKey: autoLocationQueryKey,

    queryFn: getAutoLocation,

    staleTime: 30 * 60 * 1000,

    gcTime: 24 * 60 * 60 * 1000,

    refetchOnWindowFocus: false,

    refetchOnReconnect: true,

    retry: 1,
  });
}
