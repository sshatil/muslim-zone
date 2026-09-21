import {
  isPermissionGranted,
  requestPermission,
  sendNotification,
} from '@tauri-apps/plugin-notification';

export async function ensureNotificationPermission() {
  let permissionGranted = await isPermissionGranted();

  if (permissionGranted) {
    return true;
  }

  const permission = await requestPermission();

  return permission === 'granted';
}

export async function sendPrayerNotification(prayerName: string) {
  const permissionGranted = await ensureNotificationPermission();

  if (!permissionGranted) {
    return;
  }

  await sendNotification({
    title: `${prayerName} Prayer`,
    body: `It is time for ${prayerName} prayer.`,
  });
}
