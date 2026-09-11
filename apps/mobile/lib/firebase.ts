/**
 * Firebase utility module — centralized wrappers for Analytics & Crashlytics.
 *
 * Uses the v22+ modular API instead of the deprecated namespaced API.
 * All methods silently no-op on error so they never crash the app.
 */

import {
  logEvent as fbLogEvent,
  setAnalyticsCollectionEnabled as fbSetAnalyticsCollectionEnabled,
  setUserProperty as fbSetUserProperty,
  getAnalytics,
} from '@react-native-firebase/analytics';
import {
  log as fbLog,
  recordError as fbRecordError,
  setAttribute as fbSetAttribute,
  setCrashlyticsCollectionEnabled as fbSetCrashlyticsCollectionEnabled,
  getCrashlytics,
} from '@react-native-firebase/crashlytics';

// Analytics

/**
 * Log a custom analytics event.
 * @param name   Event name (snake_case, max 40 chars)
 * @param params Optional key/value parameters (max 25, values max 100 chars)
 */
export async function logEvent(
  name: string,
  params?: Record<string, string | number | boolean>,
): Promise<void> {
  try {
    await fbLogEvent(getAnalytics(), name, params);
  } catch (e) {
    console.warn('[Firebase Analytics] logEvent failed:', e);
  }
}

/**
 * Log a screen view. Uses the recommended `screen_view` logEvent pattern
 * from the v22+ modular API (replaces the deprecated logScreenView method).
 * @param screenName  Human-readable screen name (e.g. "Home", "PrayerTimes")
 * @param screenClass Component class name (defaults to screenName)
 */
export async function logScreenView(
  screenName: string,
  screenClass?: string,
): Promise<void> {
  try {
    await fbLogEvent(getAnalytics(), 'screen_view', {
      firebase_screen: screenName,
      firebase_screen_class: screenClass ?? screenName,
    });
  } catch (e) {
    console.warn('[Firebase Analytics] logScreenView failed:', e);
  }
}

/**
 * Set a persistent user property for audience segmentation.
 * @param name  Property name (snake_case, max 24 chars)
 * @param value Property value (max 36 chars) — pass null to clear
 */
export async function setUserProperty(
  name: string,
  value: string | null,
): Promise<void> {
  try {
    await fbSetUserProperty(getAnalytics(), name, value);
  } catch (e) {
    console.warn('[Firebase Analytics] setUserProperty failed:', e);
  }
}

/**
 * Enable or disable analytics collection at runtime.
 * Useful for respecting user privacy preferences.
 */
export async function setAnalyticsCollectionEnabled(
  enabled: boolean,
): Promise<void> {
  try {
    await fbSetAnalyticsCollectionEnabled(getAnalytics(), enabled);
  } catch (e) {
    console.warn(
      '[Firebase Analytics] setAnalyticsCollectionEnabled failed:',
      e,
    );
  }
}

// Crashlytics

/**
 * Record a caught JavaScript error as a non-fatal crash report.
 * @param error       The Error object to record
 * @param jsErrorName Optional custom error name label shown in the dashboard
 */
export function recordError(error: Error, jsErrorName?: string): void {
  try {
    fbRecordError(getCrashlytics(), error, jsErrorName);
  } catch (e) {
    console.warn('[Firebase Crashlytics] recordError failed:', e);
  }
}

/**
 * Write a log message to Crashlytics. Messages appear in the crash report
 * log tab, helping reconstruct the events leading up to a crash.
 * @param message The string to log
 */
export function crashLog(message: string): void {
  try {
    fbLog(getCrashlytics(), message);
  } catch (e) {
    console.warn('[Firebase Crashlytics] log failed:', e);
  }
}

/**
 * Set a string attribute on the current Crashlytics session.
 * Useful for attaching contextual info (e.g. prayer calc method, theme).
 */
export function setCrashlyticsAttribute(key: string, value: string): void {
  try {
    fbSetAttribute(getCrashlytics(), key, value);
  } catch (e) {
    console.warn('[Firebase Crashlytics] setAttribute failed:', e);
  }
}

/**
 * Enable or disable Crashlytics crash collection at runtime.
 * Useful for respecting user privacy preferences.
 */
export async function setCrashlyticsCollectionEnabled(
  enabled: boolean,
): Promise<void> {
  try {
    await fbSetCrashlyticsCollectionEnabled(getCrashlytics(), enabled);
  } catch (e) {
    console.warn(
      '[Firebase Crashlytics] setCrashlyticsCollectionEnabled failed:',
      e,
    );
  }
}
