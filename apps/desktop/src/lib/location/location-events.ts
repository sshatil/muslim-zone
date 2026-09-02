export const DESKTOP_LOCATION_CHANGED_EVENT = 'muslim-zone:location-changed';

export function emitDesktopLocationChanged() {
  window.dispatchEvent(new Event(DESKTOP_LOCATION_CHANGED_EVENT));
}
