import { useLocation } from '@/hooks/use-location';
import { usePrayerTime } from '@/hooks/use-prayer-time';
import { DateTime } from 'luxon';
import { useEffect, useMemo, useState } from 'react';

export function usePrayerTiming() {
  const { data: locationData } = useLocation();
  const { data: prayerData } = usePrayerTime(
    locationData?.latitude ?? 0,
    locationData?.longitude ?? 0,
    new Date(),
  );

  const [timeLeft, setTimeLeft] = useState('');

  // Determine current and next prayer
  const currentPrayerInfo = useMemo(() => {
    if (!prayerData || !locationData?.timezone) return null;

    const now = DateTime.now().setZone(locationData.timezone);
    const prayerOrder = ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];
    let currentPrayer = 'Fajr';
    let nextPrayerTime: DateTime | null = null;
    let nextPrayerName = '';

    for (let i = 0; i < prayerOrder.length; i++) {
      const key = prayerOrder[i] as keyof typeof prayerData.prayerTimes;
      const prayerTime = DateTime.fromJSDate(
        new Date(prayerData.prayerTimes[key]),
      ).setZone(locationData.timezone);

      if (now < prayerTime) {
        nextPrayerTime = prayerTime;
        nextPrayerName = key;
        break;
      } else {
        currentPrayer = key;
      }
    }

    // Wrap to tomorrow's Fajr if all prayers are passed
    if (!nextPrayerTime) {
      nextPrayerTime = DateTime.fromJSDate(
        new Date(prayerData.prayerTimes['Fajr']),
      )
        .plus({ days: 1 })
        .setZone(locationData.timezone);
      nextPrayerName = 'Fajr';
    }

    return {
      currentPrayer,
      nextPrayerName,
      currentPrayerTime: DateTime.fromJSDate(
        new Date(
          prayerData.prayerTimes[
            currentPrayer as keyof typeof prayerData.prayerTimes
          ],
        ),
      ).setZone(locationData.timezone),
      nextPrayerTime,
    };
  }, [prayerData, locationData]);

  // Countdown timer
  useEffect(() => {
    if (!currentPrayerInfo?.nextPrayerTime) return;

    const interval = setInterval(() => {
      const now = DateTime.now().setZone(locationData!.timezone);
      const diff = currentPrayerInfo
        .nextPrayerTime!.diff(now, ['hours', 'minutes', 'seconds'])
        .toObject();

      if (!diff) return;

      if (diff.hours! <= 0 && diff.minutes! <= 0 && diff.seconds! <= 0) {
        setTimeLeft('00 : 00 : 00');
        return;
      }

      setTimeLeft(
        `${Math.floor(diff.hours!).toString().padStart(2, '0')} : ${Math.floor(
          diff.minutes!,
        )
          .toString()
          .padStart(2, '0')} : ${Math.floor(diff.seconds!)
          .toString()
          .padStart(2, '0')}`,
      );
    }, 1000);

    return () => clearInterval(interval);
  }, [currentPrayerInfo, locationData]);

  // Arabic date, day and year
  const arabicDate = useMemo(() => {
    if (!currentPrayerInfo || !locationData?.timezone) return '';

    const date = currentPrayerInfo.currentPrayerTime
      .setZone(locationData.timezone)
      .toJSDate();

    return new Intl.DateTimeFormat('en-US-u-ca-islamic', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      timeZone: locationData.timezone,
    }).format(date);
  }, [currentPrayerInfo, locationData]);

  return {
    locationData,
    prayerData,
    currentPrayerInfo,
    timeLeft,
    arabicDate,
  };
}
