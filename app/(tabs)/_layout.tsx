import { Tabs } from 'expo-router';
import React from 'react';

import { HapticTab } from '@/components/haptic-tab';
import { Colors } from '@/constants/theme';
import { useTheme } from '@/context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';

export default function TabLayout() {
  const { theme } = useTheme();
  const colorScheme = theme === 'dark' ? 'dark' : 'light';

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarStyle: {
          backgroundColor: theme === 'dark' ? '#001A14' : '#FFFFFF',
        },
      }}
    >
      <Tabs.Screen
        name='index'
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => (
            <Ionicons size={28} name='home-outline' color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name='prayer'
        options={{
          title: 'Prayer',
          tabBarIcon: ({ color }) => (
            <Ionicons size={28} name='time-outline' color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name='duas'
        options={{
          title: 'Duas',
          tabBarIcon: ({ color }) => (
            <Ionicons size={28} name='book-outline' color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name='settings'
        options={{
          title: 'Settings',
          tabBarIcon: ({ color }) => (
            <Ionicons size={28} name='settings-outline' color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
