import { Clock3 } from 'lucide-react';

import { Badge } from '@muslim-zone/ui/components/badge';

import { Card, CardContent } from '@muslim-zone/ui/components/card';

import type { PrayerName } from '@muslim-zone/core';

import { formatPrayerTime, PRAYER_ARABIC_NAMES } from '../lib/prayer-display';

type CurrentPrayerCardProps = {
  currentPrayer: PrayerName | null | undefined;

  nextPrayer: PrayerName | null | undefined;

  currentPrayerTime?: Date | string;

  nextPrayerTime?: Date | string;

  timezone?: string;
};

export function CurrentPrayerCard({
  currentPrayer,
  nextPrayer,
  currentPrayerTime,
  nextPrayerTime,
  timezone,
}: CurrentPrayerCardProps) {
  return (
    <Card className='border-primary/20 bg-primary text-primary-foreground overflow-hidden'>
      <CardContent className='p-0'>
        <div className='grid gap-8 p-7 md:grid-cols-[1fr_auto] md:items-end'>
          <div>
            <Badge variant='secondary' className='mb-5'>
              Current Prayer
            </Badge>

            <div className='flex items-end gap-4'>
              <div>
                <p className='text-4xl font-semibold tracking-tight'>
                  {currentPrayer ?? 'Prayer'}
                </p>

                {currentPrayer && (
                  <p className='mt-1 text-xl opacity-80'>
                    {PRAYER_ARABIC_NAMES[currentPrayer]}
                  </p>
                )}
              </div>

              {currentPrayerTime && (
                <p className='mb-1 text-lg font-medium opacity-80'>
                  {formatPrayerTime(currentPrayerTime, timezone)}
                </p>
              )}
            </div>
          </div>

          {nextPrayer && (
            <div className='rounded-xl bg-black/10 px-5 py-4 dark:bg-white/10'>
              <div className='flex items-center gap-2 text-sm opacity-75'>
                <Clock3 className='size-4' />

                <span>Next prayer</span>
              </div>

              <div className='mt-2 flex items-center gap-3'>
                <span className='font-semibold'>{nextPrayer}</span>

                <span className='opacity-70'>
                  {formatPrayerTime(nextPrayerTime, timezone)}
                </span>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
