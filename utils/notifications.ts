import { getTodayPrayerTimes } from '@/api/prayer-time';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

/**
 * IOS: 12 days × 5 prayers = 60.
 * Android: 30 days.
 */
const DAYS_TO_SCHEDULE = Platform.OS === 'ios' ? 12 : 30;
const PRAYERS = ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'] as const;
const SETTINGS_STORAGE_KEY = 'prayer_notifications_settings';

export type PrayerNotificationSettings = {
  Fajr: boolean;
  Dhuhr: boolean;
  Asr: boolean;
  Maghrib: boolean;
  Isha: boolean;
};

export const defaultPrayerSettings: PrayerNotificationSettings = {
  Fajr: true,
  Dhuhr: true,
  Asr: true,
  Maghrib: true,
  Isha: true,
};

export async function getPrayerNotificationSettings(): Promise<PrayerNotificationSettings> {
  try {
    const data = await AsyncStorage.getItem(SETTINGS_STORAGE_KEY);
    if (data) {
      return { ...defaultPrayerSettings, ...JSON.parse(data) };
    }
  } catch (error) {
    console.error('Failed to get prayer notification settings:', error);
  }
  return defaultPrayerSettings;
}

export async function savePrayerNotificationSettings(
  settings: PrayerNotificationSettings,
): Promise<void> {
  try {
    await AsyncStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings));
  } catch (error) {
    console.error('Failed to save prayer notification settings:', error);
  }
}

// Notification handler (foreground behaviour).

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

// Permissions.

export async function requestNotificationPermissions(): Promise<boolean> {
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('prayer-times', {
      name: 'Prayer Times',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FFFFFF',
      sound: 'azan.wav',
    });
  }

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  return finalStatus === 'granted';
}

// AsyncStorage guard helpers.

const SCHEDULE_STATE_KEY = 'prayer_notifications_schedule_state';

interface ScheduleState {
  date: string;
  latitude: number;
  longitude: number;
}

/** Returns the schedule state, or null. */
async function getLastScheduleState(): Promise<ScheduleState | null> {
  try {
    const data = await AsyncStorage.getItem(SCHEDULE_STATE_KEY);
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
}

/** Saves the schedule state. */
async function saveLastScheduleState(
  latitude: number,
  longitude: number,
): Promise<void> {
  const state: ScheduleState = {
    date: new Date().toISOString().split('T')[0], // YYYY-MM-DD
    latitude,
    longitude,
  };
  try {
    await AsyncStorage.setItem(SCHEDULE_STATE_KEY, JSON.stringify(state));
  } catch {
    // non-fatal
  }
}

export async function schedulePrayerNotifications(
  latitude: number,
  longitude: number,
): Promise<void> {
  const hasPermission = await requestNotificationPermissions();
  if (!hasPermission) {
    console.log('[Notifications] Permission not granted — skipping schedule.');
    return;
  }

  // Cancel whatever was previously scheduled so we always get a fresh window.
  await Notifications.cancelAllScheduledNotificationsAsync();

  const now = new Date();
  let scheduledCount = 0;

  for (let i = 0; i < DAYS_TO_SCHEDULE; i++) {
    const date = new Date(now);
    date.setDate(now.getDate() + i);
    // Normalise to midnight so adhan computes for the correct calendar day.
    date.setHours(0, 0, 0, 0);

    // adhan returns proper Date objects — no string parsing needed.
    const { prayerTimes } = getTodayPrayerTimes(latitude, longitude, date);
    const settings = await getPrayerNotificationSettings();

    for (const prayer of PRAYERS) {
      // prayerTimes values are ISO strings from api/prayer-time.ts
      const prayerTime = new Date(prayerTimes[prayer]);

      // Skip any prayer that has already passed or is disabled in settings.
      if (
        prayerTime.getTime() <= Date.now() ||
        !settings[prayer as keyof PrayerNotificationSettings]
      ) {
        continue;
      }

      try {
        await Notifications.scheduleNotificationAsync({
          content: {
            title: `🕌 ${prayer} Prayer`,
            body: `It's time for ${prayer}. Allahu Akbar!`,
            sound: 'azan.wav',
            data: { prayer, scheduledFor: prayerTime.toISOString() },
          },
          trigger: {
            type: Notifications.SchedulableTriggerInputTypes.DATE,
            date: prayerTime,
            channelId: 'prayer-times',
          },
        });
        scheduledCount++;
      } catch (err) {
        console.warn(
          `[Notifications] Failed to schedule ${prayer} on day +${i}:`,
          err,
        );
      }
    }
  }

  await saveLastScheduleState(latitude, longitude);
  console.log(
    `[Notifications] Scheduled ${scheduledCount} notifications across ${DAYS_TO_SCHEDULE} days.`,
  );
}

// Smart entry-point (used by _layout).

/**
 * Schedules notifications only when necessary:
 *   • First launch ever (no stored state)
 *   • Location has changed significantly (> ~1km)
 *   • We are running low on scheduled days memory buffer
 *
 * Safe to call every time the app comes to the foreground.
 */
export async function ensurePrayerNotificationsScheduled(
  latitude: number,
  longitude: number,
): Promise<void> {
  if (!latitude || !longitude) return;

  const lastState = await getLastScheduleState();
  const today = new Date().toISOString().split('T')[0];

  let needsReschedule = false;

  if (!lastState) {
    console.log('[Notifications] No previous schedule state found.');
    needsReschedule = true;
  } else {
    // 1. Check if location changed significantly (e.g. > ~5km, ~0.05 degrees)
    const latDiff = Math.abs(lastState.latitude - latitude);
    const lonDiff = Math.abs(lastState.longitude - longitude);
    const locationChanged = latDiff > 0.05 || lonDiff > 0.05;

    // 2. Check if we need to refresh based on time elapsed
    // Buffer logic: iOS 12 days -> refresh after 7 days. Android 30 days -> refresh after 15 days.
    const REFRESH_AFTER_DAYS = Platform.OS === 'ios' ? 7 : 15;

    const lastDateObj = new Date(lastState.date);
    const todayObj = new Date(today);
    const timeDiff = todayObj.getTime() - lastDateObj.getTime();
    const daysElapsed = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

    if (locationChanged) {
      console.log(
        '[Notifications] Location changed significantly. Rescheduling…',
      );
      needsReschedule = true;
    } else if (daysElapsed >= REFRESH_AFTER_DAYS) {
      console.log(
        `[Notifications] Schedule is ${daysElapsed} days old. Rescheduling for another batch…`,
      );
      needsReschedule = true;
    } else {
      console.log(
        `[Notifications] Schedule up to date (${daysElapsed} days old, max ${REFRESH_AFTER_DAYS}). Skipping.`,
      );
    }
  }

  if (needsReschedule) {
    await schedulePrayerNotifications(latitude, longitude);
  }
}
