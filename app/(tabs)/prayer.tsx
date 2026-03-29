import AppGradient from '@/components/app-gradient';
import PrayerTime from '@/components/prayer-time/prayer-time';
import { ScrollView, View } from 'react-native';

export default function PrayerScreen() {
  return (
    <AppGradient>
      <ScrollView className='min-h-screen'>
        <View className='space-y-4'>
          <PrayerTime />
        </View>
      </ScrollView>
    </AppGradient>
  );
}
