import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';
import { useColorScheme as useDeviceColorScheme } from 'react-native';

type Theme = 'light' | 'dark' | 'system';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  colorScheme: 'light' | 'dark';
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const deviceColorScheme = useDeviceColorScheme();
  const [theme, setTheme] = useState<Theme>('system');
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Load saved theme
    AsyncStorage.getItem('user-theme').then((savedTheme) => {
      if (savedTheme && ['light', 'dark', 'system'].includes(savedTheme)) {
        setTheme(savedTheme as Theme);
      }
      setIsReady(true);
    });
  }, []);

  const updateTheme = async (newTheme: Theme) => {
    setTheme(newTheme);
    await AsyncStorage.setItem('user-theme', newTheme);
  };

  const colorScheme =
    theme === 'system' ? (deviceColorScheme ?? 'light') : theme;

  if (!isReady) {
    return null; // Or a splash screen
  }

  return (
    <ThemeContext.Provider
      value={{ theme, setTheme: updateTheme, colorScheme }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
