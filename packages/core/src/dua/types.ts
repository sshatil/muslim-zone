export type LanguageMap = {
  en: string;
  bn?: string;
  [key: string]: string | undefined;
};

export type DuaSource = {
  type: 'Hadith' | 'Quran' | 'quran' | 'Other';
  reference: string;
};

export type Dua = {
  id: number;
  categoryIds: number[];
  key: string;

  title: LanguageMap;
  arabic: string;
  transliteration?: LanguageMap;
  translation: LanguageMap;

  source?: DuaSource;

  tags?: string[];
  isFeatured?: boolean;
  order?: number;
};

export type DuaModule = {
  id: number;
  key: string;
  name: LanguageMap;
  file: string;
};

export type DuaCategory = {
  id: number;
  key: string;
  name: LanguageMap;
  icon: string;
};
