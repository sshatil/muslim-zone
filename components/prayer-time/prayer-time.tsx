import { usePrayerTiming } from '@/hooks/use-prayer-timing';
import { getPrayerIcon } from '@/utils/prayer-time';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { DateTime } from 'luxon';
import { ScrollView, Text, View } from 'react-native';
import { Progress, ProgressFilledTrack } from '../ui/progress';
import { CountdownDisplay } from './countdown';

export default function PrayerTime() {
  const { locationData, prayerData, currentPrayerInfo, arabicDate } =
    usePrayerTiming();

  if (!locationData || !currentPrayerInfo || !prayerData) {
    return (
      <View className='flex-1 items-center justify-center bg-background-950'>
        <Text className='text-white'>Loading...</Text>
      </View>
    );
  }

  return (
    <View className='h-screen'>
      <View className='flex-1 bg-gradient-to-bl'>
        <View className='absolute inset-0' />

        <ScrollView
          className='flex-1 px-6 pb-6 pt-16'
          showsVerticalScrollIndicator={false}
        >
          {/* Header section */}
          <View className='mb-10 mt-6 items-center'>
            <Text className='mb-2 text-[14px] font-bold uppercase tracking-widest text-typography-950/90'>
              {locationData.city}, {locationData.country}
            </Text>
            <Text className='mb-1 text-4xl font-bold text-typography-950'>
              {currentPrayerInfo.currentPrayerTime.toFormat('cccc, dd LLL')}
            </Text>
            <Text className='text-lg font-medium text-typography-950/90'>
              {arabicDate}
            </Text>
          </View>

          {/* Hero timer section */}
          <View>
            <View className='flex-row items-end justify-between'>
              <View>
                <Text className='text-[12px] font-semibold uppercase leading-4 text-typography-950/60 dark:text-white/60'>
                  Up Next
                </Text>
                <Text className='text-[60px] font-extrabold text-[#003527] dark:text-[#B0F0D6]'>
                  {currentPrayerInfo.nextPrayerName}
                </Text>
              </View>
              <View className='mt-2 flex-row items-center gap-1'>
                <Text className='text-[36px] font-medium text-typography-950'>
                  -
                </Text>
                <CountdownDisplay
                  nextPrayerTime={currentPrayerInfo.nextPrayerTime}
                  timezone={locationData.timezone ?? ''}
                  className='text-[36px] font-medium text-typography-950'
                />
              </View>
            </View>
            <View className='mb-4 mt-5'>
              <Progress
                value={40}
                size='xs'
                orientation='horizontal'
                className='w-full bg-[#E4E2DE] dark:bg-[#003A2B]'
              >
                <ProgressFilledTrack />
              </Progress>
            </View>
          </View>

          {/* Prayer times list */}
          <View className='mb-10 mt-4 gap-6'>
            {Object.entries(prayerData.prayerTimes).map(([key, time]) => {
              const isCurrent = key === currentPrayerInfo.currentPrayer;
              const isNext = key === currentPrayerInfo.nextPrayerName;

              const timeInZone = DateTime.fromJSDate(new Date(time)).setZone(
                locationData.timezone,
              );

              return (
                <View
                  key={key}
                  className={`overflow-hidden rounded-2xl ${
                    isCurrent
                      ? 'bg-[#03251C]/90 dark:bg-[#00281E]/40'
                      : 'bg-[#EFEEEA] dark:bg-[#00281E]/80'
                  }`}
                >
                  {/* Blur Layer */}
                  <BlurView
                    intensity={isCurrent ? 50 : 0}
                    tint={isCurrent ? 'dark' : 'light'}
                    className='px-4 py-4'
                  >
                    <View className='flex-row items-center justify-between'>
                      {/* LEFT SECTION */}
                      <View className='flex-row items-center gap-3'>
                        {/* Icon Container */}
                        <View
                          className={`h-11 w-11 items-center justify-center rounded-full ${
                            isCurrent
                              ? 'bg-[#FED65B]/20'
                              : 'bg-background-100 dark:bg-white/10'
                          }`}
                        >
                          <Ionicons
                            name={getPrayerIcon(key)}
                            size={20}
                            color={isCurrent ? '#FED65B' : '#6B7280'}
                          />
                        </View>

                        {/* Text */}
                        <View>
                          <Text
                            className={`text-[15px] font-semibold ${
                              isCurrent
                                ? 'text-white dark:text-[#FED65B]'
                                : 'text-typography-950 dark:text-white'
                            }`}
                          >
                            {key}
                          </Text>

                          {isNext && (
                            <Text className='mt-0.5 text-[10px] font-medium uppercase tracking-wide text-typography-500 dark:text-white/60'>
                              Upcoming
                            </Text>
                          )}
                        </View>
                      </View>

                      {/* RIGHT SECTION */}
                      <View className='items-end'>
                        <Text
                          className={`text-[16px] font-semibold ${
                            isCurrent
                              ? 'text-white dark:text-[#FED65B]'
                              : 'text-typography-950 dark:text-white'
                          }`}
                        >
                          {timeInZone.toFormat('hh:mm a')}
                        </Text>

                        {isCurrent && (
                          <Text className='mt-1 text-[10px] font-medium uppercase text-[#FED65B]/80'>
                            Current
                          </Text>
                        )}
                      </View>
                    </View>
                  </BlurView>
                </View>
              );
            })}
          </View>
        </ScrollView>
      </View>
    </View>
  );
}
