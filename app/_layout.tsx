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
import { StatusBar } from 'expo-status-bar';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  return (
    <ThemeProvider>
      <MainLayout />
    </ThemeProvider>
  );
}

function MainLayout() {
  const colorScheme = useColorScheme();

  return (
    <QueryClientProvider>
      <GluestackUIProvider mode={colorScheme ?? 'light'}>
        <NavThemeProvider
          value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
        >
          <Stack>
            <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
            {/* <Stack.Screen
            name='modal'
            options={{ presentation: 'modal', title: 'Modal' }}
          /> */}
          </Stack>
          <StatusBar style='auto' />
        </NavThemeProvider>
      </GluestackUIProvider>
    </QueryClientProvider>
  );
}
