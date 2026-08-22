import { CalendarDays } from 'lucide-react';

import { Card, CardContent } from '@muslim-zone/ui/components/card';

type IslamicDateCardProps = {
  date?: string | null;
};

export function IslamicDateCard({ date }: IslamicDateCardProps) {
  return (
    <Card>
      <CardContent className='flex items-center gap-4 p-5'>
        <div className='bg-secondary text-secondary-foreground flex size-11 shrink-0 items-center justify-center rounded-xl'>
          <CalendarDays className='size-5' />
        </div>

        <div>
          <p className='font-medium'>Islamic Date</p>

          <p className='text-muted-foreground mt-1 text-sm'>
            {date ?? 'Calculating date...'}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
