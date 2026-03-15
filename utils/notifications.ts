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
const STORAGE_KEY = 'prayer_notifications_last_scheduled';

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

/** Returns the date string (YYYY-MM-DD) of the last successful schedule, or null. */
async function getLastScheduledDate(): Promise<string | null> {
  try {
    return await AsyncStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

/** Saves today's date string as the last scheduled date. */
async function saveLastScheduledDate(): Promise<void> {
  const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
  try {
    await AsyncStorage.setItem(STORAGE_KEY, today);
  } catch {
    // non-fatal
  }
}

/** Returns today's date string (YYYY-MM-DD). */
function todayString(): string {
  return new Date().toISOString().split('T')[0];
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

    for (const prayer of PRAYERS) {
      // prayerTimes values are ISO strings from api/prayer-time.ts
      const prayerTime = new Date(prayerTimes[prayer]);

      // Skip any prayer that has already passed.
      if (prayerTime.getTime() <= Date.now()) continue;

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

  await saveLastScheduledDate();
  console.log(
    `[Notifications] Scheduled ${scheduledCount} notifications across ${DAYS_TO_SCHEDULE} days.`,
  );
}

// Smart entry-point (used by _layout).

/**
 * Schedules notifications only when necessary:
 *   • First launch ever (no stored date)
 *   • A new calendar day has started since the last schedule
 *
 * Safe to call every time the app comes to the foreground.
 */
export async function ensurePrayerNotificationsScheduled(
  latitude: number,
  longitude: number,
): Promise<void> {
  if (!latitude || !longitude) return;

  const lastDate = await getLastScheduledDate();
  const today = todayString();

  if (lastDate === today) {
    // Already scheduled today — nothing to do.
    console.log('[Notifications] Already scheduled today — skipping.');
    return;
  }

  console.log(
    `[Notifications] New day detected (last: ${lastDate ?? 'never'}, today: ${today}) — rescheduling…`,
  );
  await schedulePrayerNotifications(latitude, longitude);
}
