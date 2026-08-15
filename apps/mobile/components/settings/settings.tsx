import { Ionicons } from '@expo/vector-icons';
import { router, Stack } from 'expo-router';
import { useEffect, useState } from 'react';
import { ScrollView, Switch, Text, TouchableOpacity, View } from 'react-native';

import { useTheme } from '@/context/ThemeContext';

import {
  Actionsheet,
  ActionsheetBackdrop,
  ActionsheetContent,
  ActionsheetItem,
  ActionsheetItemText,
} from '@/components/ui/actionsheet';
import { Card } from '@/components/ui/card';
import { useLocation } from '@/hooks/use-location';
import {
  defaultPrayerSettings,
  getPrayerNotificationSettings,
  PrayerNotificationSettings,
  savePrayerNotificationSettings,
  schedulePrayerNotifications,
} from '@/utils/notifications';

export default function Settings() {
  const { theme, setTheme, colorScheme } = useTheme();
  const [showThemeSheet, setShowThemeSheet] = useState(false);
  const { data: locationData } = useLocation();
  const [prayerSettings, setPrayerSettings] =
    useState<PrayerNotificationSettings>(defaultPrayerSettings);

  useEffect(() => {
    async function loadSettings() {
      const settings = await getPrayerNotificationSettings();
      setPrayerSettings(settings);
    }
    loadSettings();
  }, []);

  const handleTogglePrayer = async (
    prayer: keyof PrayerNotificationSettings,
    value: boolean,
  ) => {
    const newSettings = { ...prayerSettings, [prayer]: value };
    setPrayerSettings(newSettings);
    await savePrayerNotificationSettings(newSettings);

    if (locationData?.latitude && locationData?.longitude) {
      await schedulePrayerNotifications(
        locationData.latitude,
        locationData.longitude,
      );
    }
  };

  const themeOptions = [
    { label: 'Light', value: 'light', icon: 'sunny-outline' },
    { label: 'Dark', value: 'dark', icon: 'moon-outline' },
    { label: 'System', value: 'system', icon: 'phone-portrait-outline' },
  ];

  const selected = themeOptions.find((t) => t.value === theme);

  const switchColor = colorScheme === 'dark' ? '#E9C349' : '#003527';

  return (
    <>
      <Stack.Screen options={{ title: 'Settings', headerLargeTitle: true }} />

      <ScrollView
        className='flex-1'
        contentContainerClassName='p-4 gap-6 pb-20 pt-20'
      >
        {/* Appearance Section */}
        <View className='gap-4'>
          <Text className='px-1 text-[26px] font-bold uppercase text-[#003527] dark:text-[#E9C349]'>
            Appearance
          </Text>

          <Card
            variant='outline'
            className='rounded-2xl bg-background-0 p-5 dark:bg-[#001B13]'
          >
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
                  <Text className='text-base font-medium text-[#003527] dark:text-white'>
                    Theme
                  </Text>

                  <Text className='text-sm text-[#003527]/80 dark:text-white/80'>
                    {selected?.label}
                  </Text>
                </View>
              </View>

              <Ionicons name='chevron-forward' size={20} color='#A3A3A3' />
            </TouchableOpacity>
          </Card>
        </View>

        {/* Prayer notifications section */}
        <View className='gap-4'>
          <Text className='px-1 text-[26px] font-bold uppercase text-[#003527] dark:text-[#E9C349]'>
            Prayer Alerts
          </Text>

          <Card
            variant='outline'
            className='rounded-2xl bg-background-0 p-5 dark:bg-[#001B13]'
          >
            {(
              Object.keys(defaultPrayerSettings) as Array<
                keyof PrayerNotificationSettings
              >
            ).map((prayer, index) => (
              <View
                key={prayer}
                className={`flex-row items-center justify-between p-2 ${
                  index !== 0 ? 'border-t border-outline-200' : ''
                }`}
              >
                <View className='flex-row items-center gap-3'>
                  <Text className='text-[18px] text-[#003527] dark:text-white'>
                    {prayer}
                  </Text>
                </View>

                <Switch
                  value={prayerSettings[prayer]}
                  onValueChange={(val) => handleTogglePrayer(prayer, val)}
                  trackColor={{ false: switchColor, true: switchColor }}
                  thumbColor={prayerSettings[prayer] ? '#FFFFFF' : '#BFC9C3'}
                />
              </View>
            ))}
          </Card>
        </View>

        {/* General Section */}
        <View className='gap-4'>
          <Text className='px-1 text-[26px] font-bold uppercase text-[#003527] dark:text-[#E9C349]'>
            General
          </Text>
          <Card
            variant='outline'
            className='rounded-2xl bg-background-0 p-5 dark:bg-[#001B13]'
          >
            <TouchableOpacity
              className='w-full p-2'
              onPress={() => router.push('/about')}
            >
              <View className='w-full flex-row items-center justify-between'>
                <View className='flex-row items-center gap-3'>
                  <Ionicons
                    name='information-circle-outline'
                    size={20}
                    color='#3B82F6'
                  />

                  <Text className='text-[18px] text-[#003527] dark:text-white'>
                    About
                  </Text>
                </View>

                <Ionicons name='chevron-forward' size={20} color='#A3A3A3' />
              </View>
            </TouchableOpacity>
          </Card>
        </View>
      </ScrollView>

      {/* Theme bottom sheet */}
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
