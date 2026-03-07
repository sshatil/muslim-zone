import { Ionicons } from '@expo/vector-icons';
import { Stack } from 'expo-router';
import { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

import { useTheme } from '@/context/ThemeContext';

import {
  Actionsheet,
  ActionsheetBackdrop,
  ActionsheetContent,
  ActionsheetItem,
  ActionsheetItemText,
} from '@/components/ui/actionsheet';
import { Card } from '@/components/ui/card';

export default function Settings() {
  const { theme, setTheme } = useTheme();
  const [showThemeSheet, setShowThemeSheet] = useState(false);

  const themeOptions = [
    { label: 'Light', value: 'light', icon: 'sunny-outline' },
    { label: 'Dark', value: 'dark', icon: 'moon-outline' },
    { label: 'System', value: 'system', icon: 'phone-portrait-outline' },
  ];

  const selected = themeOptions.find((t) => t.value === theme);

  return (
    <>
      <Stack.Screen options={{ title: 'Settings', headerLargeTitle: true }} />

      <ScrollView
        className='flex-1 bg-background-50'
        contentContainerClassName='p-4 gap-6 pb-20 pt-20'
      >
        {/* Appearance Section */}
        <View className='gap-4'>
          <Text className='px-1 text-sm font-semibold uppercase text-typography-500'>
            Appearance
          </Text>

          <Card variant='outline' className='p-2'>
            {/* Theme Selector Row */}
            <TouchableOpacity
              onPress={() => setShowThemeSheet(true)}
              className='flex-row items-center justify-between'
            >
              <View className='flex-row items-center gap-3'>
                <View className='items-center justify-center rounded-full p-2'>
                  <Ionicons
                    name={selected?.icon as any}
                    size={20}
                    color='#6366F1'
                  />
                </View>

                <View>
                  <Text className='text-base font-medium text-typography-500'>
                    Theme
                  </Text>

                  <Text className='text-sm text-typography-500'>
                    {selected?.label}
                  </Text>
                </View>
              </View>

              <Ionicons name='chevron-forward' size={20} color='#A3A3A3' />
            </TouchableOpacity>
          </Card>
        </View>

        {/* General Section */}
        <View className='gap-4'>
          <Text className='px-1 text-sm font-semibold uppercase text-typography-500'>
            General
          </Text>
          <Card variant='outline' className='p-2'>
            <View className='flex-row items-center gap-3 p-2'>
              <View className='items-center justify-center rounded-full'>
                <Ionicons
                  name='notifications-outline'
                  size={20}
                  color='#EF4444'
                />
              </View>

              <Text className='text-base font-medium text-typography-500'>
                Notifications
              </Text>
            </View>

            <TouchableOpacity className='w-full border-t border-outline-200 p-2'>
              <View className='w-full flex-row items-center justify-between'>
                <View className='flex-row items-center gap-3'>
                  <Ionicons
                    name='information-circle-outline'
                    size={20}
                    color='#3B82F6'
                  />

                  <Text className='text-base font-medium text-typography-500'>
                    About
                  </Text>
                </View>

                <Ionicons name='chevron-forward' size={20} color='#A3A3A3' />
              </View>
            </TouchableOpacity>
          </Card>
        </View>

        {/* Application Info */}
        <View className='items-center py-4'>
          <Text className='text-sm text-typography-500'>
            Muslim Zone • v1.0.0
          </Text>
        </View>
      </ScrollView>

      {/* Theme Bottom Sheet */}
      <Actionsheet
        isOpen={showThemeSheet}
        onClose={() => setShowThemeSheet(false)}
      >
        <ActionsheetBackdrop />

        <ActionsheetContent>
          {themeOptions.map((item) => (
            <ActionsheetItem
              key={item.value}
              onPress={() => {
                setTheme(item.value as any);
                setShowThemeSheet(false);
              }}
            >
              <View className='w-full flex-row items-center justify-between'>
                <View className='flex-row items-center gap-3'>
                  <Ionicons name={item.icon as any} size={20} color='#737373' />

                  <ActionsheetItemText>{item.label}</ActionsheetItemText>
                </View>

                {theme === item.value && (
                  <Ionicons name='checkmark' size={18} color='#6366F1' />
                )}
              </View>
            </ActionsheetItem>
          ))}
        </ActionsheetContent>
      </Actionsheet>
    </>
  );
}
