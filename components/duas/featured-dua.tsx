import { Card } from '@/components/ui/card';
import { getCategories } from '@/lib/dua-loader';
import { getFeaturedDuas } from '@/lib/dua-utils';
import { useRouter } from 'expo-router';
import { Pressable, Text, View } from 'react-native';

export default function FeaturedDuaList() {
  const router = useRouter();

  const featuredDuas = getFeaturedDuas('daily');
  const categories = getCategories();

  // Group duas by categoryId
  const groupedDuas = featuredDuas.reduce(
    (acc, dua) => {
      const catId = dua.categoryId;
      if (!acc[catId]) {
        acc[catId] = [];
      }
      acc[catId].push(dua);
      return acc;
    },
    {} as Record<number, typeof featuredDuas>,
  );

  const entries = Object.entries(groupedDuas);

  return (
    <View className='mx-4 p-2'>
      {/* Header */}
      <View className='mb-4 flex-row items-center justify-between pb-2'>
        <Text className='text-xl font-bold text-typography-950'>
          Useful Duas
        </Text>

        <Pressable onPress={() => router.push('/')}>
          <Text className='text-sm font-semibold text-typography-950'>
            View more
          </Text>
        </Pressable>
      </View>

      <View className='flex-row flex-wrap justify-between'>
        {entries.slice(0, 4).map(([categoryId, duas]) => {
          const catId = Number(categoryId);
          const isSingle = duas.length === 1;
          const dua = duas[0];
          const category = categories.find((c) => c.id === catId);

          return (
            <Pressable
              key={isSingle ? `dua-${dua.id}` : `cat-${catId}`}
              onPress={() =>
                router.push(isSingle ? `/dua/${dua.id}` : `/category/${catId}`)
              }
              className='mb-3 w-[48%]'
            >
              <Card
                size='md'
                variant='outline'
                className='rounded-2xl bg-background-0 p-5'
              >
                <View className='flex-row items-center justify-between'>
                  {/* Left */}
                  <View className='flex-1'>
                    <Text className='text-[16px] font-bold text-typography-950'>
                      {isSingle
                        ? dua.title.en
                        : (category?.name.en ?? 'Unknown Category')}
                    </Text>

                    <Text className='mt-1 text-xs text-typography-950/60'>
                      {isSingle ? dua.source?.reference : `${duas.length} Duas`}
                    </Text>
                  </View>
                </View>
              </Card>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}
