import { useEffect, useRef } from 'react';

import type { PrayerName } from '@muslim-zone/core';

import { sendPrayerNotification } from '#lib/prayer-notifications';

type PrayerDay = {
  date: string;
  prayerTimes: Partial<Record<PrayerName, string>>;
};

type PrayerNotification = {
  key: string;
  prayer: PrayerName;
  timestamp: number;
};

const PRAYER_ORDER: PrayerName[] = ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];

const CHECK_INTERVAL = 30_000;

// Allow up to 2 minutes to catch a prayer notification.
const NOTIFICATION_WINDOW = 120_000;

export function usePrayerNotifications(prayerDays: PrayerDay[]) {
  const notifiedRef = useRef<Set<string>>(new Set());

  useEffect(() => {
    if (!prayerDays.length) {
      return;
    }

    const notifications: PrayerNotification[] = [];

    for (const day of prayerDays) {
      for (const prayer of PRAYER_ORDER) {
        const prayerTime = day.prayerTimes[prayer];

        if (!prayerTime) {
          continue;
        }

        const timestamp = new Date(prayerTime).getTime();

        if (Number.isNaN(timestamp)) {
          continue;
        }

        notifications.push({
          key: `${day.date}-${prayer}`,
          prayer,
          timestamp,
        });
      }
    }

    const checkPrayerTimes = async () => {
      const now = Date.now();

      for (const notification of notifications) {
        if (notifiedRef.current.has(notification.key)) {
          continue;
        }

        const difference = now - notification.timestamp;

        if (difference >= 0 && difference <= NOTIFICATION_WINDOW) {
          await sendPrayerNotification(notification.prayer);

          notifiedRef.current.add(notification.key);

          console.log(`Prayer notification sent: ${notification.prayer}`);
        }
      }
    };

    void checkPrayerTimes();

    const interval = window.setInterval(() => {
      void checkPrayerTimes();
    }, CHECK_INTERVAL);

    return () => {
      window.clearInterval(interval);
    };
  }, [prayerDays]);
}
