import AppGradient from '@/components/app-gradient';
import { useFeaturedDuas } from '@/context/FeaturedDuasContext';
import { Ionicons } from '@expo/vector-icons';
import { getDuaById } from '@muslim-zone/core';
import * as Clipboard from 'expo-clipboard';
import { Stack, useLocalSearchParams } from 'expo-router';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

export default function DuaDetail() {
  const { id } = useLocalSearchParams();
  const duaId = Number(id);
  const dua = getDuaById('daily', duaId);

  const { isFavourited, toggle } = useFeaturedDuas();
  const bookmarked = dua ? isFavourited(dua.id) : false;

  if (!dua) {
    return (
      <View className='flex-1 items-center justify-center text-red-400'>
        <Text>Dua not found</Text>
      </View>
    );
  }

  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(
      `${dua.arabic}\n\n${dua.translation.en}\n\n${dua.source?.reference}`,
    );
  };

  const handleBookmark = () => {
    toggle(dua.id);
  };

  return (
    <>
      <AppGradient>
        <Stack.Screen
          options={{
            title: dua.title.en,
            headerBackTitle: 'Back',
            headerRight: () => (
              <TouchableOpacity onPress={handleBookmark} className='p-2'>
                <Ionicons
                  name={bookmarked ? 'bookmark' : 'bookmark-outline'}
                  size={22}
                  color={bookmarked ? '#10B981' : '#6B7280'}
                />
              </TouchableOpacity>
            ),
          }}
        />
        <ScrollView className='flex-1'>
          <View className='space-y-6 py-4'>
            {/* Card Container */}
            <View className='bg-background-0 mt-6 rounded-2xl px-4 py-6'>
              {/* Arabic */}
              <Text className='mb-6 text-center text-3xl leading-loose text-black dark:text-[#ECFDF5]'>
                {dua.arabic}
              </Text>

              {/* Transliteration */}
              {dua.transliteration?.en && (
                <View className='bg-surface-50 mb-6 rounded-xl p-4'>
                  <Text className='text-center text-xl italic leading-relaxed text-black dark:text-[#ECFDF5]'>
                    {dua.transliteration.en}
                  </Text>
                </View>
              )}

              {/* Translation */}
              <View className='mb-4'>
                <Text className='text-center text-xl leading-relaxed text-black dark:text-[#ECFDF5]'>
                  {dua.translation.en}
                </Text>
              </View>

              {/* Source */}
              {dua.source && (
                <View className='border-outline-200 mt-4 flex-row items-center justify-between border-t pt-4'>
                  <Text className='text-sm font-medium text-black dark:text-[#6B7280]'>
                    {dua.source.reference}
                  </Text>
                  <View className='flex-row items-center gap-2'>
                    <TouchableOpacity onPress={handleBookmark} className='p-2'>
                      <Ionicons
                        name={bookmarked ? 'bookmark' : 'bookmark-outline'}
                        size={18}
                        color={bookmarked ? '#10B981' : '#6B7280'}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={copyToClipboard} className='p-2'>
                      <Ionicons name='copy-outline' size={18} color='#6B7280' />
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </View>
          </View>
        </ScrollView>
      </AppGradient>
    </>
  );
}
