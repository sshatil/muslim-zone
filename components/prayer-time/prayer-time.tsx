import { usePrayerTiming } from '@/hooks/use-prayer-timing';
import { getPrayerIcon } from '@/utils/prayer-time';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { DateTime } from 'luxon';
import { ScrollView, Text, View } from 'react-native';

export default function PrayerTime() {
  const { locationData, prayerData, currentPrayerInfo, timeLeft, arabicDate } =
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
          className='flex-1 px-6 pt-16'
          showsVerticalScrollIndicator={false}
        >
          {/* Header section */}
          <View className='mb-10 items-center'>
            <Text className='mb-2 text-sm font-medium uppercase tracking-widest text-typography-500'>
              {locationData.city}, {locationData.country}
            </Text>
            <Text className='mb-1 text-3xl font-bold text-typography-950'>
              {currentPrayerInfo.currentPrayerTime.toFormat('cccc, dd LLL')}
            </Text>
            <Text className='text-lg font-medium text-typography-500'>
              {arabicDate}
            </Text>
          </View>

          {/* Hero timer section */}
          <View className='mb-12 items-center'>
            <View className='mb-6 rounded-full border border-outline-200 bg-background-50 px-6 py-2'>
              <Text className='text-sm font-medium text-typography-500'>
                Next: {currentPrayerInfo.nextPrayerName}
              </Text>
            </View>

            <Text className='font-mono mb-2 text-6xl font-light tracking-wider text-typography-950'>
              {timeLeft || '-- : -- : --'}
            </Text>
            <Text className='text-sm uppercase tracking-widest text-typography-500'>
              Time Remaining
            </Text>
          </View>

          {/* Prayer times list */}
          <View className='mb-10 gap-4'>
            {Object.entries(prayerData.prayerTimes).map(([key, time]) => {
              const isCurrent = key === currentPrayerInfo.currentPrayer;
              const isNext = key === currentPrayerInfo.nextPrayerName;

              const timeInZone = DateTime.fromJSDate(new Date(time)).setZone(
                locationData.timezone,
              );

              return (
                <BlurView
                  key={key}
                  intensity={isCurrent ? 20 : 0}
                  className={`flex-row items-center justify-between overflow-hidden rounded-2xl border p-4 ${
                    isCurrent
                      ? 'border-green-500/50 bg-primary-500/10'
                      : 'border-outline-200 bg-background-50'
                  }`}
                >
                  <View className='flex-row items-center gap-4'>
                    <View
                      className={`h-10 w-10 items-center justify-center rounded-full ${
                        isCurrent && ''
                      }`}
                    >
                      <Ionicons
                        name={getPrayerIcon(key)}
                        size={20}
                        color={isCurrent ? '#4ade80' : '#687076'}
                      />
                    </View>
                    <View>
                      <Text
                        className={`text-base font-semibold ${
                          isCurrent
                            ? 'text-typography-950'
                            : 'text-typography-500'
                        }`}
                      >
                        {key}
                      </Text>
                      {isNext && (
                        <Text className='text-[10px] font-medium uppercase tracking-wide text-typography-500'>
                          Upcoming
                        </Text>
                      )}
                    </View>
                  </View>

                  <Text
                    className={`text-lg font-medium ${
                      isCurrent ? 'text-typography-950' : 'text-typography-500'
                    }`}
                  >
                    {timeInZone.toFormat('hh:mm a')}
                  </Text>
                </BlurView>
              );
            })}
          </View>
        </ScrollView>
      </View>
    </View>
  );
}
