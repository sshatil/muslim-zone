'use client';

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
    {} as Record<number, typeof featuredDuas>
  );

  return (
    <View className='mt-6 px-4'>
      {/* Title */}
      <Text className='text-lg font-semibold text-typography-950 mb-3'>
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
                  className='border-outline-200 bg-background-10 rounded-xl'
                >
                  <View className='flex-row items-center justify-between'>
                    {/* Left */}
                    <View className='flex-1'>
                      <Text className='text-sm font-medium text-typography-950'>
                        {dua.title.en}
                      </Text>

                      <Text className='text-xs mt-1 text-typography-950'>
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
                  className='border-outline-200 bg-background-10 rounded-xl'
                >
                  <View className='flex-row items-center justify-between'>
                    {/* Left */}
                    <View className='flex-1'>
                      <Text className='text-sm font-medium text-typography-950'>
                        {category?.name.en ?? 'Unknown Category'}
                      </Text>

                      <Text className='text-xs mt-1 text-typography-500'>
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
