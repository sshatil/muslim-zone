import {
  FeaturedDuasProvider as SharedFeaturedDuasProvider,
  useFeaturedDuas,
} from '@muslim-zone/react';

import { mobileStorage } from '@/lib/storage';

import type { ReactNode } from 'react';

export function FeaturedDuasProvider({ children }: { children: ReactNode }) {
  return (
    <SharedFeaturedDuasProvider storage={mobileStorage} moduleKey='daily'>
      {children}
    </SharedFeaturedDuasProvider>
  );
}

export { useFeaturedDuas };
