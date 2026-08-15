import { Card } from '@/components/ui/card';
import { useFeaturedDuas } from '@/context/FeaturedDuasContext';
import { getFeaturedDuasByIds } from '@/lib/dua-utils';
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
          <Text className='text-xl font-bold text-typography-950 dark:text-white'>
            Useful Duas
          </Text>
          <Text className='text-sm font-medium text-typography-950 dark:text-white'>
            Your can bookmark duas for quick access
          </Text>
        </View>

        <Pressable onPress={() => router.push('/duas')}>
          <Text className='text-sm font-semibold text-typography-950'>
            View more
          </Text>
        </Pressable>
      </View>

      {featuredDuas.length === 0 ? (
        <View className='items-center rounded-2xl bg-background-0 px-4 py-8'>
          <Text className='text-center text-sm text-typography-950/60 dark:text-white/40'>
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
      )}
    </View>
  );
}
