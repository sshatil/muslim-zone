import { Card, CardContent } from '@muslim-zone/ui/components/card';

import { getDuasByCategory, type DuaCategory } from '@muslim-zone/core';

const MODULE_KEY = 'daily';

function getCategoryIcon(icon?: string) {
  const icons: Record<string, string> = {
    'sunny-outline': '☀️',
    'bed-outline': '🌙',
    'fast-food-outline': '🍽️',
    'water-outline': '💧',
    'home-outline': '🏠',
    'business-outline': '🕌',
    'refresh-circle-outline': '🔄',
  };

  return icons[icon ?? ''] ?? '🤲';
}

type DuaCategoryCardProps = {
  category: DuaCategory;
  onClick: () => void;
};

export function DuaCategoryCard({ category, onClick }: DuaCategoryCardProps) {
  const duas = getDuasByCategory(MODULE_KEY, category.id);

  return (
    <button
      type='button'
      onClick={onClick}
      className='group block h-full w-full text-left'
    >
      <Card className='h-full rounded-2xl transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md'>
        <CardContent className='p-6'>
          <div className='flex items-start justify-between gap-4'>
            <div className='flex size-12 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-2xl'>
              {getCategoryIcon(category.icon)}
            </div>

            <span className='text-muted-foreground text-xs font-medium'>
              {duas.length} {duas.length === 1 ? 'Dua' : 'Duas'}
            </span>
          </div>

          <h2 className='text-foreground mt-5 text-lg font-semibold transition-colors group-hover:text-emerald-600 dark:group-hover:text-emerald-400'>
            {category.name.en}
          </h2>

          {category.name.bn && (
            <p className='text-muted-foreground mt-1 text-sm'>
              {category.name.bn}
            </p>
          )}

          <div className='text-muted-foreground mt-5 text-sm'>View duas →</div>
        </CardContent>
      </Card>
    </button>
  );
}
