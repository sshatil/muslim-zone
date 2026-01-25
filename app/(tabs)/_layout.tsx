import { Tabs } from 'expo-router';
import React from 'react';

import { HapticTab } from '@/components/haptic-tab';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Ionicons } from '@expo/vector-icons';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
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
