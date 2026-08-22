import { fetchLocationByIP } from '@muslim-zone/core';
import { useQuery } from '@tanstack/react-query';

export const desktopLocationQueryKey = ['desktop', 'location', 'ip'] as const;

export function useDesktopLocation() {
  return useQuery({
    queryKey: desktopLocationQueryKey,

    queryFn: fetchLocationByIP,

    staleTime: 30 * 60 * 1000,

    gcTime: 24 * 60 * 60 * 1000,

    refetchOnWindowFocus: false,

    refetchOnReconnect: true,

    retry: 2,
  });
}
