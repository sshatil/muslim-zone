import { AlertCircle, Check, RefreshCw } from 'lucide-react';

import { Button } from '@muslim-zone/ui/components/button';
import { Card, CardContent } from '@muslim-zone/ui/components/card';

import { HomeDashboardSkeleton } from '../components/home-dashboard-skeleton';
import { CurrentPrayerCard } from '../components/home/hero/current-prayer-card';
import { useDesktopPrayer } from '../hooks/use-desktop-prayer';

import { FeaturedDua } from '#components/duas/featured-dua';
import { useState } from 'react';
import { formatLocation } from '../lib/prayer-display';

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

export function HomePage() {
  const {
    locationData,
    prayerData,
    currentPrayerInfo,
    arabicDate,
    isLocationLoading,
    isPrayerLoading,
    isPrayerFetching,
    locationError,
    prayerError,
    refetchLocation,
    refetchPrayer,
  } = useDesktopPrayer();

  const isInitialLoading =
    isLocationLoading || (Boolean(locationData) && isPrayerLoading);

  const [refreshSuccess, setRefreshSuccess] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const handleRefresh = async () => {
    try {
      await refetchPrayer();

      setLastUpdated(new Date());
      setRefreshSuccess(true);

      window.setTimeout(() => {
        setRefreshSuccess(false);
      }, 2000);
    } catch {
      setRefreshSuccess(false);
    }
  };

  if (isInitialLoading && !prayerData) {
    return <HomeDashboardSkeleton />;
  }

  if (locationError && !locationData) {
    return (
      <div className='mx-auto max-w-xl py-20'>
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

  const currentPrayer = currentPrayerInfo?.currentPrayer;

  const nextPrayer = currentPrayerInfo?.nextPrayerName;

  const currentPrayerTime =
    currentPrayer && prayerData?.prayerTimes
      ? prayerData.prayerTimes[currentPrayer]
      : undefined;

  const nextPrayerTime =
    nextPrayer && prayerData?.prayerTimes
      ? prayerData.prayerTimes[nextPrayer]
      : undefined;

  const nextPrayerTimestamp = currentPrayerInfo?.nextPrayerTime?.toMillis?.();

  const englishDate = formatEnglishDate(locationData?.timezone);

  return (
    <div className='mx-auto max-w-[1500px] space-y-8 px-1'>
      {/* Header */}
      <header className='flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between'>
        <div>
          <p className='text-primary text-sm font-medium'>Assalamu Alaikum</p>

          {/* Dates */}
          <div className='mt-3 flex flex-col gap-1'>
            <p className='text-foreground text-lg'>{englishDate}</p>

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

        <div className='flex flex-col items-end gap-1'>
          <Button
            variant='outline'
            onClick={() => void handleRefresh()}
            disabled={isPrayerFetching}
          >
            {isPrayerFetching ? (
              <>
                <RefreshCw className='size-4 animate-spin' />
                Refreshing...
              </>
            ) : refreshSuccess ? (
              <>
                <Check className='size-4' />
                Updated
              </>
            ) : (
              <>
                <RefreshCw className='size-4' />
                Refresh
              </>
            )}
          </Button>

          {lastUpdated && (
            <span className='text-muted-foreground text-xs'>
              Last updated:{' '}
              {lastUpdated.toLocaleTimeString([], {
                hour: 'numeric',
                minute: '2-digit',
              })}
            </span>
          )}
        </div>
      </header>
      {/* Prayer error */}
      {prayerError && (
        <div className='border-destructive/30 bg-destructive/5 text-destructive flex items-center gap-3 rounded-xl border px-4 py-3 text-sm'>
          <AlertCircle className='size-4 shrink-0' />

          <span>{getErrorMessage(prayerError)}</span>
        </div>
      )}
      {/* Current / Next prayer hero */}
      <CurrentPrayerCard
        currentPrayer={currentPrayer}
        nextPrayer={nextPrayer}
        currentPrayerTime={currentPrayerTime}
        nextPrayerTime={nextPrayerTime}
        nextPrayerTimestamp={nextPrayerTimestamp}
        prayerTimes={prayerData?.prayerTimes}
        timezone={locationData?.timezone}
      />
      {/* Featured duas */}
      <div className='space-y-4'>
        <FeaturedDua />
      </div>
    </div>
  );
}
