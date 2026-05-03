import AppGradient from '@/components/app-gradient';
import { getDuaById } from '@/lib/dua-utils';
import { Ionicons } from '@expo/vector-icons';
import * as Clipboard from 'expo-clipboard';
import { Stack, useLocalSearchParams } from 'expo-router';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

export default function DuaDetail() {
  const { id } = useLocalSearchParams();
  const duaId = Number(id);
  const dua = getDuaById('daily', duaId); // Assuming 'daily'

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

  return (
    <>
      <AppGradient>
        <Stack.Screen
          options={{
            title: dua.title.en,
            headerBackTitle: 'Back',
          }}
        />
        <ScrollView className='flex-1'>
          <View className='space-y-6 py-4'>
            {/* Card Container */}
            <View className='mt-6 rounded-2xl bg-background-0 px-4 py-6'>
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
                <View className='mt-4 flex-row items-center justify-between border-t border-outline-200 pt-4'>
                  <Text className='text-sm font-medium text-black dark:text-[#6B7280]'>
                    {dua.source.reference}
                  </Text>
                  <TouchableOpacity onPress={copyToClipboard} className='p-2'>
                    <Ionicons name='copy-outline' size={18} color='#6B7280' />
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </View>
        </ScrollView>
      </AppGradient>
    </>
  );
}
