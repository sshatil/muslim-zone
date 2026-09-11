import { Bookmark, Heart } from 'lucide-react';
import { useMemo } from 'react';

import { getDuaById, type Dua } from '@muslim-zone/core';

import { useFeaturedDuas } from '@muslim-zone/react';

import { Card, CardContent } from '@muslim-zone/ui/components/card';

import { DuaEmptyState } from '#components/duas/dua-empty-state';
import { DuaListCard } from '#components/duas/dua-list-card';

const MODULE_KEY = 'daily';

export function FavoritesPage() {
  const { featuredIds, isLoaded } = useFeaturedDuas();

  const favoriteDuas = useMemo(
    () =>
      featuredIds
        .map((id) => getDuaById(MODULE_KEY, id))
        .filter((dua): dua is Dua => dua !== undefined),
    [featuredIds],
  );

  if (!isLoaded) {
    return (
      <div className='space-y-8'>
        <header>
          <p className='text-primary text-sm font-medium'>Favorites</p>

          <h1 className='text-foreground mt-1 text-3xl font-semibold tracking-tight'>
            Saved Duas
          </h1>

          <p className='text-muted-foreground mt-2 text-sm'>
            Your bookmarked duas in one place.
          </p>
        </header>

        <div className='grid grid-cols-1 gap-4 xl:grid-cols-2'>
          {[1, 2].map((item) => (
            <Card key={item} className='rounded-2xl'>
              <CardContent className='space-y-4 p-6'>
                <div className='bg-muted h-5 w-48 animate-pulse rounded' />
                <div className='bg-muted h-24 w-full animate-pulse rounded' />
                <div className='bg-muted h-10 w-full animate-pulse rounded' />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className='mx-auto w-full max-w-[1500px] space-y-8'>
      <header className='space-y-4'>
        <div className='flex items-start gap-4'>
          <div className='bg-primary/10 text-primary flex size-12 shrink-0 items-center justify-center rounded-xl'>
            <Heart className='size-5' />
          </div>

          <div>
            <p className='text-primary text-sm font-medium'>Favorites</p>

            <h1 className='text-foreground mt-1 text-3xl font-semibold tracking-tight'>
              Saved Duas
            </h1>

            <p className='text-muted-foreground mt-2 text-sm leading-6'>
              Keep your most useful duas here for quick access.
            </p>
          </div>
        </div>
      </header>

      {favoriteDuas.length === 0 ? (
        <DuaEmptyState
          title='No saved duas yet'
          description='Open a dua and tap Save Dua to add it to your favorites.'
        />
      ) : (
        <section className='space-y-5'>
          <div className='flex items-end justify-between gap-4'>
            <div>
              <h2 className='text-xl font-semibold'>Your Favorites</h2>

              <p className='text-muted-foreground mt-1 text-sm'>
                {favoriteDuas.length}{' '}
                {favoriteDuas.length === 1 ? 'dua' : 'duas'} saved
              </p>
            </div>

            <div className='text-muted-foreground flex items-center gap-2 text-sm'>
              <Bookmark className='size-4' />
              Saved
            </div>
          </div>

          <div className='grid gap-4'>
            {favoriteDuas.map((dua) => (
              <DuaListCard key={dua.id} dua={dua} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
