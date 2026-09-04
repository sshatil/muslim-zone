import { AlertCircle, RefreshCw } from 'lucide-react';

import { Button } from '@muslim-zone/ui/components/button';

import { Card, CardContent } from '@muslim-zone/ui/components/card';

import { CurrentPrayerCard } from '../components/home/current-prayer-card';

import { useDesktopPrayer } from '../hooks/use-desktop-prayer';

function getErrorMessage(error: unknown) {
  if (error instanceof Error) {
    return error.message;
  }

  return 'Something went wrong.';
}

export function HomePage() {
  const {
    locationData,

    prayerData,
    currentPrayerInfo,
    // arabicDate,

    isLocationLoading,
    isLocationFetching,

    isPrayerLoading,
    isPrayerFetching,

    locationError,
    prayerError,

    refetchLocation,

    // automaticFallbackUsed,
  } = useDesktopPrayer();

  const isInitialLoading =
    isLocationLoading || (Boolean(locationData) && isPrayerLoading);

  const isRefreshing = isLocationFetching || isPrayerFetching;

  if (isInitialLoading && !prayerData) {
    return <p>Loading</p>;
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

  const currentPrayerTime = currentPrayerInfo?.currentPrayerTime?.toJSDate?.();

  const nextPrayerTime = currentPrayerInfo?.nextPrayerTime?.toJSDate?.();

  const nextPrayerTimestamp = currentPrayerInfo?.nextPrayerTime?.toMillis?.();

  return (
    <div className='space-y-7'>
      <header className='flex items-start justify-between gap-6'>
        <div>
          <p className='text-primary text-sm font-medium'>Assalamu Alaikum</p>

          <h1 className='mt-1 text-3xl font-semibold tracking-tight'>
            Today's Prayer
          </h1>

          <p className='text-muted-foreground mt-2'>
            Your daily prayer and spiritual overview.
          </p>
        </div>

        {isRefreshing && (
          <div className='text-muted-foreground flex items-center gap-2 text-sm'>
            <RefreshCw className='size-4 animate-spin' />
            Updating
          </div>
        )}
      </header>

      {prayerError && (
        <div className='border-destructive/30 bg-destructive/5 text-destructive flex items-center gap-3 rounded-xl border px-4 py-3 text-sm'>
          <AlertCircle className='size-4 shrink-0' />

          {getErrorMessage(prayerError)}
        </div>
      )}

      <CurrentPrayerCard
        currentPrayer={currentPrayer}
        nextPrayer={nextPrayer}
        currentPrayerTime={currentPrayerTime}
        nextPrayerTime={nextPrayerTime}
        nextPrayerTimestamp={nextPrayerTimestamp}
        timezone={locationData?.timezone}
      />
    </div>
  );
}
