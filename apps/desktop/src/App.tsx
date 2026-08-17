import { Badge } from '@muslim-zone/ui/components/badge';
import { Button } from '@muslim-zone/ui/components/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@muslim-zone/ui/components/card';
import { Input } from '@muslim-zone/ui/components/input';
import { Separator } from '@muslim-zone/ui/components/separator';
import { Switch } from '@muslim-zone/ui/components/switch';

export default function App() {
  return (
    <main className='bg-muslim-bg text-muslim-text min-h-screen p-10'>
      <div className='mx-auto max-w-3xl space-y-6'>
        <div>
          <Badge variant='secondary'>Muslim Zone</Badge>

          <h1 className='mt-3 text-3xl font-semibold'>Shared UI system</h1>

          <p className='text-muslim-muted mt-2'>
            Tauri + Tailwind + shadcn + packages/ui
          </p>
        </div>

        <Separator />

        <Card className='border-muslim-border bg-muslim-surface'>
          <CardHeader>
            <CardTitle>Desktop UI foundation</CardTitle>

            <CardDescription>
              These components come from @muslim-zone/ui.
            </CardDescription>
          </CardHeader>

          <CardContent className='space-y-5'>
            <Input placeholder='Search duas...' />

            <div className='flex items-center justify-between'>
              <div>
                <p className='font-medium'>Prayer notifications</p>

                <p className='text-muslim-muted text-sm'>
                  Notify me at prayer time
                </p>
              </div>

              <Switch />
            </div>

            <Button>Save settings</Button>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
