import { saveLocationMode } from './location-preference';

export function resetToAutomaticLocation() {
  saveLocationMode('automatic');
}
