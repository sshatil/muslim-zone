import { AlertCircle, RefreshCw } from 'lucide-react';

import type { PrayerName } from '@muslim-zone/core';
import { usePrayerWeek } from '@muslim-zone/react';

import { Button } from '@muslim-zone/ui/components/button';
import { Card, CardContent } from '@muslim-zone/ui/components/card';

import { PrayerIcon } from '../components/home/hero/prayer-icon';
import { useDesktopPrayer } from '../hooks/use-desktop-prayer';

import {
  formatLocation,
  formatPrayerTime,
  PRAYER_ARABIC_NAMES,
} from '../lib/prayer-display';

const PRAYER_ORDER: PrayerName[] = ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];

function getErrorMessage(error: unknown) {
  if (error instanceof Error) {
    return error.message;
  }

  return 'Something went wrong.';
}

function formatEnglishDate(timezone?: string) {
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  };

  if (timezone) {
    options.timeZone = timezone;
  }

  try {
    return new Intl.DateTimeFormat('en-US', options).format(new Date());
  } catch {
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(new Date());
  }
}

function formatScheduleDate(date: string, timezone?: string) {
  try {
    const dateValue = new Date(`${date}T12:00:00`);

    return new Intl.DateTimeFormat('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      timeZone: timezone,
    }).format(dateValue);
  } catch {
    return date;
  }
}

