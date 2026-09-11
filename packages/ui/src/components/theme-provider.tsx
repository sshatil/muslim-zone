import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

export type Theme = 'light' | 'dark' | 'system';

export type ResolvedTheme = Exclude<Theme, 'system'>;

type ThemeProviderProps = {
  children: ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

type ThemeContextValue = {
  theme: Theme;
  resolvedTheme: ResolvedTheme;
  setTheme: (theme: Theme) => void;
};

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

function isTheme(value: string | null): value is Theme {
  return value === 'light' || value === 'dark' || value === 'system';
}

function getSystemTheme(): ResolvedTheme {
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
}

export function ThemeProvider({
  children,
  defaultTheme = 'system',
  storageKey = 'muslim-zone-theme',
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window === 'undefined') {
      return defaultTheme;
    }

    try {
      const storedTheme = window.localStorage.getItem(storageKey);

      return isTheme(storedTheme) ? storedTheme : defaultTheme;
    } catch {
      return defaultTheme;
    }
  });

  const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme>(() => {
    if (typeof window === 'undefined') {
      return defaultTheme === 'dark' ? 'dark' : 'light';
    }

    return theme === 'system' ? getSystemTheme() : theme;
  });

  useEffect(() => {
    const root = window.document.documentElement;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const applyTheme = () => {
      const nextResolvedTheme: ResolvedTheme =
        theme === 'system' ? (mediaQuery.matches ? 'dark' : 'light') : theme;

      root.classList.remove('light', 'dark');

      root.classList.add(nextResolvedTheme);

      root.style.colorScheme = nextResolvedTheme;

      setResolvedTheme(nextResolvedTheme);
    };

    applyTheme();

    if (theme !== 'system') {
      return;
    }

    mediaQuery.addEventListener('change', applyTheme);

    return () => {
      mediaQuery.removeEventListener('change', applyTheme);
    };
  }, [theme]);

  const value = useMemo<ThemeContextValue>(
    () => ({
      theme,
      resolvedTheme,

      setTheme: (nextTheme) => {
        try {
          window.localStorage.setItem(storageKey, nextTheme);
        } catch {
          // Theme still works for the current session
          // if storage is unavailable.
        }

        setThemeState(nextTheme);
      },
    }),
    [resolvedTheme, storageKey, theme],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }

  return context;
}
