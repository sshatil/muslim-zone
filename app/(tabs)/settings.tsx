import Settings from '@/components/settings/settings';
import { ScrollView, View } from 'react-native';

export default function SettingsScreen() {
  return (
    <ScrollView className='min-h-screen bg-background-50'>
      <View className='space-y-4'>
        <Settings />
      </View>
    </ScrollView>
  );
}
