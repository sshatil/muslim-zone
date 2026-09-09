import { BookmarkCheck } from 'lucide-react';

import type { Dua } from '@muslim-zone/core';
import { useFeaturedDuas } from '@muslim-zone/react';

import { Card, CardContent } from '@muslim-zone/ui/components/card';

type DuaListCardProps = {
  dua: Dua;
  onClick: () => void;
};

export function DuaListCard({ dua, onClick }: DuaListCardProps) {
  const { isFavourited } = useFeaturedDuas();

  const bookmarked = isFavourited(dua.id);

  return (
    <button
      type='button'
      onClick={onClick}
      className='group block w-full text-left'
    >
      <Card className='rounded-2xl transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md'>
        <CardContent className='p-6'>
          <div className='flex items-start justify-between gap-6'>
            <div className='min-w-0 flex-1'>
              <div className='flex items-center gap-3'>
                <h2 className='text-foreground text-lg font-semibold group-hover:text-emerald-600 dark:group-hover:text-emerald-400'>
                  {dua.title.en}
                </h2>

                {bookmarked && (
                  <BookmarkCheck className='size-4 shrink-0 text-emerald-500' />
                )}
              </div>

              {dua.tags && dua.tags.length > 0 && (
                <div className='mt-2 flex flex-wrap gap-2'>
                  {dua.tags.slice(0, 4).map((tag) => (
                    <span
                      key={tag}
                      className='bg-muted text-muted-foreground rounded-full px-2.5 py-1 text-xs'
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <span className='text-muted-foreground shrink-0 text-sm'>
              View →
            </span>
          </div>

          <p
            dir='rtl'
            lang='ar'
            className='text-foreground mt-6 text-right text-xl font-medium leading-[2]'
          >
            {dua.arabic}
          </p>

          <p className='text-muted-foreground mt-5 line-clamp-2 text-sm leading-6'>
            {dua.translation.en}
          </p>
        </CardContent>
      </Card>
    </button>
  );
}
