import { FeaturedDua } from '#components/duas/featured-dua';
import { HomeDashboardSkeleton } from '#components/home-dashboard-skeleton';
import { useDesktopPrayer } from '#hooks/use-desktop-prayer';

import { CurrentPrayerCard } from './hero/current-prayer-card';
import { HomeHeader } from './home-header';
import { LocationUnavailable } from './location-unavailable';
import { PrayerFetchStatus } from './prayer-fetch-status';

export function Home() {
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

  if (isInitialLoading && !prayerData) {
    return <HomeDashboardSkeleton />;
  }

  if (locationError && !locationData) {
    return (
      <LocationUnavailable
        error={locationError}
        onRetry={() => void refetchLocation()}
      />
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

  return (
    <div className='max-w-375 mx-auto space-y-8 px-1'>
      <HomeHeader
        locationData={locationData}
        arabicDate={arabicDate}
        isRefreshing={isPrayerFetching}
        onRefresh={() => void refetchPrayer()}
      />

      {prayerError && <PrayerFetchStatus error={prayerError} />}

      <CurrentPrayerCard
        currentPrayer={currentPrayer}
        nextPrayer={nextPrayer}
        currentPrayerTime={currentPrayerTime}
        nextPrayerTime={nextPrayerTime}
        nextPrayerTimestamp={nextPrayerTimestamp}
        prayerTimes={prayerData?.prayerTimes}
        timezone={locationData?.timezone}
      />

      <div className='space-y-4'>
        <FeaturedDua />
      </div>
    </div>
  );
}
