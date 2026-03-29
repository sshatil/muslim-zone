import AppGradient from '@/components/app-gradient';
import Settings from '@/components/settings/settings';
import { ScrollView, View } from 'react-native';

export default function SettingsScreen() {
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
