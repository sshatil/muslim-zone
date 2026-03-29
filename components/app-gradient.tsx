import { useTheme } from '@/context/ThemeContext';
import { LinearGradient } from 'expo-linear-gradient';
import { ReactNode } from 'react';

export default function AppGradient({ children }: { children: ReactNode }) {
  const { theme } = useTheme();

  const isDark = theme === 'dark';

  return (
    <LinearGradient
      colors={
        isDark
          ? ['#021A14', 'rgba(2, 26, 20, 0)']
          : ['#FBF9F5', 'rgba(251, 249, 245, 0)']
      }
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={{ flex: 1 }}
    >
      {children}
    </LinearGradient>
  );
}
