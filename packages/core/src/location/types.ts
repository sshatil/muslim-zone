export type LocationSource = 'gps' | 'ip' | 'manual';

export type UserLocation = {
  latitude: number;
  longitude: number;
  city?: string;
  country?: string;
  countryCode?: string;
  flag?: string;
  timezone?: string;
  source: LocationSource;
};
