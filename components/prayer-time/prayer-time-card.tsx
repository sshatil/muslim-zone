import { useLocation } from '@/hooks/use-location';
import { usePrayerTime } from '@/hooks/use-prayer-time';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { ImageBackground, Text, View } from 'react-native';

const PRAYERS = [
  { key: 'Fajr', time: '5:02 AM' },
  { key: 'Dhuhr', time: '12:21 PM' },
  { key: 'Asr', time: '4:32 PM' },
  { key: 'Maghrib', time: '6:18 PM' },
  { key: 'Isha', time: '7:35 PM' },
];

const shadow = {
  textShadowColor: 'rgba(0,0,0,0.5)',
  textShadowOffset: { width: 0, height: 1 },
  textShadowRadius: 2,
};

export default function PrayerTimeCard() {
  const hijriDate = '15 Rabiul Awwal 1447';
  const gregorianDate = 'Monday, 16 September 2025';
  const currentPrayer = 'Asr';
  const currentPrayerTime = '4:32 PM';
  const timeLeft = '01h 18m left';
  const location1 = 'Dhaka, Bangladesh';

  const getPrayerIcon = (prayerKey: string) => {
    switch (prayerKey) {
      case 'Fajr':
        return 'moon-outline';
      case 'Dhuhr':
        return 'sunny-outline';
      case 'Asr':
        return 'partly-sunny-outline';
      case 'Maghrib':
        return 'partly-sunny-outline';
      case 'Isha':
        return 'cloudy-night-outline';
      default:
        return 'time-outline';
    }
  };
  const { data } = useLocation();

  const { data: prayerTime } = usePrayerTime(
    data?.latitude ?? 0,
    data?.longitude ?? 0,
    12,
    2025
  );

  if (!data) return null;

  // console.log('prayerTime', prayerTime);
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
            <Text style={shadow} className='text-white text-sm font-semibold'>
              {hijriDate}
            </Text>
            <Text className='text-white/70 text-sm'>{gregorianDate}</Text>
          </View>
          <View className='flex-row items-center gap-1'>
            <Ionicons name='location-outline' size={14} color='#fff' />
            <Text className='text-white/70 text-sm'>{location1}</Text>
          </View>
        </View>

        {/* Current Prayer */}
        <View className='mb-3'>
          <Text className='text-white/70 text-xs uppercase mb-1'>
            Current Prayer
          </Text>
          <Text
            style={shadow}
            className='text-white text-2xl font-bold leading-tight'
          >
            {currentPrayer}: {currentPrayerTime}
          </Text>
          <Text className='text-white/50 text-sm'>Next Prayer:{timeLeft}</Text>
        </View>

        {/* Divider */}
        <View className='h-px bg-white/20 mb-3' />

        {/* Daily Prayer Row */}
        <View className='flex-row justify-between'>
          {PRAYERS.map((prayer) => {
            const isActive = prayer.key === currentPrayer;

            return (
              <View
                key={prayer.key}
                className={`items-center px-1 py-0.5 rounded-lg ${
                  isActive ? 'bg-white/20 px-2 rounded-lg' : ''
                }`}
              >
                <Ionicons
                  name={getPrayerIcon(prayer.key) as any}
                  size={14}
                  color={isActive ? '#fff' : 'rgba(255,255,255,0.7)'}
                />
                <Text
                  className={`mt-0.5 text-sm ${
                    isActive ? 'text-white font-semibold' : 'text-white/90'
                  }`}
                >
                  {prayer.key}
                </Text>
                <Text
                  className={`text-[11px] ${
                    isActive ? 'text-white' : 'text-white/90'
                  }`}
                >
                  {prayer.time}
                </Text>
              </View>
            );
          })}
        </View>
      </BlurView>
    </ImageBackground>
  );
}
