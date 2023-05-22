import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';

const secureStoreIsAvailable = async () => {
  try {
    return await SecureStore.isAvailableAsync();
  } catch (e) {
    return false;
  }
};

export const setLocalStoreItem = async (key: string, value: string) => {
  try {
    const isSecureStoreAvailable = await secureStoreIsAvailable();
    if (isSecureStoreAvailable) {
      await SecureStore.setItemAsync(key, value);
    } else {
      await AsyncStorage.setItem(key, value);
    }
  } catch (e) {
    // saving error
  }
};

export const getLocalStoreItem = async (key: string) => {
  try {
    const isSecureStoreAvailable = await secureStoreIsAvailable();
    if (isSecureStoreAvailable) {
      return await SecureStore.getItemAsync(key);
    } else {
      return await AsyncStorage.getItem(key);
    }
  } catch (e) {
    return null;
  }
};

export const deleteLocalStoreItem = async (key: string) => {
  try {
    const isSecureStoreAvailable = await secureStoreIsAvailable();
    if (isSecureStoreAvailable) {
      return await SecureStore.deleteItemAsync(key);
    } else {
      return await AsyncStorage.removeItem(key);
    }
  } catch (e) {
    // error reading value
  }
};
