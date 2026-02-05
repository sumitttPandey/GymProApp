import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";

export default function WaterTracker() {
  const dailyGoal = 2000; // ml
  const [water, setWater] = useState(0);

  const addWater = (amount: number) => {
    setWater((prev) => Math.min(prev + amount, dailyGoal));
  };

  return (
    <View className="items-center justify-center my-6">
      <Text className="text-white text-lg font-bold mb-2">Water Intake</Text>
      <Text className="text-gray-300 mb-10 font-bold">
        {water} / {dailyGoal} ml
      </Text>

      <TouchableOpacity
        className="bg-white px-4 py-2 rounded-xl"
        onPress={() => addWater(250)} // add one glass
      >
        <Text className="text-black">+250ml</Text>
      </TouchableOpacity>
    </View>
  );
}