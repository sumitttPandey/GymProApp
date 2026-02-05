import { TouchableOpacity, Text } from "react-native";
import OnboardingLayout from "@/components/onboardingLayout";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { saveProfile } from "../utils/profileStorage";

const goals = [
  { label: "Lose Fat", emoji: "🔥" },
  { label: "Gain Muscle", emoji: "💪" },
  { label: "Stay Fit", emoji: "⚡" },
];

export default function GoalScreen() {
  const selectGoal = async (goal: string) => {
    await saveProfile({ goal : String(goal)});
    router.push("/summary");
  };

  return (
    <OnboardingLayout
      step={3}
      title="What’s your goal?"
      subtitle="We’ll tailor workouts for this"
    >
      {goals.map((g) => (
        <TouchableOpacity
          key={g.label}
          onPress={() => selectGoal(g.label)}
          className="border border-gray-300 rounded-2xl p-5 mb-4 flex-row justify-between"
        >
          <Text className="text-lg font-semibold">{g.label}</Text>
          <Text className="text-xl">{g.emoji}</Text>
        </TouchableOpacity>
      ))}
    </OnboardingLayout>
  );
}