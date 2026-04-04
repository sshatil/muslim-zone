import { Dua } from '@/types/dua';
import { getDuasByModule } from './dua-loader';

export function getDuasByCategory(
  moduleKey: string,
  categoryId: number,
): Dua[] {
  return getDuasByModule(moduleKey).filter(
    (dua) => dua.categoryId === categoryId,
  );
}

export function getFeaturedDuas(moduleKey: string): Dua[] {
  return getDuasByModule(moduleKey)
    .filter((dua) => dua.isFeatured)
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
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
