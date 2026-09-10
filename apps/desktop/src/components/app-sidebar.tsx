import { BookOpenText, Clock3, Heart, Home, Settings } from 'lucide-react';
import { NavLink } from 'react-router-dom';

import { Button } from '@muslim-zone/ui/components/button';
import { ThemeToggle } from '@muslim-zone/ui/components/theme-toggle';
import { cn } from '@muslim-zone/ui/lib/utils';

const navigationItems = [
  {
    to: '/',
    label: 'Home',
    icon: Home,
    end: true,
  },
  {
    to: '/prayer-times',
    label: 'Prayer Times',
    icon: Clock3,
    end: true,
  },
  {
    to: '/duas',
    label: 'Duas',
    icon: BookOpenText,
    end: false,
  },
  {
    to: '/favorites',
    label: 'Favorites',
    icon: Heart,
    end: true,
  },
];

export function AppSidebar() {
  return (
    <aside className='border-sidebar-border bg-sidebar text-sidebar-foreground flex h-screen w-64 shrink-0 flex-col border-r'>
      {/* Logo / Brand */}
      <div className='border-sidebar-border flex h-20 items-center border-b px-5'>
        <NavLink
          to='/'
          className='flex items-center gap-3'
          aria-label='Muslim Zone home'
        >
          <div className='bg-sidebar-primary text-sidebar-primary-foreground flex size-10 items-center justify-center rounded-xl'>
            <span className='text-lg font-semibold'>M</span>
          </div>

          <div>
            <p className='font-semibold leading-none'>Muslim Zone</p>

            <p className='text-muted-foreground mt-1 text-xs'>
              Prayer & spiritual companion
            </p>
          </div>
        </NavLink>
      </div>

      {/* Main Navigation */}
      <nav className='flex-1 space-y-1 p-3'>
        {navigationItems.map(({ to, label, icon: Icon, end }) => (
          <NavLink key={to} to={to} end={end} className='block'>
            {({ isActive }) => (
              <Button
                type='button'
                variant='ghost'
                className={cn(
                  'h-11 w-full justify-start gap-3 px-3',
                  isActive &&
                    'bg-sidebar-accent text-sidebar-accent-foreground',
                )}
              >
                <Icon className='size-4' />
                <span>{label}</span>
              </Button>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Bottom Section */}
      <div className='border-sidebar-border border-t p-3'>
        <NavLink to='/settings' className='block'>
          {({ isActive }) => (
            <Button
              type='button'
              variant='ghost'
              className={cn(
                'h-11 w-full justify-start gap-3 px-3',
                isActive && 'bg-sidebar-accent text-sidebar-accent-foreground',
              )}
            >
              <Settings className='size-4' />

              <span className='flex-1 text-left'>Settings</span>
            </Button>
          )}
        </NavLink>

        <div className='mt-2 flex items-center justify-between rounded-lg px-3 py-2'>
          <span className='text-muted-foreground text-xs'>Appearance</span>

          <ThemeToggle />
        </div>
      </div>
    </aside>
  );
}
