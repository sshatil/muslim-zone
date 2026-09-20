import {
  AlertTriangle,
  LocateFixed,
  MapPin,
  Navigation,
  Trash2,
} from 'lucide-react';

import { Badge } from '@muslim-zone/ui/components/badge';

import { Button } from '@muslim-zone/ui/components/button';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@muslim-zone/ui/components/card';

import { Separator } from '@muslim-zone/ui/components/separator';

import { ThemeSelector } from '@muslim-zone/ui/components/theme-selector';

import { cn } from '@muslim-zone/ui/lib/utils';

import { ManualLocationSearch } from '../components/manual-location-search';

import { useDesktopLocation } from '../hooks/use-desktop-location';

import { useLocationPreference } from '../hooks/use-location-preference';

import { useSavedManualLocation } from '../hooks/use-saved-manual-location';

import { UpdateButton } from '#components/update-button';
import { clearManualLocation } from '../lib/location/manual-location-storage';

function formatCoordinates(latitude?: number, longitude?: number) {
  if (latitude === undefined || longitude === undefined) {
    return 'Unavailable';
  }

  return `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`;
}

export function SettingsPage() {
  const { mode, setMode } = useLocationPreference();

  const manualLocation = useSavedManualLocation();

  const {
    data: activeLocation,

    automaticFallbackUsed,

    deviceError,

    isFetching,

    refetch,
  } = useDesktopLocation();

  const selectAutomatic = () => {
    setMode('automatic');
  };

  const selectManual = () => {
    setMode('manual');
  };

  const forgetManualLocation = () => {
    clearManualLocation();

    setMode('automatic');
  };

  return (
    <div className='max-w-3xl space-y-8'>
      <header>
        <h1 className='text-3xl font-semibold tracking-tight'>Settings</h1>

        <p className='text-muted-foreground mt-2'>
          Configure Muslim Zone for this device.{' '}
          <span className='text-xs'>(v0.3.0)</span>
        </p>
      </header>

      {/* LOCATION */}

      <Card>
        <CardHeader>
          <CardTitle>Location</CardTitle>

          <CardDescription>
            Choose how Muslim Zone determines the location used for prayer
            times.
          </CardDescription>
        </CardHeader>

        <CardContent className='space-y-6'>
          <div
            className='grid gap-3 sm:grid-cols-2'
            role='radiogroup'
            aria-label='Location mode'
          >
            <button
              type='button'
              role='radio'
              aria-checked={mode === 'automatic'}
              onClick={selectAutomatic}
              className={cn(
                'rounded-xl border p-4 text-left transition-colors',
                mode === 'automatic'
                  ? 'border-primary bg-primary/5 ring-primary ring-1'
                  : 'hover:bg-muted/50',
              )}
            >
              <div className='flex items-start gap-3'>
                <div className='bg-accent text-accent-foreground mt-0.5 rounded-lg p-2'>
                  <LocateFixed className='size-4' />
                </div>

                <div>
                  <p className='font-medium'>Automatic</p>

                  <p className='text-muted-foreground mt-1 text-sm leading-5'>
                    Try device location first, then use IP location as a
                    fallback.
                  </p>
                </div>
              </div>
            </button>

            <button
              type='button'
              role='radio'
              aria-checked={mode === 'manual'}
              onClick={selectManual}
              className={cn(
                'rounded-xl border p-4 text-left transition-colors',
                mode === 'manual'
                  ? 'border-primary bg-primary/5 ring-primary ring-1'
                  : 'hover:bg-muted/50',
              )}
            >
              <div className='flex items-start gap-3'>
                <div className='bg-accent text-accent-foreground mt-0.5 rounded-lg p-2'>
                  <MapPin className='size-4' />
                </div>

                <div>
                  <p className='font-medium'>Manual</p>

                  <p className='text-muted-foreground mt-1 text-sm leading-5'>
                    Choose a city yourself. Best when using a VPN or proxy.
                  </p>
                </div>
              </div>
            </button>
          </div>

          <Separator />

          {/* AUTOMATIC */}

          {mode === 'automatic' && (
            <div className='space-y-5'>
              <div className='flex items-start justify-between gap-4'>
                <div>
                  <p className='font-medium'>Current automatic location</p>

                  <p className='text-muted-foreground mt-1 text-sm'>
                    Muslim Zone will automatically use the best available
                    location source.
                  </p>
                </div>

                {activeLocation && (
                  <Badge variant='secondary'>{activeLocation.source}</Badge>
                )}
              </div>

              {automaticFallbackUsed && (
                <div className='flex gap-3 rounded-xl border border-amber-500/30 bg-amber-500/5 p-4'>
                  <AlertTriangle className='mt-0.5 size-5 shrink-0 text-amber-600 dark:text-amber-400' />

                  <div>
                    <p className='text-sm font-medium'>
                      Using approximate IP location
                    </p>

                    <p className='text-muted-foreground mt-1 text-sm leading-5'>
                      Device location was unavailable. A VPN or proxy can make
                      IP location inaccurate. Use Manual mode if the location is
                      wrong.
                    </p>

                    {deviceError && (
                      <p className='text-muted-foreground mt-2 text-xs'>
                        Device location: {deviceError.message}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {activeLocation && (
                <div className='bg-muted/50 rounded-xl p-4'>
                  <div className='flex items-center gap-3'>
                    <Navigation className='text-primary size-5' />

                    <div>
                      <p className='font-medium'>
                        {activeLocation.flag && `${activeLocation.flag} `}

                        {activeLocation.city ?? 'Detected location'}

                        {activeLocation.country &&
                          `, ${activeLocation.country}`}
                      </p>

                      <p className='text-muted-foreground mt-1 text-sm'>
                        {activeLocation.timezone ?? 'Timezone unavailable'}
                      </p>
                    </div>
                  </div>

                  <div className='mt-4 border-t pt-4 text-sm'>
                    <span className='text-muted-foreground'>Coordinates: </span>

                    <span className='font-medium tabular-nums'>
                      {formatCoordinates(
                        activeLocation.latitude,
                        activeLocation.longitude,
                      )}
                    </span>
                  </div>
                </div>
              )}

              <Button
                type='button'
                variant='outline'
                disabled={isFetching}
                onClick={() => void refetch()}
              >
                <LocateFixed
                  className={cn('size-4', isFetching && 'animate-spin')}
                />
                Refresh automatic location
              </Button>
            </div>
          )}

          {/* MANUAL */}

          {mode === 'manual' && (
            <div className='space-y-6'>
              {manualLocation ? (
                <div className='bg-muted/50 rounded-xl p-4'>
                  <div className='flex items-start justify-between gap-4'>
                    <div className='flex items-center gap-3'>
                      <MapPin className='text-primary size-5' />

                      <div>
                        <p className='font-medium'>
                          {manualLocation.flag && `${manualLocation.flag} `}

                          {manualLocation.city ?? 'Manual location'}

                          {manualLocation.country &&
                            `, ${manualLocation.country}`}
                        </p>

                        <p className='text-muted-foreground mt-1 text-sm'>
                          {manualLocation.timezone ?? 'Timezone unavailable'}
                        </p>
                      </div>
                    </div>

                    <Badge>Manual</Badge>
                  </div>

                  <div className='mt-4 border-t pt-4 text-sm'>
                    <span className='text-muted-foreground'>Coordinates: </span>

                    <span className='font-medium tabular-nums'>
                      {formatCoordinates(
                        manualLocation.latitude,
                        manualLocation.longitude,
                      )}
                    </span>
                  </div>
                </div>
              ) : (
                <div className='rounded-xl border border-dashed p-5'>
                  <p className='font-medium'>Choose a manual location</p>

                  <p className='text-muted-foreground mt-1 text-sm'>
                    Search below and select the city whose prayer times you want
                    to use.
                  </p>
                </div>
              )}

              <div>
                <p className='mb-3 text-sm font-medium'>
                  {manualLocation ? 'Change location' : 'Search location'}
                </p>

                <ManualLocationSearch />
              </div>

              {manualLocation && (
                <Button
                  type='button'
                  variant='ghost'
                  className='text-destructive hover:text-destructive'
                  onClick={forgetManualLocation}
                >
                  <Trash2 className='size-4' />
                  Forget manual location
                </Button>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* APPEARANCE */}

      <Card>
        <CardHeader>
          <CardTitle>Appearance</CardTitle>

          <CardDescription>
            Choose how Muslim Zone looks on your computer.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <ThemeSelector />
        </CardContent>
      </Card>
      {/* Update */}
      <UpdateButton />
    </div>
  );
}
