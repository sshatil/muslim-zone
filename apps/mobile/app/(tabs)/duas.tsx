import AppGradient from '@/components/app-gradient';
import Category from '@/components/duas/category';
import { useAnalytics } from '@/hooks/use-analytics';
import { ScrollView, View } from 'react-native';

export default function DuasScreen() {
  useAnalytics('Duas');
  return (
    <AppGradient>
      <ScrollView className='min-h-screen'>
        <View className='space-y-4 pb-28'>
          <Category />
        </View>
      </ScrollView>
    </AppGradient>
  );
}
