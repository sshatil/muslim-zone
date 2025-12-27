import { useLocation } from '@/hooks/use-location';
import { usePrayerTime } from '@/hooks/use-prayer-time';
import { getPrayerIcon } from '@/utils/prayer-time';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { DateTime } from 'luxon';
import { useEffect, useMemo, useState } from 'react';
import { ImageBackground, Text, View } from 'react-native';

export default function PrayerTimeCard() {
  const { data: locationData } = useLocation();
  const { data: prayerData } = usePrayerTime(
    locationData?.latitude ?? 0,
    locationData?.longitude ?? 0,
    new Date()
  );

  const [timeLeft, setTimeLeft] = useState('');

  // Determine current and next prayer
  const currentPrayerInfo = useMemo(() => {
    if (!prayerData || !locationData?.timezone) return null;

    const now = DateTime.now().setZone(locationData.timezone);
    const prayerOrder = ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];
    let currentPrayer = 'Fajr';
    let nextPrayerTime: DateTime | null = null;

    for (let i = 0; i < prayerOrder.length; i++) {
      const key = prayerOrder[i] as keyof typeof prayerData.prayerTimes;
      const prayerTime = DateTime.fromJSDate(
        new Date(prayerData.prayerTimes[key])
      ).setZone(locationData.timezone);

      if (now < prayerTime) {
        nextPrayerTime = prayerTime;
        break;
      } else {
        currentPrayer = key;
      }
    }

    // Wrap to tomorrow's Fajr if all prayers are passed
    if (!nextPrayerTime) {
      nextPrayerTime = DateTime.fromJSDate(
        new Date(prayerData.prayerTimes['Fajr'])
      )
        .plus({ days: 1 })
        .setZone(locationData.timezone);
    }

    return {
      currentPrayer,
      currentPrayerTime: DateTime.fromJSDate(
        new Date(
          prayerData.prayerTimes[
            currentPrayer as keyof typeof prayerData.prayerTimes
          ]
        )
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
        setTimeLeft('00h 00m 00s');
        return;
      }

      setTimeLeft(
        `${Math.floor(diff.hours!).toString().padStart(2, '0')}h ${Math.floor(
          diff.minutes!
        )
          .toString()
          .padStart(2, '0')}m ${Math.floor(diff.seconds!)
          .toString()
          .padStart(2, '0')}s`
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

  if (!locationData || !currentPrayerInfo || !prayerData)
    return (
      <View className='h-screen justify-center items-center'>
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
        <View className='flex-row justify-between items-start mb-3 mt-10'>
          <View>
            <Text className='text-white text-sm font-semibold'>
              {arabicDate}
            </Text>
            <Text className='text-white text-sm font-semibold'>
              {currentPrayerInfo.currentPrayerTime.toFormat('dd LLL yyyy')}
            </Text>
            <Text className='text-white/70 text-sm'>
              {currentPrayerInfo.currentPrayerTime.toFormat('cccc')}
            </Text>
          </View>
          <View className='flex-row items-center gap-1'>
            <Text className='text-sm text-white'>{locationData.flag}</Text>
            <Ionicons name='location-outline' size={14} color='#fff' />
            <Text className='text-white/70 text-sm'>{locationData.city}</Text>
          </View>
        </View>

        {/* Current Prayer */}
        <View className='mb-3'>
          <Text className='text-white/70 text-xs uppercase mb-1'>
            Current Prayer
          </Text>
          <Text className='text-white text-2xl font-bold leading-tight'>
            {currentPrayerInfo.currentPrayer}:{' '}
            {currentPrayerInfo.currentPrayerTime.toFormat('hh:mm a')}
          </Text>
          <Text className='text-white/50 text-sm'>
            Remaining Time: {timeLeft}
          </Text>
        </View>

        {/* Divider */}
        <View className='h-px bg-white/20 mb-3' />

        {/* Daily Prayer Row */}
        <View className='flex-row justify-between'>
          {Object.entries(prayerData.prayerTimes).map(([key, time]) => {
            const isActive = key === currentPrayerInfo.currentPrayer;
            const timeInZone = DateTime.fromJSDate(new Date(time)).setZone(
              locationData.timezone
            );
            return (
              <View
                key={key}
                className={`items-center px-1 py-0.5 rounded-lg ${
                  isActive ? 'bg-white/20 px-2 rounded-lg' : ''
                }`}
              >
                <Ionicons
                  name={getPrayerIcon(key)}
                  size={14}
                  color={isActive ? '#fff' : 'rgba(255,255,255,0.7)'}
                />
                <Text
                  className={`mt-0.5 text-sm ${
                    isActive ? 'text-white font-semibold' : 'text-white/90'
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
