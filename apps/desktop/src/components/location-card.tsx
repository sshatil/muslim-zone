import { MapPin } from 'lucide-react';

import { Card, CardContent } from '@muslim-zone/ui/components/card';

import { formatLocationName } from '../lib/prayer-display';

type LocationCardProps = {
  city?: string;
  country?: string;
  flag?: string;
  timezone?: string;
};

export function LocationCard({
  city,
  country,
  flag,
  timezone,
}: LocationCardProps) {
  return (
    <Card>
      <CardContent className='flex items-center gap-4 p-5'>
        <div className='bg-accent text-accent-foreground flex size-11 shrink-0 items-center justify-center rounded-xl'>
          <MapPin className='size-5' />
        </div>

        <div className='min-w-0'>
          <div className='flex items-center gap-2'>
            {flag && <span>{flag}</span>}

            <p className='truncate font-medium'>
              {formatLocationName(city, country)}
            </p>
          </div>

          <p className='text-muted-foreground mt-1 truncate text-sm'>
            {timezone ?? 'Timezone unavailable'}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
