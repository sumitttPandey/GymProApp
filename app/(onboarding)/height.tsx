import { View, TextInput, TouchableOpacity, Text } from "react-native";
import OnboardingLayout from "@/components/onboardingLayout";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { saveProfile } from "../utils/profileStorage";
import { useState } from "react";

export default function HeightScreen() {
  const [height, setHeight] = useState("");

  const next = async () => {
    if (!height) return;
    await saveProfile({ height: Number(height) });
    router.push("/weight");
  };

  return (
    <OnboardingLayout
      step={1}
      title="What’s your height?"
      subtitle="This helps us personalize workouts"
    >
      <TextInput
        placeholder="Height in cm"
        keyboardType="numeric"
        value={height}
        onChangeText={setHeight}
        className="border border-gray-300 rounded-2xl p-5 text-xl"
      />

      <TouchableOpacity
        onPress={next}
        className="bg-black py-5 rounded-2xl mt-8"
      >
        <Text className="text-white text-center text-lg font-bold">
          Continue
        </Text>
      </TouchableOpacity>
    </OnboardingLayout>
  );
}