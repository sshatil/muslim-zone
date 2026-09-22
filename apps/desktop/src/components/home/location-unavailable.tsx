import { AlertCircle } from 'lucide-react';

import { Button } from '@muslim-zone/ui/components/button';
import { Card, CardContent } from '@muslim-zone/ui/components/card';

type HomeErrorProps = {
  error: unknown;
  onRetry: () => void;
};

function getErrorMessage(error: unknown) {
  if (error instanceof Error) {
    return error.message;
  }

  return 'Something went wrong.';
}

export function LocationUnavailable({ error, onRetry }: HomeErrorProps) {
  return (
    <div className='mx-auto max-w-xl py-20'>
      <Card>
        <CardContent className='flex flex-col items-center p-8 text-center'>
          <div className='bg-destructive/10 text-destructive flex size-12 items-center justify-center rounded-full'>
            <AlertCircle className='size-6' />
          </div>

          <h2 className='mt-5 text-xl font-semibold'>Location unavailable</h2>

          <p className='text-muted-foreground mt-2 text-sm leading-6'>
            {getErrorMessage(error)}
          </p>

          <Button className='mt-6' onClick={onRetry}>
            Try again
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
