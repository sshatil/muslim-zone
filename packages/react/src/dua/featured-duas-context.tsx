import { getDefaultFeaturedIds } from '@muslim-zone/core';

import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

import type { StorageAdapter } from '../storage/types';

export const FEATURED_DUAS_STORAGE_KEY = 'user-featured-dua-ids';

export type FeaturedDuasContextValue = {
  featuredIds: number[];

  isLoaded: boolean;

  isFavourited: (id: number) => boolean;

  toggle: (id: number) => void;

  add: (id: number) => void;

  remove: (id: number) => void;
};

type FeaturedDuasProviderProps = {
  children: ReactNode;

  storage: StorageAdapter;

  moduleKey?: string;

  storageKey?: string;
};

const FeaturedDuasContext = createContext<FeaturedDuasContextValue | null>(
  null,
);

function parseFeaturedIds(raw: string): number[] | null {
  try {
    const parsed: unknown = JSON.parse(raw);

    if (!Array.isArray(parsed)) {
      return null;
    }

    if (
      !parsed.every(
        (value) => typeof value === 'number' && Number.isFinite(value),
      )
    ) {
      return null;
    }

    return parsed;
  } catch {
    return null;
  }
}

export function FeaturedDuasProvider({
  children,
  storage,
  moduleKey = 'daily',
  storageKey = FEATURED_DUAS_STORAGE_KEY,
}: FeaturedDuasProviderProps) {
  const [featuredIds, setFeaturedIds] = useState<number[]>([]);

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const loadFeaturedDuas = async () => {
      try {
        const raw = await storage.getItem(storageKey);

        if (!isMounted) {
          return;
        }

        if (raw !== null) {
          const parsed = parseFeaturedIds(raw);

          if (parsed) {
            setFeaturedIds(parsed);

            return;
          }
        }

        setFeaturedIds(getDefaultFeaturedIds(moduleKey));
      } catch {
        if (!isMounted) {
          return;
        }

        setFeaturedIds(getDefaultFeaturedIds(moduleKey));
      } finally {
        if (isMounted) {
          setIsLoaded(true);
        }
      }
    };

    void loadFeaturedDuas();

    return () => {
      isMounted = false;
    };
  }, [moduleKey, storage, storageKey]);

  const persist = useCallback(
    (ids: number[]) => {
      storage.setItem(storageKey, JSON.stringify(ids)).catch(() => {
        // Persistence failure should
        // not break the UI state.
      });
    },
    [storage, storageKey],
  );

  const add = useCallback(
    (id: number) => {
      setFeaturedIds((previousIds) => {
        if (previousIds.includes(id)) {
          return previousIds;
        }

        const nextIds = [...previousIds, id];

        persist(nextIds);

        return nextIds;
      });
    },
    [persist],
  );

  const remove = useCallback(
    (id: number) => {
      setFeaturedIds((previousIds) => {
        const nextIds = previousIds.filter((existingId) => existingId !== id);

        persist(nextIds);

        return nextIds;
      });
    },
    [persist],
  );

  const toggle = useCallback(
    (id: number) => {
      setFeaturedIds((previousIds) => {
        const nextIds = previousIds.includes(id)
          ? previousIds.filter((existingId) => existingId !== id)
          : [...previousIds, id];

        persist(nextIds);

        return nextIds;
      });
    },
    [persist],
  );

  const isFavourited = useCallback(
    (id: number) => featuredIds.includes(id),
    [featuredIds],
  );

  return (
    <FeaturedDuasContext.Provider
      value={{
        featuredIds,
        isLoaded,
        isFavourited,
        toggle,
        add,
        remove,
      }}
    >
      {children}
    </FeaturedDuasContext.Provider>
  );
}

export function useFeaturedDuas(): FeaturedDuasContextValue {
  const context = useContext(FeaturedDuasContext);

  if (!context) {
    throw new Error(
      'useFeaturedDuas must be used inside <FeaturedDuasProvider>',
    );
  }

  return context;
}
