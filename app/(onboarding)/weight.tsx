import { View, TextInput, TouchableOpacity, Text } from "react-native";
import OnboardingLayout from "@/components/onboardingLayout";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { saveProfile } from "../utils/profileStorage";
import { useState } from "react";

export default function WeightScreen() {
  const [weight, setWeight] = useState("");

  const next = async () => {
    if (!weight) return;
    await saveProfile({ weight: Number(weight) });
    router.push("/goal");
  };

  return (
    <OnboardingLayout
      step={2}
      title="Your current weight"
      subtitle="Used to track progress"
    >
      <TextInput
        placeholder="Weight in kg"
        keyboardType="numeric"
        value={weight}
        onChangeText={setWeight}
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