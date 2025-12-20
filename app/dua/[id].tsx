import { getDuaById } from "@/lib/dua-utils";
import { Ionicons } from "@expo/vector-icons";
import * as Clipboard from "expo-clipboard";
import { Stack, useLocalSearchParams } from "expo-router";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function DuaDetail() {
  const { id } = useLocalSearchParams();
  const duaId = Number(id);
  const dua = getDuaById("daily", duaId); // Assuming 'daily'

  if (!dua) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text>Dua not found</Text>
      </View>
    );
  }

  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(
      `${dua.arabic}\n\n${dua.translation.en}\n\n${dua.source?.reference}`
    );
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: dua.title.en,
          headerBackTitle: "Back",
        }}
      />
      <ScrollView className="flex-1 bg-background-100">
        <View className="p-6 space-y-6">
          {/* Card Container */}
          <View className="bg-background-0 rounded-2xl p-6 shadow-sm border border-outline-200">
            {/* Arabic */}
            <Text className="text-2xl text-center text-typography-950 font-bold mb-6 leading-loose">
              {dua.arabic}
            </Text>

            {/* Transliteration */}
            {dua.transliteration?.en && (
              <View className="mb-6 bg-surface-50 p-4 rounded-xl">
                <Text className="text-sm text-typography-600 italic text-center">
                  {dua.transliteration.en}
                </Text>
              </View>
            )}

            {/* Translation */}
            <View className="mb-4">
              <Text className="text-base text-typography-900 text-center leading-relaxed">
                {dua.translation.en}
              </Text>
            </View>

            {/* Source */}
            {dua.source && (
              <View className="mt-4 pt-4 border-t border-outline-100 flex-row justify-between items-center">
                <Text className="text-xs text-typography-500 font-medium">
                  {dua.source.reference}
                </Text>
                <TouchableOpacity onPress={copyToClipboard} className="p-2">
                  <Ionicons name="copy-outline" size={18} color="#6B7280" />
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </>
  );
}
