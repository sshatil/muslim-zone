export type LocationSearchResult = {
  id: number;

  name: string;

  latitude: number;
  longitude: number;

  country?: string;
  countryCode?: string;

  admin1?: string;
  admin2?: string;

  timezone?: string;
};
