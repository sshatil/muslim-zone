import { Check, RefreshCw } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@muslim-zone/ui/components/button';

import { formatLocation } from '#lib/prayer-display';

type LocationData = {
  city?: string;
  country?: string;
  flag?: string;
  timezone?: string;
};

type HomeHeaderProps = {
  locationData?: LocationData | null;
  arabicDate?: string | null;
  isRefreshing: boolean;
  onRefresh: () => void;
};

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

export function HomeHeader({
  locationData,
  arabicDate,
  isRefreshing,
  onRefresh,
}: HomeHeaderProps) {
  const [refreshSuccess, setRefreshSuccess] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const handleRefresh = async () => {
    try {
      await onRefresh();

      setLastUpdated(new Date());
      setRefreshSuccess(true);

      window.setTimeout(() => {
        setRefreshSuccess(false);
      }, 2000);
    } catch {
      setRefreshSuccess(false);
    }
  };

  const englishDate = formatEnglishDate(locationData?.timezone);

  return (
    <header className='flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between'>
      <div>
        <p className='text-primary text-sm font-medium'>Assalamu Alaikum</p>

        <div className='mt-3 flex flex-col gap-1'>
          <p className='text-foreground text-lg'>{englishDate}</p>

          {arabicDate && (
            <p className='text-foreground text-sm font-medium'>{arabicDate}</p>
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
          disabled={isRefreshing}
        >
          {isRefreshing ? (
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
  );
}
