import type { Dua } from './types';

import { getDuasByModule } from './loader';

export function getDuasByCategory(
  moduleKey: string,
  categoryId: number,
): Dua[] {
  return getDuasByModule(moduleKey).filter((dua) =>
    dua.categoryIds.includes(categoryId),
  );
}

export function getDefaultFeaturedIds(moduleKey: string): number[] {
  return getDuasByModule(moduleKey)
    .filter((dua) => dua.isFeatured)
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
    .map((dua) => dua.id);
}

export function getFeaturedDuasByIds(moduleKey: string, ids: number[]): Dua[] {
  const allDuas = getDuasByModule(moduleKey);

  return ids
    .map((id) => allDuas.find((dua) => dua.id === id))
    .filter((dua): dua is Dua => dua !== undefined);
}

export function getDuaById(moduleKey: string, duaId: number): Dua | undefined {
  return getDuasByModule(moduleKey).find((dua) => dua.id === duaId);
}

export function searchDuas(moduleKey: string, query: string): Dua[] {
  const normalizedQuery = query.trim().toLowerCase();

  if (!normalizedQuery) {
    return getDuasByModule(moduleKey);
  }

  return getDuasByModule(moduleKey).filter((dua) => {
    const keyMatches = dua.key.toLowerCase().includes(normalizedQuery);

    const tagMatches =
      dua.tags?.some((tag) => tag.toLowerCase().includes(normalizedQuery)) ??
      false;

    const titleMatches = Object.values(dua.title).some(
      (title) => title?.toLowerCase().includes(normalizedQuery) ?? false,
    );

    return keyMatches || tagMatches || titleMatches;
  });
}
