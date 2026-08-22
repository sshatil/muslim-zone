import { AlertCircle, RefreshCw } from 'lucide-react';

import { Button } from '@muslim-zone/ui/components/button';

import { Card, CardContent } from '@muslim-zone/ui/components/card';

import { CurrentPrayerCard } from '../components/current-prayer-card';

import { HomeDashboardSkeleton } from '../components/home-dashboard-skeleton';

import { IslamicDateCard } from '../components/islamic-date-card';

import { LocationCard } from '../components/location-card';

import { PrayerSchedule } from '../components/prayer-schedule';

import { useDesktopPrayer } from '../hooks/use-desktop-prayer';

function getErrorMessage(error: unknown) {
  if (error instanceof Error) {
    return error.message;
  }

  return 'Something went wrong while loading prayer information.';
}

export function HomePage() {
  const {
    locationData,

    prayerData,
    currentPrayerInfo,
    arabicDate,

    isLocationLoading,
    isLocationFetching,
    locationError,

    isPrayerLoading,
    isPrayerFetching,
    prayerError,

    refetchLocation,
  } = useDesktopPrayer();

  const isInitialLoading =
    isLocationLoading || (Boolean(locationData) && isPrayerLoading);

  const isRefreshing = isLocationFetching || isPrayerFetching;

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

  const prayerTimes = prayerData?.prayerTimes;

  const currentPrayer = currentPrayerInfo?.currentPrayer;

  const nextPrayer = currentPrayerInfo?.nextPrayerName;

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

          <span>{getErrorMessage(prayerError)}</span>
        </div>
      )}

      <CurrentPrayerCard
        currentPrayer={currentPrayer}
        nextPrayer={nextPrayer}
        currentPrayerTime={
          currentPrayerInfo?.currentPrayerTime?.toJSDate?.() ?? undefined
        }
        nextPrayerTime={
          currentPrayerInfo?.nextPrayerTime?.toJSDate?.() ?? undefined
        }
        timezone={locationData?.timezone}
      />

      <div className='grid gap-4 lg:grid-cols-2'>
        <LocationCard
          city={locationData?.city}
          country={locationData?.country}
          flag={locationData?.flag}
          timezone={locationData?.timezone}
        />

        <IslamicDateCard date={arabicDate} />
      </div>

      <div className='grid gap-6 xl:grid-cols-[minmax(0,1.5fr)_minmax(280px,0.75fr)]'>
        <PrayerSchedule
          prayerTimes={prayerTimes}
          currentPrayer={currentPrayer}
          nextPrayer={nextPrayer}
          timezone={locationData?.timezone}
        />

        <Card className='h-fit'>
          <CardContent className='p-6'>
            <p className='text-primary text-sm font-medium'>Today</p>

            <h2 className='mt-2 text-xl font-semibold'>
              Stay connected with your prayers
            </h2>

            <p className='text-muted-foreground mt-3 text-sm leading-6'>
              Muslim Zone uses your current location to calculate today's prayer
              times.
            </p>

            <div className='mt-6 space-y-3 text-sm'>
              <div className='flex justify-between gap-4'>
                <span className='text-muted-foreground'>Location source</span>

                <span className='font-medium capitalize'>
                  {locationData?.source ?? '—'}
                </span>
              </div>

              <div className='flex justify-between gap-4'>
                <span className='text-muted-foreground'>Latitude</span>

                <span className='font-medium tabular-nums'>
                  {locationData ? locationData.latitude.toFixed(4) : '—'}
                </span>
              </div>

              <div className='flex justify-between gap-4'>
                <span className='text-muted-foreground'>Longitude</span>

                <span className='font-medium tabular-nums'>
                  {locationData ? locationData.longitude.toFixed(4) : '—'}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
