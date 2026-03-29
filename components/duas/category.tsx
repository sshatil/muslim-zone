import { getCategories } from '@/lib/dua-loader';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { CategoryList } from './category-list';

export default function Category() {
  const [search, setSearch] = useState('');
  const categories = getCategories();

  const filtered = categories.filter((cat) =>
    cat.name.en.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <ScrollView className='flex-1 px-3 pt-20'>
      <View className='flex-row items-center justify-between'>
        <Text className='text-[48px] font-bold text-typography-950 dark:text-white'>
          Duas List
        </Text>
      </View>
      {/* Search */}
      <View className='mb-4 mt-4 flex-row items-center rounded-2xl border border-outline-200 bg-background-0 px-4 py-3 dark:border-white/10 dark:bg-white/5'>
        <Ionicons name='search-outline' size={18} color='#9CA3AF' />

        <TextInput
          placeholder='Search duas or categories...'
          placeholderTextColor='#9CA3AF'
          value={search}
          onChangeText={setSearch}
          className='ml-2 flex-1 py-0 text-xl text-typography-950 dark:text-white'
        />

        {search.length > 0 && (
          <Pressable onPress={() => setSearch('')}>
            <Ionicons name='close-circle' size={18} color='#9CA3AF' />
          </Pressable>
        )}
      </View>

      {/* Category List */}
      <View className='flex-row flex-wrap justify-between'>
        {filtered.map((cat) => (
          <CategoryList key={cat.id} cat={cat} />
        ))}
      </View>

      {/* Empty State */}
      {filtered.length === 0 && (
        <View className='mt-10 items-center'>
          <Ionicons name='search-outline' size={40} color='#9CA3AF' />
          <Text className='mt-3 text-sm text-typography-500'>
            No results found
          </Text>
        </View>
      )}
    </ScrollView>
  );
}
