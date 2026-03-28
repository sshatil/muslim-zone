import { Card } from '@/components/ui/card';
import { getCategories } from '@/lib/dua-loader';
import { getFeaturedDuas } from '@/lib/dua-utils';
import { Ionicons } from '@expo/vector-icons';
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

  return (
    <View className='p-2'>
      {/* Title */}
      <Text className='mb-3 text-2xl font-bold text-typography-950'>
        Featured Duas
      </Text>

      <View className='space-y-3'>
        {Object.entries(groupedDuas).map(([categoryId, duas]) => {
          const catId = Number(categoryId);
          const isSingle = duas.length === 1;
          const dua = duas[0];
          const category = categories.find((c) => c.id === catId);

          if (isSingle) {
            return (
              <Pressable
                key={`dua-${dua.id}`}
                onPress={() => router.push(`/dua/${dua.id}`)}
              >
                <Card
                  size='md'
                  variant='outline'
                  className='my-2 rounded-xl bg-background-0'
                >
                  <View className='flex-row items-center justify-between'>
                    {/* Left */}
                    <View className='flex-1'>
                      <Text className='text-base font-medium text-typography-950'>
                        {dua.title.en}
                      </Text>

                      <Text className='mt-1 text-xs text-typography-950'>
                        {dua.source?.reference}
                      </Text>
                    </View>

                    {/* Right Icon */}
                    <Ionicons
                      name='chevron-forward-outline'
                      size={18}
                      color='#9CA3AF'
                    />
                  </View>
                </Card>
              </Pressable>
            );
          } else {
            // Multiple duas in this category
            return (
              <Pressable
                key={`cat-${catId}`}
                onPress={() => router.push(`/category/${catId}`)}
              >
                <Card
                  size='md'
                  variant='outline'
                  className='my-2 rounded-xl bg-background-0'
                >
                  <View className='flex-row items-center justify-between'>
                    {/* Left */}
                    <View className='flex-1'>
                      <Text className='text-base font-medium text-typography-950'>
                        {category?.name.en ?? 'Unknown Category'}
                      </Text>

                      <Text className='mt-1 text-xs text-typography-500'>
                        {duas.length} Duas
                      </Text>
                    </View>

                    {/* Right Icon */}
                    <Ionicons
                      name='chevron-forward-outline'
                      size={18}
                      color='#9CA3AF'
                    />
                  </View>
                </Card>
              </Pressable>
            );
          }
        })}
      </View>
    </View>
  );
}
