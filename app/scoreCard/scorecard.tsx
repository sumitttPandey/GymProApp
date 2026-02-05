import React from "react";
import { View, Text } from "react-native";
import { AnimatedCircularProgress } from "react-native-circular-progress";

type ScoreCardProps = {
  score: number;
};

export default function ScoreCard({ score }: ScoreCardProps) {
  return (
    <View className="items-center justify-center">
      <AnimatedCircularProgress
        size={100} // circle size
        width={12} // stroke thickness
        fill={score} // percentage
        tintColor="#ffffff" // white
        backgroundColor="#262626" // dark background
        rotation={0}
        lineCap="round"
      >
        {(fill: number) => (
          <Text className="text-white font-bold text-xl">
            {Math.round(fill)}%
          </Text>
        )}
      </AnimatedCircularProgress>
      <Text className="text-white mt-2">Your Score</Text>
    </View>
  );
}