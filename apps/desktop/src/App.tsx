import { FeaturedDuasProvider } from '@muslim-zone/react';
import { useState } from 'react';

import { AppSidebar } from './components/app-sidebar';
import { duaStorage } from './lib/duas/dua-storage';
import { DuasPage } from './pages/duas-page';
import { HomePage } from './pages/home-page';
import { PrayerTimesPage } from './pages/prayer-times-page';
import { SettingsPage } from './pages/settings-page';
import type { AppPage } from './types/navigation';

function renderPage(page: AppPage) {
  switch (page) {
    case 'home':
      return <HomePage />;
    case 'prayer-times':
      return <PrayerTimesPage />;
    case 'duas':
      return <DuasPage />;
    case 'favorites':
      return <div>Favorites</div>;
    case 'settings':
      return <SettingsPage />;
    default:
      return <HomePage />;
  }
}

export default function App() {
  const [activePage, setActivePage] = useState<AppPage>('home');

  return (
    <FeaturedDuasProvider storage={duaStorage} moduleKey='daily'>
      <div className='bg-background text-foreground flex h-screen overflow-hidden'>
        <AppSidebar activePage={activePage} onPageChange={setActivePage} />

        <main className='min-w-0 flex-1 overflow-y-auto'>
          <div className='mx-auto w-full max-w-7xl p-8 lg:p-10'>
            {renderPage(activePage)}
          </div>
        </main>
      </div>
    </FeaturedDuasProvider>
  );
}
