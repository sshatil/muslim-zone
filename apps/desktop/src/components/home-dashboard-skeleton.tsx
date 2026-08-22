export function HomeDashboardSkeleton() {
  return (
    <div className='animate-pulse space-y-6'>
      <div>
        <div className='bg-muted h-4 w-28 rounded' />

        <div className='bg-muted mt-3 h-9 w-64 rounded' />

        <div className='bg-muted mt-3 h-4 w-80 rounded' />
      </div>

      <div className='bg-muted h-52 rounded-xl' />

      <div className='grid gap-4 md:grid-cols-2'>
        <div className='bg-muted h-24 rounded-xl' />

        <div className='bg-muted h-24 rounded-xl' />
      </div>

      <div className='bg-muted h-96 rounded-xl' />
    </div>
  );
}
