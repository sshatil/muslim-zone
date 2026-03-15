import { ThemeProvider } from '@/context/ThemeContext';
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider as NavThemeProvider,
} from '@react-navigation/native';
import { Stack } from 'expo-router';
import 'react-native-reanimated';

import { QueryClientProvider } from '@/components/query-client';
import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
import '@/global.css';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useLocation } from '@/hooks/use-location';
import { ensurePrayerNotificationsScheduled } from '@/utils/notifications';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useRef } from 'react';
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
  const colorScheme = useColorScheme();
  const { data: locationData } = useLocation();
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

  return (
    <GluestackUIProvider mode={colorScheme ?? 'light'}>
      <NavThemeProvider
        value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
      >
        <Stack>
          <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
        </Stack>
        <StatusBar style='auto' />
      </NavThemeProvider>
    </GluestackUIProvider>
  );
}
