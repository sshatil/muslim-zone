import type { StorageAdapter } from '@muslim-zone/react';

import AsyncStorage from '@react-native-async-storage/async-storage';

export const mobileStorage: StorageAdapter = {
  getItem: (key: string) => AsyncStorage.getItem(key),

  setItem: (key: string, value: string) => AsyncStorage.setItem(key, value),

  removeItem: (key: string) => AsyncStorage.removeItem(key),
};
