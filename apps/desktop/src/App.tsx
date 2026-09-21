import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';

import { FeaturedDuasProvider } from '@muslim-zone/react';

import { AppSidebar } from './components/app-sidebar';

import { duaStorage } from './lib/duas/dua-storage';

import { PrayerNotificationScheduler } from './components/prayer-notification-scheduler';
import { DuaDetailsPage } from './pages/dua-details-page';
import { DuasPage } from './pages/duas-page';
import { FavoritesPage } from './pages/favorites-page';
import { HomePage } from './pages/home-page';
import { PrayerTimesPage } from './pages/prayer-times-page';
import { SettingsPage } from './pages/settings-page';

export default function App() {
  return (
    <HashRouter>
      <FeaturedDuasProvider storage={duaStorage} moduleKey='daily'>
        <PrayerNotificationScheduler />
        <div className='bg-background text-foreground flex h-screen overflow-hidden'>
          <AppSidebar />

          <main className='min-w-0 flex-1 overflow-y-auto'>
            <div className='mx-auto w-full max-w-7xl p-8 lg:p-10'>
              <Routes>
                <Route path='/' element={<HomePage />} />

                <Route path='/prayer-times' element={<PrayerTimesPage />} />

                <Route path='/duas' element={<DuasPage />} />

                <Route
                  path='/duas/category/:categoryId'
                  element={<DuasPage />}
                />

                <Route path='/duas/:duaId' element={<DuaDetailsPage />} />

                <Route path='/favorites' element={<FavoritesPage />} />

                <Route path='/settings' element={<SettingsPage />} />

                <Route path='*' element={<Navigate to='/' replace />} />
              </Routes>
            </div>
          </main>
        </div>
      </FeaturedDuasProvider>
    </HashRouter>
  );
}
