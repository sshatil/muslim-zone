import { Card } from '@/components/ui/card';
import { useTheme } from '@/context/ThemeContext';
import { getDuasByCategory } from '@/lib/dua-utils';
import { DuaCategory } from '@/types/dua';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Pressable, Text, View } from 'react-native';

export const CategoryList = ({ cat }: { cat: DuaCategory }) => {
  const router = useRouter();
  const getCategoriesDua = getDuasByCategory('daily', cat.id);
  const { theme } = useTheme();

  const iconColor = theme === 'dark' ? '#FED65B' : '#006C51';
  return (
    <Pressable
      key={cat.id}
      onPress={() => router.push(`/category/${cat.id}`)}
      className='mb-4 w-[48%]'
    >
      <Card
        size='md'
        variant='outline'
        className='flex-col items-start rounded-2xl bg-background-0 p-6'
      >
        {/* Icon */}
        <View className='mb-3 rounded-full bg-[#17A57F33] p-3'>
          <Ionicons name={cat.icon as any} size={20} color={iconColor} />
        </View>

        <View>
          {/* Title */}
          <Text
            numberOfLines={2}
            className='text-center text-[16px] font-semibold text-typography-950 dark:text-white'
          >
            {cat.name.en}
          </Text>

          {/* Subtitle */}
          <Text className='mt-1 text-xs text-typography-500'>
            {getCategoriesDua.length ?? 0} Duas
          </Text>
        </View>
      </Card>
    </Pressable>
  );
};
