import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,

      gcTime: 30 * 60 * 1000,

      retry: 2,

      refetchOnWindowFocus: true,

      refetchOnReconnect: true,

      refetchOnMount: true,
    },

    mutations: {
      retry: 0,
    },
  },
});
