import { Search } from 'lucide-react';

import { Button } from '@muslim-zone/ui/components/button';
import { Input } from '@muslim-zone/ui/components/input';

type DuaSearchProps = {
  value: string;
  onChange: (value: string) => void;
};

export function DuaSearch({ value, onChange }: DuaSearchProps) {
  return (
    <div className='relative w-full max-w-2xl'>
      <Search className='text-muted-foreground pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2' />

      <Input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder='Search duas, categories, tags...'
        className='h-11 rounded-xl pl-10 pr-10'
      />

      {value && (
        <Button
          type='button'
          variant='ghost'
          size='icon-sm'
          onClick={() => onChange('')}
          className='absolute right-1 top-1/2 -translate-y-1/2'
          aria-label='Clear search'
        >
          ×
        </Button>
      )}
    </div>
  );
}
