import { Card } from '@/components/ui/card';
import { useFeaturedDuas } from '@/context/FeaturedDuasContext';
import { getFeaturedDuasByIds } from '@muslim-zone/core';
import { useRouter } from 'expo-router';
import { Pressable, Text, View } from 'react-native';

export default function FeaturedDuaList() {
  const router = useRouter();
  const { featuredIds } = useFeaturedDuas();

  const featuredDuas = getFeaturedDuasByIds('daily', featuredIds);

  return (
    <View className='mx-4 mb-20 p-2'>
      <View className='mb-4 flex-row items-center justify-between pb-2'>
        <View>
          <Text className='text-typography-950 text-xl font-bold dark:text-white'>
            Useful Duas
          </Text>
          <Text className='text-typography-950 text-sm font-medium dark:text-white'>
            Your can bookmark duas for quick access
          </Text>
        </View>

        <Pressable onPress={() => router.push('/duas')}>
          <Text className='text-typography-950 text-sm font-semibold'>
            View more
          </Text>
        </Pressable>
      </View>

      {featuredDuas.length === 0 ? (
        <View className='bg-background-0 items-center rounded-2xl px-4 py-8'>
          <Text className='text-typography-950/60 text-center text-sm dark:text-white/40'>
            No duas added yet. Open a dua and tap the bookmark icon to add it
            here.
          </Text>
        </View>
      ) : (
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
                className='bg-background-0 rounded-2xl p-5'
              >
                <View className='flex-row items-center justify-between'>
                  <View className='flex-1'>
                    <Text
                      numberOfLines={1}
                      className='text-typography-950 text-[16px] font-bold dark:text-white'
                    >
                      {dua.title.en}
                    </Text>

                    <Text
                      numberOfLines={1}
                      className='text-typography-950/70 mt-1 text-xs dark:text-white/50'
                    >
                      {dua.source?.reference || 'Dua'}
                    </Text>
                  </View>
                </View>
              </Card>
            </Pressable>
          ))}
        </View>
      )}
    </View>
  );
}
