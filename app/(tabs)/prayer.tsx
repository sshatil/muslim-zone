import PrayerTime from '@/components/prayer-time/prayer-time';
import { ScrollView, View } from 'react-native';

export default function PrayerScreen() {
  return (
    <ScrollView className='bg-background-50 min-h-screen'>
      <View className='space-y-4'>
        <PrayerTime />
      </View>
    </ScrollView>
  );
}
