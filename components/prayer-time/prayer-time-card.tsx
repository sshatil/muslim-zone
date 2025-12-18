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
  const location = 'Dhaka, Bangladesh';

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

  return (
    <ImageBackground
      source={require('@/assets/images/mosque-banner.png')}
      resizeMode='cover'
      className='overflow-hidden'
    >
      <BlurView intensity={70} tint='dark' className='px-5 py-6 pt-10'>
        <View className='absolute inset-0 bg-black/30 rounded-3xl' />

        {/* Header */}
        <View className='flex-row justify-between items-start mb-4'>
          <View>
            <Text
              style={shadow}
              className='text-white text-[16px] font-semibold'
            >
              {hijriDate}
            </Text>
            <Text className='text-white/70 text-[16px]'>{gregorianDate}</Text>
          </View>
        </View>

        {/* Current prayer */}
        <View className='flex-row justify-between items-center mb-4'>
          <View className='items-start mb-5'>
            <Text className='text-white text-sm font-semibold uppercase mb-1'>
              Current Prayer
            </Text>
            <Text style={shadow} className='text-white text-3xl font-bold'>
              {currentPrayer} : {currentPrayerTime}
            </Text>
          </View>
          <View className='items-end'>
            <Text className='text-white text-lg'>Sunrise: 6:00 AM</Text>
            <Text className='text-white text-lg'>Sunset: 7:00 PM</Text>
          </View>
        </View>

        {/* Info */}
        <View className='flex-row justify-between items-center mb-4'>
          <View>
            <Text className='text-white/90 text-md mb-1'>Time Remaining</Text>
            <Text
              style={shadow}
              className='text-white/90 text-base font-semibold bg-white/10 rounded-lg px-2 py-1'
            >
              <Ionicons name='time-outline' size={16} color='white' />{' '}
              {timeLeft}
            </Text>
          </View>

          <View className='items-end'>
            <View className='flex-row items-center'>
              <Ionicons
                name='location-outline'
                size={16}
                color='rgba(255,255,255,0.7)'
                className='mr-2'
              />
              <Text className='text-white/90 text-sm font-medium'>
                location
              </Text>
            </View>
            <Text className='text-white/90 text-sm font-medium'>
              {location}
            </Text>
          </View>
        </View>

        {/* Divider */}
        <View className='h-px bg-white/20 mb-3' />

        {/* Daily prayer */}
        <View className='flex-row justify-between'>
          {PRAYERS.map((prayer) => {
            const isActive = prayer.key === currentPrayer;

            return (
              <View
                key={prayer.key}
                className={`items-center px-3 py-2 rounded-lg ${
                  isActive ? 'bg-white/25' : ''
                }`}
              >
                <Ionicons
                  name={getPrayerIcon(prayer.key) as any}
                  size={17}
                  color={isActive ? '#fff' : 'rgba(255,255,255,0.7)'}
                />

                <Text
                  className={`mt-1 text-[16px] ${
                    isActive ? 'text-white font-semibold' : 'text-white/70'
                  }`}
                >
                  {prayer.key}
                </Text>

                <Text
                  className={`text-md ${
                    isActive ? 'text-white' : 'text-white/60'
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