export function PrayerTimesPage() {
  const {
    locationData,
    prayerData,
    currentPrayerInfo,
    arabicDate,

    isLocationLoading,
    isLocationFetching,

    isPrayerLoading,
    isPrayerFetching,

    locationError,
    prayerError,

    refetchLocation,
  } = useDesktopPrayer();

  const { prayerDays, isLoading: isPrayerWeekLoading } = usePrayerWeek(
    locationData,
    7,
  );

  const isInitialLoading =
    isLocationLoading || (Boolean(locationData) && isPrayerLoading);

  const isRefreshing =
    isLocationFetching || isPrayerFetching || isPrayerWeekLoading;

  if (isInitialLoading && !prayerData) {
    return (
      <div className='mx-auto w-full max-w-[1500px] space-y-8'>
        <div className='space-y-3'>
          <div className='bg-muted h-4 w-28 animate-pulse rounded' />
          <div className='bg-muted h-9 w-72 animate-pulse rounded-lg' />
          <div className='bg-muted h-5 w-80 animate-pulse rounded' />
        </div>

        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5'>
          {PRAYER_ORDER.map((prayer) => (
            <Card key={prayer} className='rounded-2xl'>
              <CardContent className='space-y-4 p-6'>
                <div className='bg-muted size-10 animate-pulse rounded-xl' />

                <div className='bg-muted h-5 w-20 animate-pulse rounded' />

                <div className='bg-muted h-8 w-28 animate-pulse rounded' />
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className='rounded-2xl'>
          <CardContent className='space-y-4 p-6'>
            <div className='bg-muted h-6 w-48 animate-pulse rounded' />

            <div className='bg-muted h-4 w-72 animate-pulse rounded' />

            <div className='bg-muted mt-6 h-72 animate-pulse rounded-xl' />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (locationError && !locationData) {
    return (
      <div className='mx-auto w-full max-w-xl py-20'>
        <Card>
          <CardContent className='flex flex-col items-center p-8 text-center'>
            <div className='bg-destructive/10 text-destructive flex size-12 items-center justify-center rounded-full'>
              <AlertCircle className='size-6' />
            </div>

            <h2 className='mt-5 text-xl font-semibold'>Location unavailable</h2>

            <p className='text-muted-foreground mt-2 text-sm leading-6'>
              {getErrorMessage(locationError)}
            </p>

            <Button className='mt-6' onClick={() => void refetchLocation()}>
              <RefreshCw className='size-4' />
              Try again
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const englishDate = formatEnglishDate(locationData?.timezone);

  return (
    <div className='mx-auto w-full max-w-[1500px] space-y-8'>
      {/* Header */}
      <header className='flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between'>
        <div>
          <p className='text-primary text-sm font-medium'>Prayer Times</p>

          <h1 className='text-foreground mt-1 text-3xl font-semibold tracking-tight'>
            Today&apos;s Prayer Times
          </h1>

          <div className='mt-3 flex flex-col gap-1'>
            <p className='text-foreground text-base'>{englishDate}</p>

            {arabicDate && (
              <p className='text-foreground text-sm font-medium'>
                {arabicDate}
              </p>
            )}
          </div>

          {locationData && (
            <div className='text-muted-foreground mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm'>
              <span>
                {formatLocation(locationData.city, locationData.country)}
              </span>

              {locationData.flag && (
                <span aria-label='Country'>{locationData.flag}</span>
              )}

              {locationData.timezone && (
                <>
                  <span className='bg-accent-foreground h-1 w-1 rounded-full' />

                  <p>
                    <span className='font-bold'>Time Zone:</span>{' '}
                    {locationData.timezone}
                  </p>
                </>
              )}
            </div>
          )}
        </div>

        {isRefreshing && (
          <div className='text-muted-foreground flex shrink-0 items-center gap-2 text-sm'>
            <RefreshCw className='size-4 animate-spin' />
            Updating
          </div>
        )}
      </header>

      {/* Prayer error */}
      {prayerError && (
        <div className='border-destructive/30 bg-destructive/5 text-destructive flex items-center gap-3 rounded-xl border px-4 py-3 text-sm'>
          <AlertCircle className='size-4 shrink-0' />

          <span>{getErrorMessage(prayerError)}</span>
        </div>
      )}

      {/* Today's Prayer Cards */}
      <div className='grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5'>
        {PRAYER_ORDER.map((prayer) => {
          const prayerTime = prayerData?.prayerTimes?.[prayer];

          const isCurrent = currentPrayerInfo?.currentPrayer === prayer;

          return (
            <Card
              key={prayer}
              className={
                isCurrent
                  ? 'rounded-2xl border-emerald-300 bg-emerald-100/80 shadow-sm dark:border-emerald-800 dark:bg-emerald-950'
                  : 'rounded-2xl'
              }
            >
              <CardContent className='p-5'>
                <div className='flex items-start justify-between gap-3'>
                  <PrayerIcon prayer={prayer} size='small' />

                  {isCurrent && (
                    <span className='rounded-full bg-emerald-500 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white'>
                      Now
                    </span>
                  )}
                </div>

                <div className='mt-5'>
                  <h2 className='text-foreground text-lg font-semibold'>
                    {prayer}
                  </h2>

                  <p className='text-muted-foreground mt-0.5 text-sm'>
                    {PRAYER_ARABIC_NAMES[prayer]}
                  </p>

                  <p className='text-foreground mt-4 text-2xl font-semibold tabular-nums tracking-tight'>
                    {formatPrayerTime(prayerTime, locationData?.timezone)}
                  </p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* 7-Day Prayer Schedule */}
      <Card className='w-full overflow-hidden rounded-2xl'>
        <CardContent className='p-0'>
          {/* Schedule Header */}
          <div className='flex items-center justify-between gap-4 p-6'>
            <div>
              <h2 className='text-xl font-semibold'>Upcoming Prayer Times</h2>

              <p className='text-muted-foreground mt-1 text-sm'>
                Prayer times for the next 7 days
              </p>
            </div>

            {isPrayerWeekLoading && (
              <RefreshCw className='text-muted-foreground size-4 animate-spin' />
            )}
          </div>

          {/* Table */}
          {prayerDays.length > 0 ? (
            <div className='w-full overflow-x-auto'>
              <table className='w-full min-w-[850px] border-collapse'>
                <thead>
                  <tr className='bg-muted/40 border-y'>
                    <th className='px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider'>
                      Date
                    </th>

                    {PRAYER_ORDER.map((prayer) => (
                      <th
                        key={prayer}
                        className='px-4 py-4 text-center text-xs font-semibold uppercase tracking-wider'
                      >
                        <div>{prayer}</div>

                        <div className='text-muted-foreground mt-0.5 text-[10px] font-normal normal-case'>
                          {PRAYER_ARABIC_NAMES[prayer]}
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {prayerDays.map((day, index) => {
                    const isToday = index === 0;

                    return (
                      <tr
                        key={day.date}
                        className={
                          isToday
                            ? 'bg-emerald-100/80 dark:bg-emerald-950/80'
                            : 'border-b last:border-b-0'
                        }
                      >
                        {/* Date */}
                        <td className='whitespace-nowrap px-6 py-5'>
                          <div className='flex items-center gap-3'>
                            <div>
                              <p className='font-medium'>
                                {formatScheduleDate(
                                  day.date,
                                  locationData?.timezone,
                                )}
                              </p>

                              {isToday && (
                                <span className='mt-1 inline-block rounded-full bg-emerald-500 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white'>
                                  Today
                                </span>
                              )}
                            </div>
                          </div>
                        </td>

                        {/* Prayer Times */}
                        {PRAYER_ORDER.map((prayer) => (
                          <td
                            key={prayer}
                            className='whitespace-nowrap px-4 py-5 text-center'
                          >
                            <span className='text-foreground text-sm font-semibold tabular-nums'>
                              {formatPrayerTime(
                                day.prayerTimes[prayer],
                                locationData?.timezone,
                              )}
                            </span>
                          </td>
                        ))}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <div className='text-muted-foreground px-6 pb-8 text-center text-sm'>
              Prayer schedule is not available yet.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
