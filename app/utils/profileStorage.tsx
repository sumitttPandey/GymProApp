import AsyncStorage from "@react-native-async-storage/async-storage";

const KEY = "USER_PROFILE";

export const saveProfile = async (data: any) => {
  const existing = await AsyncStorage.getItem(KEY);
  const profile = existing ? JSON.parse(existing) : {};
  await AsyncStorage.setItem(KEY, JSON.stringify({ ...profile, ...data }));
};

export const getProfile = async () => {
  const data = await AsyncStorage.getItem(KEY);
  return data ? JSON.parse(data) : null;
};