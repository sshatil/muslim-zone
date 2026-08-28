import { useAutoLocation } from '../hooks/use-auto-location';

export function HomePage() {
  const { data, isLoading, error } = useAutoLocation();

  if (isLoading) {
    return <div>Getting location...</div>;
  }

  if (error) {
    return <div>Unable to get location.</div>;
  }

  const location = data?.location;

  console.log('Device location error:', data?.deviceError);

  return (
    <div className='space-y-4'>
      <h1 className='text-3xl font-semibold'>Location Test</h1>

      <div className='rounded-xl border p-5'>
        <p>
          Source: <strong>{location?.source}</strong>
        </p>

        <p>Latitude: {location?.latitude}</p>

        <p>Longitude: {location?.longitude}</p>

        <p>City: {location?.city ?? 'Not available'}</p>

        <p>Country: {location?.country ?? 'Not available'}</p>

        <p>Timezone: {location?.timezone ?? 'Not available'}</p>

        <p>IP fallback: {data?.fallbackUsed ? 'Yes' : 'No'}</p>
      </div>
    </div>
  );
}
