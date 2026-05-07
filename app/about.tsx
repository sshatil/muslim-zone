import { Ionicons } from '@expo/vector-icons';
import { Image, ScrollView, Text, View } from 'react-native';

export default function AboutScreen() {
  return (
    <ScrollView className='flex-1 px-4 pt-16'>
      {/* App header */}
      <View className='mb-6 items-center'>
        <View className='mb-3 rounded-full bg-tertiary-500/20'>
          {/* <Ionicons name='moon-outline' size={32} color='#FED65B' /> */}
          <Image
            source={require('@/assets/images/icon.png')}
            style={{ width: 100, height: 100 }}
          />
        </View>

        <Text className='text-xl font-bold text-typography-950 dark:text-white'>
          Muslim Zone
        </Text>

        <Text className='mt-1 text-center text-sm text-typography-500'>
          Your daily companion for duas, prayers, and spiritual growth.
        </Text>
      </View>

      {/* Section: About */}
      <View className='mb-6 rounded-2xl bg-background-0 p-4 dark:bg-white/5'>
        <Text className='mb-2 text-base font-semibold text-typography-950 dark:text-white'>
          About This App
        </Text>

        <Text className='text-sm leading-6 text-typography-500'>
          This app helps you access daily duas, prayer times, and Islamic
          guidance in a simple and modern way. It is designed to help you stay
          connected with your faith throughout the day.
        </Text>
      </View>

      {/* Section: Features */}
      <View className='mb-6 rounded-2xl bg-background-0 p-4 dark:bg-white/5'>
        <Text className='mb-3 text-base font-semibold text-typography-950 dark:text-white'>
          Features
        </Text>

        <View className='gap-2'>
          <FeatureItem text='Daily Duas collection' />
          <FeatureItem text='Prayer time tracking' />
          <FeatureItem text='Search and categories' />
          <FeatureItem text='Clean and modern UI' />
        </View>
      </View>

      {/* Section: Version */}
      <View className='rounded-2xl bg-background-0 p-4 dark:bg-white/5'>
        <Text className='text-center text-sm text-typography-500'>
          Version 0.1.2
        </Text>
      </View>
    </ScrollView>
  );
}

function FeatureItem({ text }: { text: string }) {
  return (
    <View className='flex-row items-center gap-2'>
      <Ionicons name='checkmark-circle' size={16} color='#22C55E' />
      <Text className='text-sm text-typography-500'>{text}</Text>
    </View>
  );
}
