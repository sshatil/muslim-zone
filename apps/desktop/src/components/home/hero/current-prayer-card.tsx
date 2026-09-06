import { Clock3 } from 'lucide-react';

import type { PrayerName } from '@muslim-zone/core';

import { Card, CardContent } from '@muslim-zone/ui/components/card';

import {
  formatCountdown,
  usePrayerCountdown,
} from '../../../hooks/use-prayer-countdown';

import {
  formatPrayerTime,
  PRAYER_ARABIC_NAMES,
} from '../../../lib/prayer-display';
import { PrayerIcon } from './prayer-icon';
import { PrayerTimelineCard } from './prayer-timeline-card';

type CurrentPrayerCardProps = {
  currentPrayer: PrayerName | null | undefined;
  nextPrayer: PrayerName | null | undefined;

  currentPrayerTime?: Date | string;
  nextPrayerTime?: Date | string;
  nextPrayerTimestamp?: number;

  prayerTimes?: Partial<Record<PrayerName, Date | string>>;

  timezone?: string;

  onPlayAdhan?: () => void;
};

const PRAYER_ORDER: PrayerName[] = ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];

export function CurrentPrayerCard({
  currentPrayer,
  nextPrayer,
  currentPrayerTime,
  nextPrayerTime,
  nextPrayerTimestamp,
  prayerTimes,
  timezone,
  onPlayAdhan,
}: CurrentPrayerCardProps) {
  const countdown = usePrayerCountdown(nextPrayerTimestamp);

  return (
    <Card className='dark:via-background overflow-hidden rounded-[24px] border border-emerald-100 bg-gradient-to-br from-white via-emerald-50/40 to-white shadow-[0_20px_60px_rgba(16,185,129,0.08)] dark:border-emerald-900/50 dark:from-emerald-950/40 dark:to-emerald-950/20 dark:shadow-none'>
      <CardContent className='p-5 md:p-7'>
        {/* Main Prayer Overview */}
        <div className='flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between'>
          {/* CURRENT PRAYER */}
          <div className='flex min-w-0 items-center gap-4'>
            {/* Current prayer icon */}
            <PrayerIcon prayer={currentPrayer} size='large' />

            {/* Current prayer information */}
            <div className='min-w-0'>
              {/* NOW label */}
              <div className='flex flex-wrap items-center gap-2'>
                <span className='rounded-full bg-emerald-500 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white'>
                  Now
                </span>

                <span className='text-muted-foreground text-xs font-medium'>
                  Current Prayer
                </span>
              </div>

              {/* Prayer name */}
              <h2 className='dark:text-foreground mt-2 text-2xl font-semibold tracking-tight text-emerald-700 md:text-3xl'>
                {currentPrayer ? `${currentPrayer} Prayer` : 'Prayer'}
              </h2>

              {/* Arabic name */}
              {currentPrayer && (
                <p className='text-muted-foreground text-md mt-1'>
                  {PRAYER_ARABIC_NAMES[currentPrayer]}
                </p>
              )}

              {/* Current prayer time */}
              {currentPrayerTime && (
                <p className='mt-2 text-2xl font-semibold tabular-nums tracking-tight text-emerald-700 dark:text-emerald-300'>
                  {formatPrayerTime(currentPrayerTime, timezone)}
                </p>
              )}

              {/* Current prayer description */}
              <p className='text-muted-foreground mt-1 text-xs'>
                Prayer is currently in progress
              </p>
            </div>
          </div>

          {/* NEXT PRAYER */}
          {nextPrayer && (
            <div className='w-full rounded-2xl border border-emerald-200 bg-emerald-50/70 p-4 sm:min-w-[260px] sm:max-w-[340px] dark:border-emerald-800 dark:bg-emerald-950/40'>
              {/* Label */}
              <div className='flex items-center justify-between gap-3'>
                <p className='text-[11px] font-semibold uppercase tracking-[0.14em] text-emerald-600 dark:text-emerald-400'>
                  Next Prayer
                </p>

                <Clock3 className='size-5 text-emerald-600 dark:text-emerald-400' />
              </div>

              {/* Prayer name */}
              <div className='mt-2 flex items-center justify-between gap-4'>
                <div className='min-w-0'>
                  <p className='text-lg font-semibold'>{nextPrayer}</p>

                  <p className='text-muted-foreground text-sm'>
                    {PRAYER_ARABIC_NAMES[nextPrayer]}
                  </p>
                </div>

                <PrayerIcon prayer={nextPrayer} size='small' />
              </div>

              {/* Countdown */}
              <p className='mt-3 font-mono text-2xl font-bold tabular-nums tracking-tight text-emerald-700 dark:text-emerald-300'>
                {formatCountdown(countdown)}
              </p>

              {/* Next prayer time */}
              {nextPrayerTime && (
                <p className='text-muted-foreground mt-1 text-sm'>
                  Starts at{' '}
                  <span className='text-foreground font-medium'>
                    {formatPrayerTime(nextPrayerTime, timezone)}
                  </span>
                </p>
              )}
            </div>
          )}
        </div>

        {/* DIVIDER*/}

        <div className='my-6 border-t border-emerald-100 dark:border-emerald-900/50' />

        {/* PRAYER TIMELINE*/}

        <div className='grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5'>
          {PRAYER_ORDER.map((prayer) => {
            const prayerTime = prayerTimes?.[prayer];

            const isCurrent = currentPrayer === prayer;
            const isNext = nextPrayer === prayer;

            return (
              <PrayerTimelineCard
                key={prayer}
                prayer={prayer}
                time={prayerTime}
                timezone={timezone}
                isCurrent={isCurrent}
                isNext={isNext}
              />
            );
          })}
        </div>

        {/* BOTTOM ACTIONS*/}

        {/* <div className='mt-6 flex flex-col gap-3 border-t border-emerald-100 pt-5 sm:flex-row sm:items-center sm:justify-between dark:border-emerald-900/50'>
          <button
            type='button'
            onClick={onPlayAdhan}
            className='border-border/60 bg-background flex items-center gap-3 rounded-xl border px-4 py-3 text-left shadow-sm transition hover:border-emerald-200 hover:bg-emerald-50/50 dark:hover:border-emerald-800 dark:hover:bg-emerald-950/30'
          >
            <span className='flex size-9 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white'>
              <Play className='ml-0.5 size-4 fill-current' />
            </span>

            <span className='min-w-0'>
              <span className='block text-sm font-medium'>
                Play Recitation Adhan
              </span>

              <span className='text-muted-foreground block text-xs'>
                Mishary Rashid Alafasy
              </span>
            </span>
          </button>

          <div className='border-border/60 bg-background rounded-xl border px-4 py-3'>
            <p className='text-muted-foreground text-[10px] uppercase tracking-wider'>
              Methodology
            </p>

            <p className='mt-0.5 text-xs font-medium'>MWL • Shafi&apos;i</p>
          </div>
        </div> */}
      </CardContent>
    </Card>
  );
}
