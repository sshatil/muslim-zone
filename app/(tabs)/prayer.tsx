import AppGradient from '@/components/app-gradient';
import PrayerTime from '@/components/prayer-time/prayer-time';
import { useAnalytics } from '@/hooks/use-analytics';
import { ScrollView, View } from 'react-native';

export default function PrayerScreen() {
  useAnalytics('PrayerTimes');
  return (
    <AppGradient>
      <ScrollView className='min-h-screen'>
        <View className='space-y-4 pb-20'>
          <PrayerTime />
        </View>
      </ScrollView>
    </AppGradient>
  );
}
