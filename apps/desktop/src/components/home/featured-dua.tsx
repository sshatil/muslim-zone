import { ArrowRight, Bookmark } from 'lucide-react';

import { getFeaturedDuasByIds } from '@muslim-zone/core';
import { useFeaturedDuas } from '@muslim-zone/react';

import { Card, CardContent } from '@muslim-zone/ui/components/card';

export function FeaturedDua() {
  const { featuredIds } = useFeaturedDuas();

  const featuredDuas = getFeaturedDuasByIds('daily', featuredIds);

  return (
    <section className='w-full space-y-5'>
      {/* Header */}
      <div className='flex w-full items-end justify-between gap-4'>
        <div>
          <h2 className='text-2xl font-semibold tracking-tight'>Useful Duas</h2>

          <p className='text-muted-foreground mt-1 text-sm'>
            Your bookmarked duas for quick access
          </p>
        </div>

        <button
          type='button'
          className='text-primary flex shrink-0 items-center gap-1.5 text-sm font-semibold hover:opacity-75'
        >
          View more
          <ArrowRight className='size-4' />
        </button>
      </div>

      {/* Empty state */}
      {featuredDuas.length === 0 ? (
        <Card className='w-full rounded-2xl'>
          <CardContent className='flex flex-col items-center justify-center px-6 py-12 text-center'>
            <div className='bg-primary/10 text-primary flex size-12 items-center justify-center rounded-full'>
              <Bookmark className='size-5' />
            </div>

            <p className='mt-4 font-medium'>No duas added yet</p>

            <p className='text-muted-foreground mt-1 max-w-md text-sm leading-6'>
              Open a dua and tap the bookmark icon to add it here for quick
              access.
            </p>
          </CardContent>
        </Card>
      ) : (
        /* Responsive full-width grid */
        <div className='grid w-full grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4'>
          {featuredDuas.map((dua) => (
            <Card
              key={`featured-dua-${dua.id}`}
              className='w-full rounded-2xl transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md'
            >
              <CardContent className='p-5'>
                {/* Title */}
                <div className='flex items-start justify-between gap-3'>
                  <div className='min-w-0'>
                    <h3 className='text-foreground text-base font-semibold'>
                      {dua.title.en}
                    </h3>

                    {dua.source?.reference && (
                      <p className='text-muted-foreground mt-1 text-xs'>
                        {dua.source.reference}
                      </p>
                    )}
                  </div>

                  {/* <Bookmark className='text-primary size-5 shrink-0' /> */}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </section>
  );
}
