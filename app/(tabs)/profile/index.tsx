import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { getAuth, signOut } from "firebase/auth";
import { getProfile } from "@/app/utils/profileStorage";

export default function ProfileScreen() {
  const router = useRouter();
  const auth = getAuth();
  const user = auth.currentUser;

  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    const data = await getProfile();
    setProfile(data);
  };

  const handleLogout = async () => {
    await signOut(auth);
    router.replace("/(auth)/login");
  };

  return (
    <View className="flex-1 bg-black p-5 items-center">
      {/* PROFILE IMAGE */}
      <Image
        source={{
          uri:
            user?.photoURL ||
            "https://cdn-icons-png.flaticon.com/512/847/847969.png",
        }}
        className="w-24 h-24 rounded-full border-2 border-white mb-4 mt-10"
      />

      {/* NAME & EMAIL */}
      <Text className="text-white text-2xl font-bold">
        {user?.displayName || "User"}
      </Text>
      <Text className="text-gray-400 mb-6">{user?.email}</Text>

      {/* STATS CARD */}
      {profile && (
        <View className="bg-gray-900 w-full rounded-2xl p-5 mb-6">
          <Text className="text-white text-lg font-bold mb-3">
            Your Details
          </Text>

          <View className="flex-row justify-between mb-2">
            <Text className="text-gray-400">Height</Text>
            <Text className="text-white">{profile.height} cm</Text>
          </View>

          <View className="flex-row justify-between mb-2">
            <Text className="text-gray-400">Weight</Text>
            <Text className="text-white">{profile.weight} kg</Text>
          </View>

          <View className="flex-row justify-between">
            <Text className="text-gray-400">Goal</Text>
            <Text className="text-white">{profile.goal}</Text>
          </View>
        </View>
      )}

      {/* EDIT PROFILE (future) */}
      <TouchableOpacity
        onPress={() => router.push("/profile")}
        className="border border-gray-600 px-6 py-3 rounded-xl mb-4"
      >
        <Text className="text-white font-semibold">Edit Profile</Text>
      </TouchableOpacity>

      {/* LOGOUT */}
      <TouchableOpacity
        onPress={handleLogout}
        className="bg-red-500 px-8 py-4 rounded-xl"
      >
        <Text className="text-white font-bold text-lg">Logout</Text>
      </TouchableOpacity>
    </View>
  );
}