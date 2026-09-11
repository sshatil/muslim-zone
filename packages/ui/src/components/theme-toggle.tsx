import { Monitor, Moon, Sun } from 'lucide-react';

import { Button } from '#components/button';
import { type Theme, useTheme } from '#components/theme-provider';

const NEXT_THEME: Record<Theme, Theme> = {
  light: 'dark',
  dark: 'system',
  system: 'light',
};

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const Icon = theme === 'light' ? Sun : theme === 'dark' ? Moon : Monitor;

  const nextTheme = NEXT_THEME[theme];

  return (
    <Button
      type='button'
      variant='ghost'
      size='icon'
      onClick={() => setTheme(nextTheme)}
      aria-label={`Theme: ${theme}. Switch to ${nextTheme}.`}
      title={`Theme: ${theme}`}
    >
      <Icon className='size-4' />
    </Button>
  );
}
