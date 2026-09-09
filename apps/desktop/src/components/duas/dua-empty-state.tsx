import { Search } from 'lucide-react';

import { Card, CardContent } from '@muslim-zone/ui/components/card';

type DuaEmptyStateProps = {
  title?: string;
  description?: string;
};

export function DuaEmptyState({
  title = 'No duas found',
  description = 'Try another search term.',
}: DuaEmptyStateProps) {
  return (
    <Card className='rounded-2xl'>
      <CardContent className='flex flex-col items-center justify-center px-6 py-16 text-center'>
        <div className='bg-muted flex size-12 items-center justify-center rounded-full'>
          <Search className='text-muted-foreground size-5' />
        </div>

        <h2 className='mt-4 text-lg font-semibold'>{title}</h2>

        <p className='text-muted-foreground mt-1 text-sm'>{description}</p>
      </CardContent>
    </Card>
  );
}
