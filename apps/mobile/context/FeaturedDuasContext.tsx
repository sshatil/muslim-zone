import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

import { getDefaultFeaturedIds } from '@muslim-zone/core';

const STORAGE_KEY = 'user-featured-dua-ids';

type FeaturedDuasContextType = {
  /** IDs of duas currently in the user's featured list */
  featuredIds: number[];
  /** Whether the IDs have been loaded from storage */
  isLoaded: boolean;
  isFavourited: (id: number) => boolean;
  toggle: (id: number) => void;
  add: (id: number) => void;
  remove: (id: number) => void;
};

const FeaturedDuasContext = createContext<FeaturedDuasContextType | null>(null);

export function FeaturedDuasProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [featuredIds, setFeaturedIds] = useState<number[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from AsyncStorage on mount; fall back to default isFeatured ids
  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY)
      .then((raw) => {
        if (raw !== null) {
          const parsed = JSON.parse(raw) as number[];
          setFeaturedIds(parsed);
        } else {
          // First launch – seed with the json-level isFeatured defaults
          setFeaturedIds(getDefaultFeaturedIds('daily'));
        }
      })
      .catch(() => {
        setFeaturedIds(getDefaultFeaturedIds('daily'));
      })
      .finally(() => setIsLoaded(true));
  }, []);

  const persist = useCallback((ids: number[]) => {
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(ids)).catch(() => {});
  }, []);

  const add = useCallback(
    (id: number) => {
      setFeaturedIds((prev) => {
        if (prev.includes(id)) return prev;
        const next = [...prev, id];
        persist(next);
        return next;
      });
    },
    [persist],
  );

  const remove = useCallback(
    (id: number) => {
      setFeaturedIds((prev) => {
        const next = prev.filter((x) => x !== id);
        persist(next);
        return next;
      });
    },
    [persist],
  );

  const toggle = useCallback(
    (id: number) => {
      setFeaturedIds((prev) => {
        const next = prev.includes(id)
          ? prev.filter((x) => x !== id)
          : [...prev, id];
        persist(next);
        return next;
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
      value={{ featuredIds, isLoaded, isFavourited, toggle, add, remove }}
    >
      {children}
    </FeaturedDuasContext.Provider>
  );
}

export function useFeaturedDuas(): FeaturedDuasContextType {
  const ctx = useContext(FeaturedDuasContext);
  if (!ctx) {
    throw new Error(
      'useFeaturedDuas must be used inside <FeaturedDuasProvider>',
    );
  }
  return ctx;
}
