import { useTheme } from '@/context/ThemeContext';
import { usePrayerTiming } from '@/hooks/use-prayer-timing';
import { getPrayerIcon } from '@/utils/prayer-time';
import { Ionicons } from '@expo/vector-icons';
import { DateTime } from 'luxon';
import { Text, View } from 'react-native';
import { CountdownDisplay } from './countdown';

export default function PrayerTimeCard() {
  const { locationData, prayerData, currentPrayerInfo, arabicDate } =
    usePrayerTiming();
  const { theme } = useTheme();

  if (!locationData || !currentPrayerInfo || !prayerData)
    return (
      <View className='h-screen items-center justify-center'>
        <Text>Logo</Text>
      </View>
    );

  const activeIconColor = theme === 'dark' ? '#241A00' : '#FFFFFF';
  const iconColor = theme === 'dark' ? '#9e9c95' : '#241A00';

  return (
    // <ImageBackground
    //   source={require('@/assets/images/prayer-banner.jpg')}
    //   resizeMode='cover'
    //   className='overflow-hidden'
    // >
    // <View className='mt-16 rounded-xl bg-primary-0/70'>
    <View className='mt-16'>
      {/* <BlurView intensity={10} tint='dark' className='px-4 py-6'> */}
      {/* <View className='px-6'> */}
      <View className='m-4 rounded-[40px] bg-white/70 dark:bg-[#064E3B66]/40'>
        <View className=''>
          {/* <View className='absolute inset-0 bg-gray-950/80' /> */}

          {/* Header */}
          <View className='px-10 pb-4 pt-10'>
            <View className='flex-row items-center justify-center gap-3'>
              <Text className='text-xl font-bold text-typography-950 dark:text-white'>
                {arabicDate}
              </Text>
              <View className='h-2 w-2 rounded-xl bg-gray-500'></View>
              <Text className='text-xl font-bold text-typography-950 dark:text-white'>
                {currentPrayerInfo.currentPrayerTime.toFormat('dd LLL')}
              </Text>
            </View>

            {/* Current Prayer */}
            <View className='mb-3 mt-6 flex-row items-center justify-between'>
              <View>
                <Text className='mb-1 text-[12px] font-semibold uppercase leading-4 text-typography-950/60 dark:text-white/60'>
                  Up Next
                </Text>
                <View className=''>
                  <Text className='mb-2 text-5xl font-extrabold text-typography-950 dark:text-white'>
                    {currentPrayerInfo.currentPrayer}
                  </Text>
                </View>
                <View className='mt-2 flex-row items-center gap-1'>
                  <CountdownDisplay
                    nextPrayerTime={currentPrayerInfo.nextPrayerTime}
                    timezone={locationData.timezone ?? ''}
                    className='text-2xl font-medium text-typography-950 dark:text-[#FED65B]'
                  />
                  <Text className='text-sm text-typography-950/60 text-white/60'>
                    Remaining
                  </Text>
                </View>
              </View>
              <View className='grid items-center'>
                <Text className='text-xl font-medium leading-8 text-typography-950 dark:text-white'>
                  {currentPrayerInfo.currentPrayerTime.toFormat('hh:mm a')}
                </Text>
                <View className='flex-row items-center gap-1'>
                  <Text className='text-sm'>{locationData.flag}</Text>
                  <Ionicons
                    name='location-outline'
                    size={14}
                    color={iconColor}
                  />
                  <Text className='text-sm font-bold text-[#735C00] dark:text-[#FED65B]'>
                    {locationData.city}
                  </Text>
                </View>
              </View>
            </View>
          </View>

          {/* Divider */}
          <View className='mb-1 h-px bg-typography-950/20' />

          {/* Daily Prayer Row */}
          <View className='mt-2 flex-row justify-between rounded-lg p-6'>
            {Object.entries(prayerData.prayerTimes).map(([key, time]) => {
              const isActive = key === currentPrayerInfo.currentPrayer;
              const timeInZone = DateTime.fromJSDate(new Date(time)).setZone(
                locationData.timezone,
              );
              return (
                <View
                  key={key}
                  className={`items-center rounded-lg px-2 py-1 ${
                    isActive ? 'bg-primary-500 dark:bg-[#FED65B]' : ''
                  }`}
                >
                  <Ionicons
                    name={getPrayerIcon(key)}
                    size={16}
                    color={isActive ? activeIconColor : iconColor}
                  />
                  <Text
                    className={`mt-0.5 text-base ${
                      isActive
                        ? 'text-white/80 dark:text-[#241A00B2]/80'
                        : 'text-typography-950/60'
                    }`}
                  >
                    {key}
                  </Text>
                  <Text
                    className={`text-sm ${
                      isActive
                        ? 'font-bold text-white dark:text-[#241A00]'
                        : 'font-bold text-typography-950/60'
                    }`}
                  >
                    {timeInZone.toFormat('hh:mm a')}
                  </Text>
                </View>
              );
            })}
          </View>
          {/* </BlurView> */}
        </View>
      </View>
    </View>
  );
}
