import AppGradient from '@/components/app-gradient';
import FeaturedDuaList from '@/components/duas/featured-dua';
import PrayerTimeCard from '@/components/prayer-time/prayer-time-card';
import { useTheme } from '@/context/ThemeContext';
import { ScrollView, View } from 'react-native';

export default function HomeScreen() {
  const { theme } = useTheme();
  return (
    <AppGradient>
      <ScrollView className='min-h-screen'>
        <View className='space-y-4'>
          <PrayerTimeCard />
          <FeaturedDuaList />
        </View>
      </ScrollView>
    </AppGradient>
  );
}
