import { useState } from 'react';

import type { UserLocation } from '@muslim-zone/core';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@muslim-zone/ui/components/card';

import { ManualLocationSearch } from '../components/manual-location-search';

import { getSavedManualLocation } from '../lib/location/manual-location-storage';

export function HomePage() {
  const [selectedLocation, setSelectedLocation] = useState<UserLocation | null>(
    () => getSavedManualLocation(),
  );

  return (
    <div className='mx-auto max-w-2xl space-y-6'>
      <div>
        <p className='text-primary text-sm font-medium'>Muslim Zone</p>

        <h1 className='mt-1 text-3xl font-semibold tracking-tight'>
          Choose location
        </h1>

        <p className='text-muted-foreground mt-2'>
          Search for the city whose prayer times you want to use.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Manual location</CardTitle>

          <CardDescription>
            Manual location is useful when a VPN, proxy, or network location
            gives an incorrect result.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <ManualLocationSearch onLocationSelected={setSelectedLocation} />
        </CardContent>
      </Card>

      {selectedLocation && (
        <Card>
          <CardHeader>
            <CardTitle>Saved location</CardTitle>

            <CardDescription>
              This location will become the manual location preference in the
              next stage.
            </CardDescription>
          </CardHeader>

          <CardContent className='space-y-2 text-sm'>
            <div className='flex justify-between gap-6'>
              <span className='text-muted-foreground'>City</span>

              <span className='font-medium'>{selectedLocation.city}</span>
            </div>

            <div className='flex justify-between gap-6'>
              <span className='text-muted-foreground'>Country</span>

              <span className='font-medium'>
                {selectedLocation.flag} {selectedLocation.country}
              </span>
            </div>

            <div className='flex justify-between gap-6'>
              <span className='text-muted-foreground'>Timezone</span>

              <span className='font-medium'>{selectedLocation.timezone}</span>
            </div>

            <div className='flex justify-between gap-6'>
              <span className='text-muted-foreground'>Latitude</span>

              <span className='font-medium tabular-nums'>
                {selectedLocation.latitude.toFixed(5)}
              </span>
            </div>

            <div className='flex justify-between gap-6'>
              <span className='text-muted-foreground'>Longitude</span>

              <span className='font-medium tabular-nums'>
                {selectedLocation.longitude.toFixed(5)}
              </span>
            </div>

            <div className='flex justify-between gap-6'>
              <span className='text-muted-foreground'>Source</span>

              <span className='font-medium'>{selectedLocation.source}</span>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
