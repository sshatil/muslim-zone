import FeaturedDuaList from '@/components/duas/featured-dua';
import PrayerTimeCard from '@/components/prayer-time/prayer-time-card';
import { useTheme } from '@/context/ThemeContext';
import { LinearGradient } from 'expo-linear-gradient';
import { ScrollView, View } from 'react-native';

export default function HomeScreen() {
  const { theme } = useTheme();
  return (
    <LinearGradient
      colors={
        theme === 'dark'
          ? ['#021A14', 'rgba(2, 26, 20, 0)'] // dark
          : ['#FBF9F5', 'rgba(251, 249, 245, 0)'] // light
      }
      start={{ x: 0, y: 0 }} // top
      end={{ x: 0, y: 1 }} // bottom
      style={{ flex: 1 }}
    >
      <ScrollView className='min-h-screen'>
        <View className='space-y-4'>
          <PrayerTimeCard />
          <FeaturedDuaList />
        </View>
      </ScrollView>
    </LinearGradient>
  );
}
