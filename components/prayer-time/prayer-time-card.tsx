import { usePrayerTiming } from '@/hooks/use-prayer-timing';
import { getPrayerIcon } from '@/utils/prayer-time';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { DateTime } from 'luxon';
import { ImageBackground, Text, View } from 'react-native';

export default function PrayerTimeCard() {
  const { locationData, prayerData, currentPrayerInfo, timeLeft, arabicDate } =
    usePrayerTiming();

  if (!locationData || !currentPrayerInfo || !prayerData)
    return (
      <View className='h-screen items-center justify-center'>
        <Text>Logo</Text>
      </View>
    );

  return (
    <ImageBackground
      source={require('@/assets/images/mosque-banner.png')}
      resizeMode='cover'
      className='overflow-hidden bg-background-0/15'
    >
      <BlurView intensity={10} tint='dark' className='px-4 py-6'>
        <View className='absolute inset-0 bg-background-50/60' />

        {/* Header */}
        <View className='mb-3 mt-10 flex-row items-start justify-between'>
          <View>
            <Text className='text-sm font-semibold text-white'>
              {arabicDate}
            </Text>
            <Text className='text-sm font-semibold text-white'>
              {currentPrayerInfo.currentPrayerTime.toFormat('dd LLL yyyy')}
            </Text>
            <Text className='text-sm text-white/70'>
              {currentPrayerInfo.currentPrayerTime.toFormat('cccc')}
            </Text>
          </View>
          <View className='flex-row items-center gap-1'>
            <Text className='text-sm text-white'>{locationData.flag}</Text>
            <Ionicons name='location-outline' size={14} color='#fff' />
            <Text className='text-sm text-white/70'>{locationData.city}</Text>
          </View>
        </View>

        {/* Current Prayer */}
        <View className='mb-3'>
          <Text className='mb-1 text-xs uppercase text-white/70'>
            Current Prayer
          </Text>
          <Text className='text-2xl font-bold leading-tight text-white'>
            {currentPrayerInfo.currentPrayer}:{' '}
            {currentPrayerInfo.currentPrayerTime.toFormat('hh:mm a')}
          </Text>
          <Text className='text-sm text-white/50'>
            Remaining Time: {timeLeft}
          </Text>
        </View>

        {/* Divider */}
        <View className='mb-3 h-px bg-white/20' />

        {/* Daily Prayer Row */}
        <View className='flex-row justify-between'>
          {Object.entries(prayerData.prayerTimes).map(([key, time]) => {
            const isActive = key === currentPrayerInfo.currentPrayer;
            const timeInZone = DateTime.fromJSDate(new Date(time)).setZone(
              locationData.timezone,
            );
            return (
              <View
                key={key}
                className={`items-center rounded-lg px-1 py-0.5 ${
                  isActive ? 'rounded-lg bg-white/20 px-2' : ''
                }`}
              >
                <Ionicons
                  name={getPrayerIcon(key)}
                  size={14}
                  color={isActive ? '#fff' : 'rgba(255,255,255,0.7)'}
                />
                <Text
                  className={`mt-0.5 text-sm ${
                    isActive ? 'font-semibold text-white' : 'text-white/90'
                  }`}
                >
                  {key}
                </Text>
                <Text
                  className={`text-[11px] ${
                    isActive ? 'text-white' : 'text-white/90'
                  }`}
                >
                  {timeInZone.toFormat('hh:mm a')}
                </Text>
              </View>
            );
          })}
        </View>
      </BlurView>
    </ImageBackground>
  );
}
