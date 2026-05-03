import { Card } from '@/components/ui/card';
import { getFeaturedDuas } from '@/lib/dua-utils';
import { useRouter } from 'expo-router';
import { Pressable, Text, View } from 'react-native';

export default function FeaturedDuaList() {
  const router = useRouter();

  const featuredDuas = getFeaturedDuas('daily');

  return (
    <View className='mx-4 mb-20 p-2'>
      <View className='mb-4 flex-row items-center justify-between pb-2'>
        <Text className='text-xl font-bold text-typography-950 dark:text-white'>
          Useful Duas
        </Text>

        <Pressable onPress={() => router.push('/duas')}>
          <Text className='text-sm font-semibold text-typography-950'>
            View more
          </Text>
        </Pressable>
      </View>
      <View className='flex-row flex-wrap justify-between'>
        {featuredDuas.map((dua) => (
          <Pressable
            key={`featured-dua-${dua.id}`}
            onPress={() => router.push(`/dua/${dua.id}`)}
            className='mb-3 w-[48%]'
          >
            <Card
              size='md'
              variant='outline'
              className='rounded-2xl bg-background-0 p-5'
            >
              <View className='flex-row items-center justify-between'>
                <View className='flex-1'>
                  <Text
                    numberOfLines={1}
                    className='text-[16px] font-bold text-typography-950 dark:text-white'
                  >
                    {dua.title.en}
                  </Text>

                  <Text
                    numberOfLines={1}
                    className='mt-1 text-xs text-typography-950/70 dark:text-white/50'
                  >
                    {dua.source?.reference || 'Dua'}
                  </Text>
                </View>
              </View>
            </Card>
          </Pressable>
        ))}
      </View>
    </View>
  );
}
