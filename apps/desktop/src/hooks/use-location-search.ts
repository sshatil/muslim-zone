import { searchLocations } from '@muslim-zone/core';

import { useQuery } from '@tanstack/react-query';

export function useLocationSearch(query: string) {
  const normalizedQuery = query.trim();

  return useQuery({
    queryKey: ['location', 'search', normalizedQuery],

    queryFn: () => searchLocations(normalizedQuery),

    enabled: normalizedQuery.length >= 2,

    staleTime: 30 * 60 * 1000,

    gcTime: 60 * 60 * 1000,

    retry: 1,

    refetchOnWindowFocus: false,
  });
}
