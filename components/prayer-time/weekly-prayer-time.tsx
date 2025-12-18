'use client';
import { Ionicons } from '@expo/vector-icons';
import { ScrollView, Text, View } from 'react-native';

type PrayerDay = {
  day: string;
  date: string;
  fajr: string;
  dhuhr: string;
  asr: string;
  maghrib: string;
  isha: string;
  isToday?: boolean;
};

const WEEKLY_PRAYERS: PrayerDay[] = [
  {
    day: 'Mon',
    date: '16 Sep',
    fajr: '5:02',
    dhuhr: '12:21',
    asr: '4:32',
    maghrib: '6:18',
    isha: '7:35',
    isToday: true,
  },
  {
    day: 'Tue',
    date: '17 Sep',
    fajr: '5:03',
    dhuhr: '12:21',
    asr: '4:31',
    maghrib: '6:17',
    isha: '7:34',
  },
  {
    day: 'Wed',
    date: '18 Sep',
    fajr: '5:04',
    dhuhr: '12:20',
    asr: '4:30',
    maghrib: '6:16',
    isha: '7:33',
  },
  {
    day: 'Thu',
    date: '19 Sep',
    fajr: '5:05',
    dhuhr: '12:20',
    asr: '4:29',
    maghrib: '6:15',
    isha: '7:32',
  },
  {
    day: 'Fri',
    date: '20 Sep',
    fajr: '5:06',
    dhuhr: '12:19',
    asr: '4:28',
    maghrib: '6:14',
    isha: '7:31',
  },
  {
    day: 'Sat',
    date: '21 Sep',
    fajr: '5:07',
    dhuhr: '12:19',
    asr: '4:27',
    maghrib: '6:13',
    isha: '7:30',
  },
  {
    day: 'Sun',
    date: '22 Sep',
    fajr: '5:08',
    dhuhr: '12:18',
    asr: '4:26',
    maghrib: '6:12',
    isha: '7:29',
  },
];

export default function WeeklyPrayerTimes() {
  return (
    <View className='mt-4'>
      {/* Title */}
      <View className='pl-4 text-lg my-4 flex flex-row items-center gap-2'>
        <Text className='text-typography-950 text-lg font-semibold'>
          Weekly Prayer Times
        </Text>
        <Ionicons name='arrow-forward-outline' size={24} color='green' />
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 14 }}
      >
        {WEEKLY_PRAYERS.map((day) => {
          const isToday = day.isToday;

          return (
            <View
              key={day.date}
              className={`
                rounded-2xl px-4 py-3 min-w-[130px]
                ${isToday ? 'bg-secondary-100 border border-tertiary-500' : 'bg-secondary-50 border'}
              `}
            >
              {/* Day & date */}
              <Text className='text-center text-sm font-semibold text-typography-950'>
                {day.day}
              </Text>
              <Text className='text-center text-xs mb-2 text-typography-700'>
                {day.date}
              </Text>

              {/* Prayer times */}
              <View className='space-y-1'>
                <PrayerRow label='Fajr' time={day.fajr} />
                <PrayerRow label='Dhuhr' time={day.dhuhr} />
                <PrayerRow label='Asr' time={day.asr} />
                <PrayerRow label='Maghrib' time={day.maghrib} />
                <PrayerRow label='Isha' time={day.isha} />
              </View>

              {/* Today badge */}
              {isToday && (
                <View className='mt-2 self-center px-2 py-0.5 border borde border-green-600 rounded-md'>
                  <Text className='text-[10px] font-semibold text-white'>
                    Today
                  </Text>
                </View>
              )}
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}

function PrayerRow({ label, time }: { label: string; time: string }) {
  return (
    <View className='flex-row justify-between'>
      <Text className='text-[11px] text-typography-700'>{label}</Text>
      <Text className='text-[11px] font-medium text-typography-950'>
        {time}
      </Text>
    </View>
  );
}
