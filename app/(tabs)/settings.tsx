import AppGradient from '@/components/app-gradient';
import Settings from '@/components/settings/settings';
import { useAnalytics } from '@/hooks/use-analytics';
import { ScrollView, View } from 'react-native';

export default function SettingsScreen() {
  useAnalytics('Settings');
  return (
    <AppGradient>
      <ScrollView className='min-h-screen'>
        <View className='space-y-4'>
          <Settings />
        </View>
      </ScrollView>
    </AppGradient>
  );
}
