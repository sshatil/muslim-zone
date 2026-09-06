import { formatPrayerTime, PRAYER_ARABIC_NAMES } from '#lib/prayer-display';
import { PrayerName } from '@muslim-zone/core';
import { PrayerIcon } from './prayer-icon';

type PrayerTimelineCardProps = {
  prayer: PrayerName;
  time?: Date | string;
  timezone?: string;
  isCurrent: boolean;
  isNext: boolean;
};

export function PrayerTimelineCard({
  prayer,
  time,
  timezone,
  isCurrent,
  isNext,
}: PrayerTimelineCardProps) {
  const isHighlighted = isCurrent || isNext;

  return (
    <div
      className={`relative min-h-[145px] rounded-2xl border p-4 transition-all duration-200 ${isCurrent ? 'border-emerald-300 bg-emerald-50/80 shadow-[0_8px_25px_rgba(16,185,129,0.08)] dark:border-emerald-700 dark:bg-emerald-950/40' : 'border-border/60 bg-background/70 dark:hover:bg-background/50 hover:border-emerald-200 hover:bg-emerald-50/30 dark:hover:border-emerald-800'}`}
    >
      {/* Header */}
      <div className='flex items-start justify-between gap-2'>
        <div className='min-w-0'>
          <p
            className={`text-sm font-medium ${isHighlighted ? 'text-emerald-700 dark:text-emerald-300' : 'text-foreground'}`}
          >
            {prayer}
          </p>

          <p className='text-muted-foreground mt-0.5 text-xs'>
            {PRAYER_ARABIC_NAMES[prayer]}
          </p>
        </div>

        {/* Fixed prayer-specific icon */}
        <PrayerIcon prayer={prayer} />
      </div>

      {/* Prayer time */}
      <p
        className={`mt-5 text-xl font-semibold tabular-nums tracking-tight ${isHighlighted ? 'text-emerald-700 dark:text-emerald-300' : 'text-foreground'}`}
      >
        {formatPrayerTime(time, timezone)}
      </p>

      {/* NOW / NEXT */}
      <div className='mt-3 h-4'>
        {isCurrent && (
          <span className='inline-flex items-center rounded-full bg-emerald-500 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white'>
            Now
          </span>
        )}

        {!isCurrent && isNext && (
          <span className='inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-emerald-700 dark:border-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300'>
            Next
          </span>
        )}
      </div>
    </div>
  );
}
