import { DateTime } from 'luxon';
import { useEffect, useState } from 'react';
import { Text } from 'react-native';

export function CountdownDisplay({
  nextPrayerTime,
  timezone,
  className,
}: {
  nextPrayerTime: DateTime | string;
  timezone?: string | null;
  className?: string;
}) {
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    const getNextPrayerDateTime = () => {
      if (typeof nextPrayerTime === 'string') {
        return DateTime.fromISO(nextPrayerTime);
      }

      return nextPrayerTime;
    };

    const tick = () => {
      const targetTime = getNextPrayerDateTime();

      if (!targetTime || !targetTime.isValid) {
        setTimeLeft('');
        return;
      }

      const zone = timezone || targetTime.zoneName || 'local';

      const now = DateTime.now().setZone(zone);
      const target = targetTime.setZone(zone);

      const diffInSeconds = Math.floor(target.diff(now, 'seconds').seconds);

      if (diffInSeconds <= 0) {
        setTimeLeft('Now');
        return;
      }

      const hours = Math.floor(diffInSeconds / 3600);
      const minutes = Math.floor((diffInSeconds % 3600) / 60);
      const seconds = diffInSeconds % 60;

      if (hours > 0) {
        setTimeLeft(`${hours}h ${minutes}m`);
      } else if (minutes > 0) {
        setTimeLeft(`${minutes}m ${seconds}s`);
      } else {
        setTimeLeft(`${seconds}s`);
      }
    };

    tick();

    const interval = setInterval(tick, 1000);

    return () => clearInterval(interval);
  }, [nextPrayerTime, timezone]);

  return <Text className={className}>{timeLeft}</Text>;
}
