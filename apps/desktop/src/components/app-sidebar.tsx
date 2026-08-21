import { BookOpenText, Clock3, Heart, Home, Settings } from 'lucide-react';

import { Button } from '@muslim-zone/ui/components/button';
import { ThemeToggle } from '@muslim-zone/ui/components/theme-toggle';
import { cn } from '@muslim-zone/ui/lib/utils';

import type { AppPage } from '../types/navigation';

type AppSidebarProps = {
  activePage: AppPage;
  onPageChange: (page: AppPage) => void;
};

const navigationItems = [
  {
    value: 'home',
    label: 'Home',
    icon: Home,
  },
  {
    value: 'prayer-times',
    label: 'Prayer Times',
    icon: Clock3,
  },
  {
    value: 'duas',
    label: 'Duas',
    icon: BookOpenText,
  },
  {
    value: 'favorites',
    label: 'Favorites',
    icon: Heart,
  },
] satisfies {
  value: AppPage;
  label: string;
  icon: typeof Home;
}[];

export function AppSidebar({ activePage, onPageChange }: AppSidebarProps) {
  return (
    <aside className='border-sidebar-border bg-sidebar text-sidebar-foreground flex h-screen w-64 shrink-0 flex-col border-r'>
      <div className='border-sidebar-border flex h-20 items-center border-b px-5'>
        <div className='flex items-center gap-3'>
          <div className='bg-sidebar-primary text-sidebar-primary-foreground flex size-10 items-center justify-center rounded-xl'>
            <span className='text-lg font-semibold'>M</span>
          </div>

          <div>
            <p className='font-semibold leading-none'>Muslim Zone</p>

            <p className='text-muted-foreground mt-1 text-xs'>
              Prayer & spiritual companion
            </p>
          </div>
        </div>
      </div>

      <nav className='flex-1 space-y-1 p-3'>
        {navigationItems.map(({ value, label, icon: Icon }) => {
          const active = activePage === value;

          return (
            <Button
              key={value}
              type='button'
              variant='ghost'
              onClick={() => onPageChange(value)}
              className={cn(
                'h-11 w-full justify-start gap-3 px-3',
                active && 'bg-sidebar-accent text-sidebar-accent-foreground',
              )}
            >
              <Icon className='size-4' />

              <span>{label}</span>
            </Button>
          );
        })}
      </nav>

      <div className='border-sidebar-border border-t p-3'>
        <Button
          type='button'
          variant='ghost'
          onClick={() => onPageChange('settings')}
          className={cn(
            'h-11 w-full justify-start gap-3 px-3',
            activePage === 'settings' &&
              'bg-sidebar-accent text-sidebar-accent-foreground',
          )}
        >
          <Settings className='size-4' />

          <span className='flex-1 text-left'>Settings</span>
        </Button>

        <div className='mt-2 flex items-center justify-between rounded-lg px-3 py-2'>
          <span className='text-muted-foreground text-xs'>Appearance</span>

          <ThemeToggle />
        </div>
      </div>
    </aside>
  );
}
