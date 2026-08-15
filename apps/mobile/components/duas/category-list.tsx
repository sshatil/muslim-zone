import { Card } from '@/components/ui/card';
import { useTheme } from '@/context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import { getDuasByCategory, type DuaCategory } from '@muslim-zone/core';
import { useRouter } from 'expo-router';
import { Pressable, Text, View } from 'react-native';

export const CategoryList = ({ cat }: { cat: DuaCategory }) => {
  const router = useRouter();
  const getCategoriesDua = getDuasByCategory('daily', cat.id);
  const { colorScheme } = useTheme();

  const iconColor = colorScheme === 'dark' ? '#FED65B' : '#006C51';
  return (
    <Pressable
      key={cat.id}
      onPress={() => router.push(`/category/${cat.id}`)}
      className='mb-4 w-[48%]'
    >
      <Card
        size='md'
        variant='outline'
        className='bg-background-0 flex-col items-start rounded-2xl px-5 py-6'
      >
        {/* Icon */}
        <View className='mb-3 rounded-full bg-[#17A57F33] p-3'>
          <Ionicons name={cat.icon as any} size={20} color={iconColor} />
        </View>

        <View>
          {/* Title */}
          <Text
            numberOfLines={2}
            className='text-typography-950 text-[16px] font-semibold dark:text-white'
          >
            {cat.name.en}
          </Text>

          {/* Subtitle */}
          <Text className='text-typography-500 mt-1 text-xs'>
            {getCategoriesDua.length ?? 0} Duas
          </Text>
        </View>
      </Card>
    </Pressable>
  );
};
