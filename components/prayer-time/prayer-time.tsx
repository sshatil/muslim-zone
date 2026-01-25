import { useLocation } from '@/hooks/use-location';
import { usePrayerTime } from '@/hooks/use-prayer-time';
import { getPrayerIcon } from '@/utils/prayer-time';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { DateTime } from 'luxon';
import { useEffect, useMemo, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';

export default function PrayerTime() {
  const { data: locationData } = useLocation();
  const { data: prayerData } = usePrayerTime(
    locationData?.latitude ?? 0,
    locationData?.longitude ?? 0,
    new Date(),
  );

  const [timeLeft, setTimeLeft] = useState('');

  // Determine current and next prayer
  const currentPrayerInfo = useMemo(() => {
    if (!prayerData || !locationData?.timezone) return null;

    const now = DateTime.now().setZone(locationData.timezone);
    const prayerOrder = ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];
    let currentPrayer = 'Fajr';
    let nextPrayerTime: DateTime | null = null;
    let nextPrayerName = '';

    for (let i = 0; i < prayerOrder.length; i++) {
      const key = prayerOrder[i] as keyof typeof prayerData.prayerTimes;
      const prayerTime = DateTime.fromJSDate(
        new Date(prayerData.prayerTimes[key]),
      ).setZone(locationData.timezone);

      if (now < prayerTime) {
        nextPrayerTime = prayerTime;
        nextPrayerName = key;
        break;
      } else {
        currentPrayer = key;
      }
    }

    // Wrap to tomorrow's Fajr if all prayers are passed
    if (!nextPrayerTime) {
      nextPrayerTime = DateTime.fromJSDate(
        new Date(prayerData.prayerTimes['Fajr']),
      )
        .plus({ days: 1 })
        .setZone(locationData.timezone);
      nextPrayerName = 'Fajr';
    }

    return {
      currentPrayer,
      nextPrayerName,
      currentPrayerTime: DateTime.fromJSDate(
        new Date(
          prayerData.prayerTimes[
            currentPrayer as keyof typeof prayerData.prayerTimes
          ],
        ),
      ).setZone(locationData.timezone),
      nextPrayerTime,
    };
  }, [prayerData, locationData]);

  // Countdown timer
  useEffect(() => {
    if (!currentPrayerInfo?.nextPrayerTime) return;

    const interval = setInterval(() => {
      const now = DateTime.now().setZone(locationData!.timezone);
      const diff = currentPrayerInfo
        .nextPrayerTime!.diff(now, ['hours', 'minutes', 'seconds'])
        .toObject();

      if (!diff) return;

      if (diff.hours! <= 0 && diff.minutes! <= 0 && diff.seconds! <= 0) {
        setTimeLeft('00 : 00 : 00');
        return;
      }

      setTimeLeft(
        `${Math.floor(diff.hours!).toString().padStart(2, '0')} : ${Math.floor(
          diff.minutes!,
        )
          .toString()
          .padStart(2, '0')} : ${Math.floor(diff.seconds!)
          .toString()
          .padStart(2, '0')}`,
      );
    }, 1000);

    return () => clearInterval(interval);
  }, [currentPrayerInfo, locationData]);

  // Arabic date, day and year
  const arabicDate = useMemo(() => {
    if (!currentPrayerInfo || !locationData?.timezone) return '';

    const date = currentPrayerInfo.currentPrayerTime
      .setZone(locationData.timezone)
      .toJSDate();

    return new Intl.DateTimeFormat('en-US-u-ca-islamic', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      timeZone: locationData.timezone,
    }).format(date);
  }, [currentPrayerInfo, locationData]);

  if (!locationData || !currentPrayerInfo || !prayerData) {
    return (
      <View className='flex-1 items-center justify-center bg-background-950'>
        {/* Placeholder or loading state could go here, for now just empty or minimal */}
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
