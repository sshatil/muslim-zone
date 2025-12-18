import PrayerTimeCard from '@/components/prayer-time/prayer-time-card';
import WeeklyPrayerTime from '@/components/prayer-time/weekly-prayer-time';
import { View } from 'react-native';

export default function HomeScreen() {
  return (
    // <SafeAreaView>
    <View className='bg-background-100 min-h-screen'>
      <PrayerTimeCard />
      <WeeklyPrayerTime />
    </View>
    // </SafeAreaView>
  );
}
