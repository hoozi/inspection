import AsyncStorage from '@react-native-community/async-storage';

const tokenKey: string = 'TOKEN';
const storage = AsyncStorage;
export function setToken(t: string): Promise<void> {
  return storage.setItem(tokenKey, t);
}
export function getToken(): Promise<string | null> {
  return storage.getItem(tokenKey) || null;
}
export function removeToken(): Promise<void> {
  return storage.removeItem(tokenKey);
}
