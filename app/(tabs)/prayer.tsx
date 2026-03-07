import PrayerTime from '@/components/prayer-time/prayer-time';
import { ScrollView, View } from 'react-native';

export default function PrayerScreen() {
  return (
    <ScrollView className='min-h-screen bg-background-50'>
      <View className='space-y-4'>
        <PrayerTime />
      </View>
    </ScrollView>
  );
}
