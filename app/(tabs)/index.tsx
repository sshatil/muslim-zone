import FeaturedDuaList from '@/components/duas/featured-dua';
import PrayerTimeCard from '@/components/prayer-time/prayer-time-card';
import { ScrollView, View } from 'react-native';

export default function HomeScreen() {
  return (
    <ScrollView className='min-h-screen'>
      <View className='space-y-4'>
        <PrayerTimeCard />
        {/* <WeeklyPrayerTime /> */}
        <FeaturedDuaList />
      </View>
    </ScrollView>
  );
}
