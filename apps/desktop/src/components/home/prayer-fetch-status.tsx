import { AlertCircle } from 'lucide-react';

type HomePrayerErrorProps = {
  error: unknown;
};

function getErrorMessage(error: unknown) {
  if (error instanceof Error) {
    return error.message;
  }

  return 'Something went wrong.';
}

export function PrayerFetchStatus({ error }: HomePrayerErrorProps) {
  return (
    <div className='border-destructive/30 bg-destructive/5 text-destructive flex items-center gap-3 rounded-xl border px-4 py-3 text-sm'>
      <AlertCircle className='size-4 shrink-0' />

      <span>{getErrorMessage(error)}</span>
    </div>
  );
}
