import { Dua } from '@/types/dua';
import { getDuasByModule } from './dua-loader';

export function getDuasByCategory(
  moduleKey: string,
  categoryId: number,
): Dua[] {
  return getDuasByModule(moduleKey).filter(
    (dua) => dua.categoryIds.includes(categoryId),
  );
}

export function getDefaultFeaturedIds(moduleKey: string): number[] {
  return getDuasByModule(moduleKey)
    .filter((dua) => dua.isFeatured)
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
    .map((dua) => dua.id);
}

export function getFeaturedDuasByIds(
  moduleKey: string,
  ids: number[],
): Dua[] {
  const all = getDuasByModule(moduleKey);
  return ids
    .map((id) => all.find((d) => d.id === id))
    .filter((d): d is Dua => d !== undefined);
}

export function getDuaById(moduleKey: string, duaId: number): Dua | undefined {
  return getDuasByModule(moduleKey).find((dua) => dua.id === duaId);
}

export function searchDuas(moduleKey: string, query: string): Dua[] {
  const q = query.toLowerCase();

  return getDuasByModule(moduleKey).filter(
    (dua) =>
      dua.key.includes(q) ||
      dua.tags?.some((tag) => tag.includes(q)) ||
      Object.values(dua.title).some(
        (t) => t?.toLowerCase().includes(q) ?? false,
      ),
  );
}
