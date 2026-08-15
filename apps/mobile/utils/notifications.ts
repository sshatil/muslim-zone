import { getTodayPrayerTimes } from '@/api/prayer-time';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

const DAYS_TO_SCHEDULE = Platform.OS === 'ios' ? 12 : 30; // iOS: 7 days, Android: 15 days
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

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

// Request Notification Permissions
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

// Scheduling notifications
export async function schedulePrayerNotifications(
  latitude: number,
  longitude: number,
): Promise<void> {
  const hasPermission = await requestNotificationPermissions();
  if (!hasPermission) {
    console.log('[Notifications] Permission not granted — skipping schedule.');
    return;
  }

  await Notifications.cancelAllScheduledNotificationsAsync(); // Cancel previous notifications

  const now = new Date();
  let scheduledCount = 0;

  for (let i = 0; i < DAYS_TO_SCHEDULE; i++) {
    const date = new Date(now);
    date.setDate(now.getDate() + i);
    date.setHours(0, 0, 0, 0); // Normalize to midnight

    const { prayerTimes } = await getTodayPrayerTimes(
      latitude,
      longitude,
      date,
    );
    const settings = await getPrayerNotificationSettings();

    for (const prayer of PRAYERS) {
      const prayerTime = new Date(prayerTimes[prayer]);

      if (
        prayerTime.getTime() <= Date.now() || // Skip past prayers
        !settings[prayer as keyof PrayerNotificationSettings] // Skip disabled prayers
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

  console.log(`[Notifications] Scheduled ${scheduledCount} notifications.`);
  await saveLastScheduleState(latitude, longitude); // Save state after scheduling
}

// Ensure prayer notifications are scheduled as needed
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
    const latDiff = Math.abs(lastState.latitude - latitude);
    const lonDiff = Math.abs(lastState.longitude - longitude);
    const locationChanged = latDiff > 0.05 || lonDiff > 0.05;

    const REFRESH_AFTER_DAYS = Platform.OS === 'ios' ? 7 : 15;

    const lastDateObj = new Date(lastState.date);
    const todayObj = new Date(today);
    const timeDiff = todayObj.getTime() - lastDateObj.getTime();
    const daysElapsed = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

    if (locationChanged) {
      console.log('[Notifications] Location changed. Rescheduling…');
      needsReschedule = true;
    } else if (daysElapsed >= REFRESH_AFTER_DAYS) {
      console.log(
        `[Notifications] Schedule is ${daysElapsed} days old. Rescheduling…`,
      );
      needsReschedule = true;
    } else {
      console.log(
        `[Notifications] Schedule up to date (${daysElapsed} days old). max ${REFRESH_AFTER_DAYS}) Skipping.`,
      );
    }
  }

  if (needsReschedule) {
    await schedulePrayerNotifications(latitude, longitude); // Re-schedule notifications
  }
}
