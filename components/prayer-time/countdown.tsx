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

      const diff = nextPrayerTime.diff(now, ['hours', 'minutes']).toObject();

      if (!diff) return;

      const hours = Math.floor(diff.hours ?? 0);
      const minutes = Math.floor(diff.minutes ?? 0);

      if (hours <= 0 && minutes <= 0) {
        setTimeLeft('Now');
        return;
      }

      // Format like: 2h 15m
      if (hours > 0) {
        setTimeLeft(`${hours}h ${minutes}m`);
      } else {
        setTimeLeft(`${minutes}m`);
      }
    };

    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [nextPrayerTime, timezone]);

  return <Text className={className}>{timeLeft}</Text>;
}
