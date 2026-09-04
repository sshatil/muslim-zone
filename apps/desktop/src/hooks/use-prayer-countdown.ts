import { useEffect, useState } from 'react';

function calculateCountdown(targetTime?: number) {
  if (!targetTime) {
    return null;
  }

  const difference = Math.max(targetTime - Date.now(), 0);

  const totalSeconds = Math.floor(difference / 1000);

  const hours = Math.floor(totalSeconds / 3600);

  const minutes = Math.floor((totalSeconds % 3600) / 60);

  const seconds = totalSeconds % 60;

  return {
    hours,
    minutes,
    seconds,
    isComplete: difference <= 0,
  };
}

export function usePrayerCountdown(targetTime?: number) {
  const [countdown, setCountdown] = useState(() =>
    calculateCountdown(targetTime),
  );

  useEffect(() => {
    setCountdown(calculateCountdown(targetTime));

    if (!targetTime) {
      return;
    }

    const interval = window.setInterval(() => {
      setCountdown(calculateCountdown(targetTime));
    }, 1000);

    return () => {
      window.clearInterval(interval);
    };
  }, [targetTime]);

  return countdown;
}

export function formatCountdown(
  countdown: ReturnType<typeof calculateCountdown> | null,
) {
  if (!countdown) {
    return '--';
  }

  if (countdown.isComplete) {
    return '00:00:00';
  }

  return [countdown.hours, countdown.minutes, countdown.seconds]
    .map((value) => String(value).padStart(2, '0'))
    .join(':');
}
