import type { ReactNode } from 'react';

import { QueryClientProvider } from '@tanstack/react-query';

import { ThemeProvider } from '@muslim-zone/ui/components/theme-provider';
import { TooltipProvider } from '@muslim-zone/ui/components/tooltip';

import { queryClient } from '../lib/query-client';

type AppProvidersProps = {
  children: ReactNode;
};

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider
        defaultTheme='system'
        storageKey='muslim-zone-desktop-theme'
      >
        <TooltipProvider>{children}</TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
