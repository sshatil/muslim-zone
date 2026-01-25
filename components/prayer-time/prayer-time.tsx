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
        <View className='absolute inset-0 bg-background-950/80' />

        <ScrollView
          className='flex-1 px-6 pt-16'
          showsVerticalScrollIndicator={false}
        >
          {/* Header section */}
          <View className='mb-10 items-center'>
            <Text className='mb-2 text-sm font-medium uppercase tracking-widest text-white/60'>
              {locationData.city}, {locationData.country}
            </Text>
            <Text className='mb-1 text-3xl font-bold text-white'>
              {currentPrayerInfo.currentPrayerTime.toFormat('cccc, dd LLL')}
            </Text>
            <Text className='text-lg font-medium text-primary-400'>
              {arabicDate}
            </Text>
          </View>

          {/* Hero timer section */}
          <View className='mb-12 items-center'>
            <View className='mb-6 rounded-full border border-white/5 bg-white/10 px-6 py-2'>
              <Text className='text-sm font-medium text-white/90'>
                Next: {currentPrayerInfo.nextPrayerName}
              </Text>
            </View>

            <Text className='font-mono mb-2 text-6xl font-light tracking-wider text-white'>
              {timeLeft || '-- : -- : --'}
            </Text>
            <Text className='text-sm uppercase tracking-widest text-white/40'>
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
                      ? 'border-primary-500/50 bg-primary-500/10'
                      : 'border-white/5 bg-background-900/40'
                  }`}
                >
                  <View className='flex-row items-center gap-4'>
                    <View
                      className={`h-10 w-10 items-center justify-center rounded-full ${
                        isCurrent ? 'bg-primary-500' : 'bg-white/10'
                      }`}
                    >
                      <Ionicons
                        name={getPrayerIcon(key)}
                        size={20}
                        color={isCurrent ? '#fff' : '#ffffff80'}
                      />
                    </View>
                    <View>
                      <Text
                        className={`text-base font-semibold ${
                          isCurrent ? 'text-white' : 'text-white/70'
                        }`}
                      >
                        {key}
                      </Text>
                      {isNext && (
                        <Text className='text-[10px] font-medium uppercase tracking-wide text-primary-400'>
                          Upcoming
                        </Text>
                      )}
                    </View>
                  </View>

                  <Text
                    className={`text-lg font-medium ${
                      isCurrent ? 'text-white' : 'text-white/70'
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
