import { usePrayerWeek } from '@muslim-zone/react';

import { useDesktopPrayer } from '../hooks/use-desktop-prayer';
import { usePrayerNotifications } from '../hooks/use-prayer-notifications';

export function PrayerNotificationScheduler() {
  const { locationData } = useDesktopPrayer();

  const { prayerDays } = usePrayerWeek(locationData, 2);

  usePrayerNotifications(prayerDays);

  return null;
}
