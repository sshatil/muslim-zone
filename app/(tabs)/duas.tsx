import AppGradient from '@/components/app-gradient';
import Category from '@/components/duas/category';
import { ScrollView, View } from 'react-native';

export default function DuasScreen() {
  return (
    <AppGradient>
      <ScrollView className='min-h-screen'>
        <View className='space-y-4'>
          <Category />
        </View>
      </ScrollView>
    </AppGradient>
  );
}
