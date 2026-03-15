import { DateTime } from 'luxon';
import { useEffect, useState } from 'react';
import { Text } from 'react-native';

export function CountdownDisplay({
  nextPrayerTime,
  timezone,
  className,
}: {
  nextPrayerTime: DateTime;
  timezone: string;
  className: string;
}) {
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    const tick = () => {
      const now = DateTime.now().setZone(timezone);
      const diff = nextPrayerTime
        .diff(now, ['hours', 'minutes', 'seconds'])
        .toObject();

      if (!diff) return;

      if (
        (diff.hours ?? 0) <= 0 &&
        (diff.minutes ?? 0) <= 0 &&
        (diff.seconds ?? 0) <= 0
      ) {
        setTimeLeft('00 : 00 : 00');
        return;
      }

      setTimeLeft(
        `${String(Math.floor(diff.hours ?? 0)).padStart(2, '0')} : ${String(
          Math.floor(diff.minutes ?? 0),
        ).padStart(2, '0')} : ${String(Math.floor(diff.seconds ?? 0)).padStart(
          2,
          '0',
        )}`,
      );
    };

    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [nextPrayerTime, timezone]);

  return <Text className={`${className}`}>Remaining Time: {timeLeft}</Text>;
}
