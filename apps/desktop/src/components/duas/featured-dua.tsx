import { ArrowRight, Bookmark, BookmarkCheck } from 'lucide-react';

import { getFeaturedDuasByIds } from '@muslim-zone/core';
import { useFeaturedDuas } from '@muslim-zone/react';
import { Link } from 'react-router-dom';

import { Card, CardContent } from '@muslim-zone/ui/components/card';

export function FeaturedDua() {
  const { featuredIds, isLoaded } = useFeaturedDuas();

  const featuredDuas = getFeaturedDuasByIds('daily', featuredIds);

  if (!isLoaded) {
    return null;
  }

  return (
    <section className='w-full space-y-5'>
      <div className='flex w-full items-end justify-between gap-4'>
        <div>
          <h2 className='text-2xl font-semibold tracking-tight'>Useful Duas</h2>

          <p className='text-muted-foreground mt-1 text-sm'>
            Your bookmarked duas for quick access
          </p>
        </div>

        <Link
          to='/duas'
          className='text-primary flex shrink-0 items-center gap-1.5 text-sm font-semibold hover:opacity-75'
        >
          View more
          <ArrowRight className='size-4' />
        </Link>
      </div>

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
        <div className='grid w-full grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4'>
          {featuredDuas.map((dua) => (
            <Link
              key={`featured-dua-${dua.id}`}
              to={`/duas/${dua.id}`}
              className='group block h-full w-full text-left'
            >
              <Card className='h-full rounded-2xl transition-all duration-200 group-hover:-translate-y-0.5 group-hover:shadow-md'>
                <CardContent className='p-5'>
                  <div className='flex items-start justify-between gap-3'>
                    <div className='min-w-0 flex-1'>
                      <h3 className='text-foreground text-base font-semibold group-hover:text-emerald-600 dark:group-hover:text-emerald-400'>
                        {dua.title.en}
                      </h3>

                      {dua.source?.reference && (
                        <p className='text-muted-foreground mt-1 text-xs'>
                          {dua.source.reference}
                        </p>
                      )}
                    </div>

                    {featuredIds.includes(dua.id) && (
                      <BookmarkCheck className='text-primary size-5 shrink-0' />
                    )}
                  </div>

                  {/* <p
                    dir='rtl'
                    lang='ar'
                    className='text-foreground mt-5 line-clamp-3 text-right text-xl font-medium leading-[2]'
                  >
                    {dua.arabic}
                  </p>

                  <p className='text-muted-foreground mt-4 line-clamp-2 text-sm leading-6'>
                    {dua.translation.en}
                  </p>

                  <div className='text-primary mt-5 flex items-center gap-1 text-sm font-medium'>
                    View dua
                    <ArrowRight className='size-4 transition-transform group-hover:translate-x-0.5' />
                  </div> */}
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
