import { PrayerName } from '@muslim-zone/core';
import { CloudSun, Moon, Sun, Sunrise, Sunset } from 'lucide-react';

type PrayerIconProps = {
  prayer: PrayerName | null | undefined;
  size?: 'small' | 'large';
};

export function PrayerIcon({ prayer, size = 'small' }: PrayerIconProps) {
  const containerClass =
    size === 'large'
      ? 'flex size-14 shrink-0 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-lg shadow-emerald-600/20 dark:bg-emerald-500'
      : 'flex size-9 shrink-0 items-center justify-center rounded-xl border border-border/60 bg-background';

  const iconClass = size === 'large' ? 'size-7' : 'size-5';

  if (prayer === 'Fajr') {
    return (
      <div className={containerClass}>
        <Sunrise
          className={`${iconClass} ${size === 'small' ? 'text-amber-500 dark:text-amber-400' : ''}`}
        />
      </div>
    );
  }

  if (prayer === 'Dhuhr') {
    return (
      <div className={containerClass}>
        <Sun
          className={`${iconClass} ${size === 'small' ? 'text-yellow-500 dark:text-yellow-400' : ''}`}
        />
      </div>
    );
  }

  if (prayer === 'Asr') {
    return (
      <div className={containerClass}>
        <CloudSun
          className={`${iconClass} ${size === 'small' ? 'text-orange-500 dark:text-orange-400' : ''}`}
        />
      </div>
    );
  }

  if (prayer === 'Maghrib') {
    return (
      <div className={containerClass}>
        <Sunset
          className={`${iconClass} ${size === 'small' ? 'text-orange-600 dark:text-orange-400' : ''}`}
        />
      </div>
    );
  }

  return (
    <div className={containerClass}>
      <Moon
        className={`${iconClass} ${size === 'small' ? 'text-indigo-500 dark:text-indigo-400' : ''}`}
      />
    </div>
  );
}
