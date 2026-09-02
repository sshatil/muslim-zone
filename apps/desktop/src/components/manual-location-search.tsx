import { useState } from 'react';

import { Check, LoaderCircle, MapPin, Search } from 'lucide-react';

import {
  locationSearchResultToManualLocation,
  type LocationSearchResult,
  type UserLocation,
} from '@muslim-zone/core';

import { Button } from '@muslim-zone/ui/components/button';

import { Input } from '@muslim-zone/ui/components/input';

import { cn } from '@muslim-zone/ui/lib/utils';

import { useDebouncedValue } from '../hooks/use-debounced-value';

import { useLocationSearch } from '../hooks/use-location-search';

import { formatSearchLocation } from '../lib/location/location-display';

import { saveManualLocation } from '../lib/location/manual-location-storage';

import { saveLocationMode } from '../lib/location/location-preference';

type ManualLocationSearchProps = {
  onLocationSelected?: (location: UserLocation) => void;
};

export function ManualLocationSearch({
  onLocationSelected,
}: ManualLocationSearchProps) {
  const [query, setQuery] = useState('');

  const [selectedId, setSelectedId] = useState<number | null>(null);

  const debouncedQuery = useDebouncedValue(query, 350);

  const {
    data: locations = [],
    isFetching,
    error,
  } = useLocationSearch(debouncedQuery);

  const handleSelect = (result: LocationSearchResult) => {
    const manualLocation = locationSearchResultToManualLocation(result);

    saveManualLocation(manualLocation);

    saveLocationMode('manual');

    setSelectedId(result.id);

    onLocationSelected?.(manualLocation);
  };

  const hasQuery = query.trim().length >= 2;

  return (
    <div className='space-y-4'>
      <div className='relative'>
        <Search className='text-muted-foreground pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2' />

        <Input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder='Search city, e.g. Wuhan'
          className='pl-9'
        />

        {isFetching && (
          <LoaderCircle className='text-muted-foreground absolute right-3 top-1/2 size-4 -translate-y-1/2 animate-spin' />
        )}
      </div>

      {!hasQuery && (
        <p className='text-muted-foreground text-sm'>
          Enter at least 2 characters to search.
        </p>
      )}

      {error && (
        <p className='text-destructive text-sm'>
          Unable to search locations. Please try again.
        </p>
      )}

      {hasQuery && !isFetching && !error && locations.length === 0 && (
        <div className='rounded-lg border border-dashed p-6 text-center'>
          <MapPin className='text-muted-foreground mx-auto size-5' />

          <p className='mt-2 text-sm font-medium'>No locations found</p>

          <p className='text-muted-foreground mt-1 text-xs'>
            Try another city name.
          </p>
        </div>
      )}

      {locations.length > 0 && (
        <div className='overflow-hidden rounded-xl border'>
          {locations.map((location, index) => {
            const selected = selectedId === location.id;

            return (
              <Button
                key={location.id}
                type='button'
                variant='ghost'
                onClick={() => handleSelect(location)}
                className={cn(
                  'h-auto w-full justify-start rounded-none px-4 py-3 text-left',
                  index !== locations.length - 1 && 'border-b',
                  selected && 'bg-accent',
                )}
              >
                <MapPin className='text-muted-foreground size-4 shrink-0' />

                <div className='min-w-0 flex-1'>
                  <p className='truncate font-medium'>{location.name}</p>

                  <p className='text-muted-foreground mt-0.5 truncate text-xs'>
                    {formatSearchLocation(location)}
                  </p>

                  {location.timezone && (
                    <p className='text-muted-foreground mt-0.5 text-xs'>
                      {location.timezone}
                    </p>
                  )}
                </div>

                {selected && <Check className='text-primary size-4 shrink-0' />}
              </Button>
            );
          })}
        </div>
      )}

      <p className='text-muted-foreground text-xs'>
        Location search data provided by Open-Meteo / GeoNames.
      </p>
    </div>
  );
}
