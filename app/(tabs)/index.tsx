import PrayerTimeCard from '@/components/prayer-time/prayer-time-card';
import WeeklyPrayerTime from '@/components/prayer-time/weekly-prayer-time';
import { Card } from '@/components/ui/card';
import { Text, View } from 'react-native';

export default function HomeScreen() {
  return (
    <View className='bg-background-100 min-h-screen'>
      <PrayerTimeCard />
      <WeeklyPrayerTime />
      <Card className='bg-background-50'>
        <Text>Dua</Text>
      </Card>
    </View>
  );
}
