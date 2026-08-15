import AppGradient from '@/components/app-gradient';
import { Card } from '@/components/ui/card';
import { Ionicons } from '@expo/vector-icons';
import { getCategories, getDuasByCategory } from '@muslim-zone/core';
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
      <AppGradient>
        <Stack.Screen
          options={{
            title: category.name.en,
            headerBackTitle: 'Back',
          }}
        />
        <ScrollView className='flex-1 p-4'>
          <View className='mb-6 space-y-3'>
            {duas.map((dua) => (
              <Pressable
                key={dua.id}
                onPress={() => router.push(`/dua/${dua.id}`)}
              >
                <Card
                  size='md'
                  variant='outline'
                  className='border-outline-200 bg-background-0 my-2 rounded-xl'
                >
                  <View className='flex-row items-center justify-between'>
                    <View className='mr-2 flex-1'>
                      <Text className='text-typography-950 mb-1 text-base font-medium'>
                        {dua.title.en}
                      </Text>
                      <Text className='text-typography-500 line-clamp-1 text-xs'>
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
      </AppGradient>
    </>
  );
}
