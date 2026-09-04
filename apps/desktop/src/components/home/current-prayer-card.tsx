import { Clock3 } from 'lucide-react';

import type { PrayerName } from '@muslim-zone/core';

import { Badge } from '@muslim-zone/ui/components/badge';

import { Card, CardContent } from '@muslim-zone/ui/components/card';

import {
  formatCountdown,
  usePrayerCountdown,
} from '../../hooks/use-prayer-countdown';

import {
  formatPrayerTime,
  PRAYER_ARABIC_NAMES,
} from '../../lib/prayer-display';

type CurrentPrayerCardProps = {
  currentPrayer: PrayerName | null | undefined;

  nextPrayer: PrayerName | null | undefined;

  currentPrayerTime?: Date | string;

  nextPrayerTime?: Date | string;

  nextPrayerTimestamp?: number;

  timezone?: string;
};

export function CurrentPrayerCard({
  currentPrayer,
  nextPrayer,
  currentPrayerTime,
  nextPrayerTime,
  nextPrayerTimestamp,
  timezone,
}: CurrentPrayerCardProps) {
  const countdown = usePrayerCountdown(nextPrayerTimestamp);

  const title =
    currentPrayer ?? (nextPrayer ? `Before ${nextPrayer}` : 'Prayer');

  return (
    <Card className='border-primary/20 bg-primary text-primary-foreground overflow-hidden'>
      <CardContent className='p-7 md:p-8'>
        <div className='grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end'>
          <div>
            <Badge variant='secondary' className='mb-5'>
              Current Prayer
            </Badge>

            <h2 className='text-4xl font-semibold tracking-tight md:text-5xl'>
              {title}
            </h2>

            {currentPrayer && (
              <p className='mt-2 text-2xl opacity-75'>
                {PRAYER_ARABIC_NAMES[currentPrayer]}
              </p>
            )}

            {currentPrayerTime && (
              <p className='mt-5 text-lg opacity-80'>
                Started at {formatPrayerTime(currentPrayerTime, timezone)}
              </p>
            )}
          </div>

          {nextPrayer && (
            <div className='min-w-56 rounded-2xl bg-black/10 p-5 dark:bg-white/10'>
              <div className='flex items-center gap-2 text-sm opacity-75'>
                <Clock3 className='size-4' />
                Next prayer
              </div>

              <div className='mt-3 flex items-center justify-between gap-5'>
                <div>
                  <p className='font-semibold'>{nextPrayer}</p>

                  <p className='mt-1 text-sm opacity-70'>
                    {formatPrayerTime(nextPrayerTime, timezone)}
                  </p>
                </div>

                <p className='font-mono text-lg font-semibold tabular-nums'>
                  {formatCountdown(countdown)}
                </p>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
