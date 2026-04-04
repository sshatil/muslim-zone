import { ThemeProvider, useTheme } from '@/context/ThemeContext';
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider as NavThemeProvider,
} from '@react-navigation/native';
import { Stack } from 'expo-router';
import 'react-native-reanimated';

import SplashLoading from '@/components/prayer-time/splash-loading';
import { QueryClientProvider } from '@/components/query-client';
import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
import '@/global.css';
import { usePrayerTiming } from '@/hooks/use-prayer-timing';
import { ensurePrayerNotificationsScheduled } from '@/utils/notifications';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useRef, useState } from 'react';
import { AppState, AppStateStatus } from 'react-native';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  return (
    <ThemeProvider>
      <QueryClientProvider>
        <MainLayout />
      </QueryClientProvider>
    </ThemeProvider>
  );
}

function MainLayout() {
  const { theme } = useTheme();
  const { locationData, prayerData, currentPrayerInfo } = usePrayerTiming();
  const appState = useRef<AppStateStatus>(AppState.currentState);

  useEffect(() => {
    if (!locationData?.latitude || !locationData?.longitude) return;

    const lat = locationData.latitude;
    const lon = locationData.longitude;

    ensurePrayerNotificationsScheduled(lat, lon);

    const subscription = AppState.addEventListener(
      'change',
      (nextState: AppStateStatus) => {
        if (
          appState.current.match(/inactive|background/) &&
          nextState === 'active'
        ) {
          ensurePrayerNotificationsScheduled(lat, lon);
        }
        appState.current = nextState;
      },
    );

    return () => subscription.remove();
  }, [locationData?.latitude, locationData?.longitude]);

  const [isAppReady, setIsAppReady] = useState(false);

  useEffect(() => {
    if (locationData && prayerData && currentPrayerInfo) {
      // Small delay prevents flickering if data arrives instantly
      setIsAppReady(true);
    }
  }, [locationData, prayerData, currentPrayerInfo]);

  if (!isAppReady) {
    return <SplashLoading />;
  }

  return (
    <GluestackUIProvider mode={theme ?? 'light'}>
      <NavThemeProvider value={theme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
        </Stack>
        <StatusBar style='auto' />
      </NavThemeProvider>
    </GluestackUIProvider>
  );
}
