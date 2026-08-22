import { Clock3 } from 'lucide-react';

import { PRAYER_ORDER, type PrayerName } from '@muslim-zone/core';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@muslim-zone/ui/components/card';

import { cn } from '@muslim-zone/ui/lib/utils';

import { formatPrayerTime, PRAYER_ARABIC_NAMES } from '../lib/prayer-display';

type PrayerTimes = Partial<Record<PrayerName, Date | string>>;

type PrayerScheduleProps = {
  prayerTimes?: PrayerTimes;
  currentPrayer?: PrayerName | null;
  nextPrayer?: PrayerName | null;
  timezone?: string;
};

export function PrayerSchedule({
  prayerTimes,
  currentPrayer,
  nextPrayer,
  timezone,
}: PrayerScheduleProps) {
  return (
    <Card>
      <CardHeader>
        <div className='flex items-center justify-between'>
          <CardTitle>Today's Prayers</CardTitle>

          <Clock3 className='text-muted-foreground size-4' />
        </div>
      </CardHeader>

      <CardContent>
        <div className='space-y-1'>
          {PRAYER_ORDER.map((prayer) => {
            const active = prayer === currentPrayer;

            const next = prayer === nextPrayer;

            return (
              <div
                key={prayer}
                className={cn(
                  'flex items-center justify-between rounded-xl px-4 py-3 transition-colors',
                  active && 'bg-primary text-primary-foreground',
                  !active && next && 'bg-accent text-accent-foreground',
                  !active && !next && 'hover:bg-muted/60',
                )}
              >
                <div className='flex items-center gap-3'>
                  <div>
                    <p className='font-medium'>{prayer}</p>

                    <p
                      className={cn(
                        'text-xs',
                        active
                          ? 'text-primary-foreground/70'
                          : 'text-muted-foreground',
                      )}
                    >
                      {PRAYER_ARABIC_NAMES[prayer]}
                    </p>
                  </div>

                  {active && (
                    <span className='bg-primary-foreground/15 rounded-full px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide'>
                      Current
                    </span>
                  )}

                  {!active && next && (
                    <span className='bg-accent-foreground/10 rounded-full px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide'>
                      Next
                    </span>
                  )}
                </div>

                <p className='font-semibold tabular-nums'>
                  {formatPrayerTime(prayerTimes?.[prayer], timezone)}
                </p>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
