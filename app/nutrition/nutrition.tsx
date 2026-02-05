// components/NutritionCard.tsx
import { router } from "expo-router";
import React from "react";
import { Text, TouchableOpacity } from "react-native";

type NutritionCardProps = {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
};

export default function NutritionCard({ calories, protein, carbs, fat }:NutritionCardProps) {
    return (
        <TouchableOpacity
      onPress={() => router.push("/nutrition")}
    >
            <Text className="text-orange-300 font-bold text-lg mb-2">Nutrition</Text>
            <Text className="text-white text-sm">Calories: {calories} kcal</Text>
            <Text className="text-white text-sm">Protein: {protein} g</Text>
            <Text className="text-white text-sm">Carbs: {carbs} g</Text>
            <Text className="text-white text-sm">Fat: {fat} g</Text>
        </TouchableOpacity>
    );
}