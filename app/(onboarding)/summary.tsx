import { View, Text, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

export default function SummaryScreen() {
  const finish = async () => {
    await AsyncStorage.setItem("ONBOARDING_COMPLETED", "true");
    router.replace("/home");
  };

  return (
    <View className="flex-1 justify-center items-center bg-white px-6">
      <Text className="text-3xl font-bold mb-4">You're all set! 🎉</Text>
      <Text className="text-gray-500 text-center mb-8">
        Let’s start your fitness journey
      </Text>

      <TouchableOpacity
        onPress={finish}
        className="bg-black py-5 px-12 rounded-2xl"
      >
        <Text className="text-white text-lg font-bold">Go to Home</Text>
      </TouchableOpacity>
    </View>
  );
}