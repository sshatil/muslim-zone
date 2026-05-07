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
import {
  crashLog,
  recordError,
  setCrashlyticsCollectionEnabled,
} from '@/lib/firebase';
import { ensurePrayerNotificationsScheduled } from '@/utils/notifications';
import { StatusBar } from 'expo-status-bar';
import { Component, type ReactNode, useEffect, useRef } from 'react';
import { AppState, AppStateStatus, Text, View } from 'react-native';

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class FirebaseErrorBoundary extends Component<
  { children: ReactNode },
  ErrorBoundaryState
> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: { componentStack: string }) {
    crashLog(`Component stack: ${info.componentStack}`);
    recordError(error, 'UnhandledJSError');
  }

  render() {
    if (this.state.hasError) {
      return (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            padding: 24,
          }}
        >
          <Text style={{ fontSize: 18, fontWeight: '600', marginBottom: 8 }}>
            Something went wrong
          </Text>

          <Text style={{ color: '#888', textAlign: 'center' }}>
            {this.state.error?.message ?? 'An unexpected error occurred.'}
          </Text>
        </View>
      );
    }

    return this.props.children;
  }
}

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  useEffect(() => {
    setCrashlyticsCollectionEnabled(true);
  }, []);

  return (
    <FirebaseErrorBoundary>
      <ThemeProvider>
        <QueryClientProvider>
          <MainLayout />
        </QueryClientProvider>
      </ThemeProvider>
    </FirebaseErrorBoundary>
  );
}

function MainLayout() {
  const { colorScheme } = useTheme();

  const { locationData, prayerData, currentPrayerInfo, refreshPrayerDateKey } =
    usePrayerTiming();

  const appState = useRef<AppStateStatus>(AppState.currentState);

  useEffect(() => {
    if (!locationData?.latitude || !locationData?.longitude) return;

    const lat = locationData.latitude;
    const lon = locationData.longitude;

    ensurePrayerNotificationsScheduled(lat, lon).catch((error) => {
      recordError(error, 'EnsurePrayerNotificationsScheduled');
    });

    const subscription = AppState.addEventListener(
      'change',
      (nextState: AppStateStatus) => {
        if (
          appState.current.match(/inactive|background/) &&
          nextState === 'active'
        ) {
          refreshPrayerDateKey();

          ensurePrayerNotificationsScheduled(lat, lon).catch((error) => {
            recordError(error, 'EnsurePrayerNotificationsScheduledOnResume');
          });
        }

        appState.current = nextState;
      },
    );

    return () => subscription.remove();
  }, [locationData?.latitude, locationData?.longitude, refreshPrayerDateKey]);

  // console.log('locationData', locationData);
  // console.log('prayerData', prayerData);
  // console.log('currentPrayerInfo', currentPrayerInfo);

  // const isAppReady = Boolean(locationData && prayerData);
  const isAppReady = Boolean(locationData && prayerData && currentPrayerInfo);

  if (!isAppReady) {
    return <SplashLoading />;
  }

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
