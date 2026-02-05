import { useMemo } from "react"
import { View, Text } from "react-native"
import {
  TrendingUp,
  TrendingDown,
  Dumbbell,
  Flame,
  Target,
  Zap,
} from "lucide-react-native"
import { useGymStore, computeTodaysNutrition } from "@/app/lib/use-gym-store"

export function StatsOverview() {
  const exercises = useGymStore((state) => state.exercises)
  const meals = useGymStore((state) => state.meals)

  const nutrition = useMemo(
    () => computeTodaysNutrition(meals),
    [meals]
  )

  const totalWeightLifted = exercises.reduce(
    (sum, e) => sum + e.weight * e.sets * e.reps,
    0
  )

  const workoutDays = new Set(exercises.map((e) => e.date)).size

  // streak calculation
  const today = new Date()
  let streak = 0
  for (let i = 0; i < 30; i++) {
    const d = new Date(today)
    d.setDate(today.getDate() - i)
    const dateStr = d.toISOString().split("T")[0]
    if (exercises.some((e) => e.date === dateStr)) streak++
    else if (i > 0) break
  }

  const stats = [
    {
      label: "Total Weight",
      value: totalWeightLifted.toLocaleString(),
      unit: "lbs",
      change: "+12%",
      trend: "up" as const,
      icon: Dumbbell,
      color: "#22c55e",
      bg: "bg-green-500/10",
    },
    {
      label: "Calories Today",
      value: nutrition.calories.toLocaleString(),
      unit: "kcal",
      change: "+8%",
      trend: "up" as const,
      icon: Flame,
      color: "#f97316",
      bg: "bg-orange-500/10",
    },
    {
      label: "Workout Days",
      value: workoutDays.toString(),
      unit: "days",
      change: `+${workoutDays}`,
      trend: "up" as const,
      icon: Target,
      color: "#3b82f6",
      bg: "bg-blue-500/10",
    },
    {
      label: "Current Streak",
      value: streak.toString(),
      unit: "days",
      change: streak > 0 ? `+${streak}` : "0",
      trend: streak > 0 ? "up" : "down",
      icon: Zap,
      color: "#a855f7",
      bg: "bg-purple-500/10",
    },
  ]

  return (
    <View className="flex-row flex-wrap gap-4">
      {stats.map((stat) => {
        const Icon = stat.icon
        const TrendIcon =
          stat.trend === "up" ? TrendingUp : TrendingDown

        return (
          <View
            key={stat.label}
            className="w-full sm:w-[48%] lg:w-[23%] bg-card border border-border rounded-xl p-5"
          >
            <View className="flex-row items-start justify-between">
              <View className={`p-3 rounded-lg ${stat.bg}`}>
                <Icon size={20} color={stat.color} />
              </View>

              <View className="flex-row items-center gap-1">
                <TrendIcon
                  size={14}
                  color={stat.trend === "up" ? "#22c55e" : "#ef4444"}
                />
                <Text
                  className={`text-xs font-medium ${
                    stat.trend === "up"
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {stat.change}
                </Text>
              </View>
            </View>

            <View className="mt-4">
              <Text className="text-2xl font-bold text-foreground">
                {stat.value}
                <Text className="text-sm text-muted-foreground">
                  {" "}
                  {stat.unit}
                </Text>
              </Text>
              <Text className="text-sm text-muted-foreground mt-1">
                {stat.label}
              </Text>
            </View>
          </View>
        )
      })}
    </View>
  )
}