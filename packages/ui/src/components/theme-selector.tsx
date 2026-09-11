import { Monitor, Moon, Sun } from 'lucide-react';

import { Button } from '#components/button';
import { type Theme, useTheme } from '#components/theme-provider';

type ThemeOption = {
  value: Theme;
  label: string;
  icon: typeof Sun;
};

const THEME_OPTIONS: ThemeOption[] = [
  {
    value: 'light',
    label: 'Light',
    icon: Sun,
  },
  {
    value: 'dark',
    label: 'Dark',
    icon: Moon,
  },
  {
    value: 'system',
    label: 'System',
    icon: Monitor,
  },
];

type ThemeSelectorProps = {
  className?: string;
};

export function ThemeSelector({ className }: ThemeSelectorProps) {
  const { theme, setTheme } = useTheme();

  return (
    <div className={className} role='radiogroup' aria-label='Appearance'>
      <div className='grid grid-cols-3 gap-2'>
        {THEME_OPTIONS.map(({ value, label, icon: Icon }) => {
          const selected = theme === value;

          return (
            <Button
              key={value}
              type='button'
              variant={selected ? 'default' : 'outline'}
              role='radio'
              aria-checked={selected}
              onClick={() => setTheme(value)}
              className='h-auto flex-col gap-2 py-4'
            >
              <Icon className='size-5' />

              <span>{label}</span>
            </Button>
          );
        })}
      </div>
    </div>
  );
}
