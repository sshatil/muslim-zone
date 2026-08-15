import categories from '@/data/categories.json';
import modules from '@/data/module.json';

import daily from '@/data/duas/daily.json';
import ramadan from '@/data/duas/ramadan.json';

import { Dua, DuaCategory, DuaModule } from '@/types/dua';
type DuaModuleData = { duas: Dua[] };

export const MODULE_DATA_MAP: Record<string, DuaModuleData> = {
  daily: daily as DuaModuleData,
  ramadan: ramadan as DuaModuleData,
};

export function getModules(): DuaModule[] {
  return modules as DuaModule[];
}

export function getCategories(): DuaCategory[] {
  return categories as DuaCategory[];
}

export function getModuleByKey(key: string): DuaModule | undefined {
  return getModules().find((m) => m.key === key);
}

export function getDuasByModule(moduleKey: string): Dua[] {
  return MODULE_DATA_MAP[moduleKey]?.duas ?? [];
}
