/**
 * Typed analytics event name constants.
 *
 * All names are snake_case, max 40 characters — Firebase requirement.
 * Group events by feature area for easy maintenance.
 */

// Screens

export const SCREEN_HOME = 'home';
export const SCREEN_PRAYER_TIMES = 'prayer_times';
export const SCREEN_DUAS = 'duas';
export const SCREEN_SETTINGS = 'settings';
export const SCREEN_DUA_DETAIL = 'dua_detail';
export const SCREEN_DUA_CATEGORY = 'dua_category';
export const SCREEN_ABOUT = 'about';

// Prayer Times

/** Fired when prayer time data loads successfully */
export const EVENT_PRAYER_DATA_LOADED = 'prayer_data_loaded';

/** Fired when notifications are scheduled for prayer times */
export const EVENT_PRAYER_NOTIFICATIONS_SCHEDULED =
  'prayer_notifications_scheduled';

/** Fired when a prayer notification is dismissed by the user */
export const EVENT_PRAYER_NOTIFICATION_DISMISSED =
  'prayer_notification_dismissed';

// Duas

/** Fired when a user copies a dua to the clipboard */
export const EVENT_DUA_COPIED = 'dua_copied';

/** Fired when a user opens a dua category */
export const EVENT_DUA_CATEGORY_OPENED = 'dua_category_opened';

/** Fired when a user opens a specific dua */
export const EVENT_DUA_OPENED = 'dua_opened';

/** Fired when the dua search bar is used */
export const EVENT_DUA_SEARCHED = 'dua_searched';

// Settings

/** Fired when the user changes the colour theme */
export const EVENT_THEME_CHANGED = 'theme_changed';

/** Fired when the user toggles notifications on/off */
export const EVENT_NOTIFICATIONS_TOGGLED = 'notifications_toggled';

/** Fired when the user changes the prayer calculation method */
export const EVENT_CALC_METHOD_CHANGED = 'calc_method_changed';

// Location

/** Fired when location permission is granted */
export const EVENT_LOCATION_PERMISSION_GRANTED = 'location_permission_granted';

/** Fired when location permission is denied */
export const EVENT_LOCATION_PERMISSION_DENIED = 'location_permission_denied';

// App Lifecycle

/** Fired when the app resumes from the background */
export const EVENT_APP_RESUMED = 'app_resumed';
