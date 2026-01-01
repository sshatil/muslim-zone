import { Card } from '@/components/ui/card';
import { getCategories } from '@/lib/dua-loader';
import { getDuasByCategory } from '@/lib/dua-utils';
import { Ionicons } from '@expo/vector-icons';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { Pressable, ScrollView, Text, View } from 'react-native';

export default function CategoryDuas() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const categoryId = Number(id);

  const category = getCategories().find((c) => c.id === categoryId);
  const duas = getDuasByCategory('daily', categoryId); // Assuming 'daily' for now, or could pass module as param

  if (!category) {
    return (
      <View className='flex-1 items-center justify-center text-red-400'>
        <Text>Category not found</Text>
      </View>
    );
  }

  return (
    <>
      <Stack.Screen
        options={{
          title: category.name.en,
          headerBackTitle: 'Back',
        }}
      />
      <ScrollView className='flex-1 bg-background-100 p-4'>
        <View className='space-y-3 mb-6'>
          {duas.map((dua) => (
            <Pressable
              key={dua.id}
              onPress={() => router.push(`/dua/${dua.id}`)}
            >
              <Card
                size='md'
                variant='outline'
                className='border-outline-200 bg-background-0 rounded-xl my-2'
              >
                <View className='flex-row items-center justify-between'>
                  <View className='flex-1 mr-2'>
                    <Text className='text-sm font-medium text-typography-950 mb-1'>
                      {dua.title.en}
                    </Text>
                    <Text className='text-xs text-typography-500 line-clamp-1'>
                      {dua.translation.en}
                    </Text>
                  </View>
                  <Ionicons
                    name='chevron-forward-outline'
                    size={18}
                    color='#9CA3AF'
                  />
                </View>
              </Card>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </>
  );
}
