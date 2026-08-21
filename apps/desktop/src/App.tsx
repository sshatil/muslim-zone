import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@muslim-zone/ui/components/card';

import { ThemeSelector } from '@muslim-zone/ui/components/theme-selector';

import { ThemeToggle } from '@muslim-zone/ui/components/theme-toggle';

import { useTheme } from '@muslim-zone/ui/components/theme-provider';

export default function App() {
  const { theme, resolvedTheme } = useTheme();

  return (
    <main className='bg-background text-foreground min-h-screen p-10 transition-colors'>
      <div className='mx-auto max-w-3xl'>
        <header className='mb-8 flex items-start justify-between'>
          <div>
            <p className='text-primary text-sm font-medium'>Muslim Zone</p>

            <h1 className='mt-1 text-3xl font-semibold tracking-tight'>
              Appearance
            </h1>

            <p className='text-muted-foreground mt-2'>
              Customize how Muslim Zone looks on this device.
            </p>
          </div>

          <ThemeToggle />
        </header>

        <Card>
          <CardHeader>
            <CardTitle>Theme</CardTitle>

            <CardDescription>
              Choose Light, Dark, or follow your system appearance.
            </CardDescription>
          </CardHeader>

          <CardContent className='space-y-6'>
            <ThemeSelector />

            <div className='bg-muted/40 rounded-lg border p-4 text-sm'>
              <div className='flex justify-between gap-6'>
                <span className='text-muted-foreground'>Preference</span>

                <span className='font-medium capitalize'>{theme}</span>
              </div>

              <div className='mt-2 flex justify-between gap-6'>
                <span className='text-muted-foreground'>
                  Current appearance
                </span>

                <span className='font-medium capitalize'>{resolvedTheme}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
