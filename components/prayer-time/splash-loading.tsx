import { useTheme } from '@/context/ThemeContext';
import { LinearGradient } from 'expo-linear-gradient';
import { Image, Text, View } from 'react-native';

export default function SplashLoading() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <LinearGradient
      colors={isDark ? ['#021A14', '#00110D'] : ['#FBF9F5', '#F5F1E8']}
      style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
    >
      <View style={{ alignItems: 'center' }}>
        {/* Logo */}
        <View
          style={{
            marginBottom: 16,
            borderRadius: 999,
            backgroundColor: isDark
              ? 'rgba(254,214,91,0.15)'
              : 'rgba(0,53,39,0.08)',
          }}
        >
          <Image
            source={require('@/assets/images/icon.png')}
            style={{ width: 200, height: 200 }}
            resizeMode='contain'
          />
        </View>

        <Text
          style={{
            fontSize: 20,
            fontWeight: '700',
            color: isDark ? '#FFFFFF' : '#003527',
          }}
        >
          Muslim Zone
        </Text>
      </View>
    </LinearGradient>
  );
}
