import { View, Text } from "react-native"
import { useMemo } from "react"
import { CheckCircle2, Circle } from "lucide-react-native"
import { useGymStore } from "@/app/lib/use-gym-store"

export function WorkoutCalendar() {
  const exercises = useGymStore((state) => state.exercises)

  const workoutDays = useMemo(() => {
    const today = new Date()
    const days = []

    for (let i = 6; i >= 0; i--) {
      const date = new Date(today)
      date.setDate(today.getDate() - i)

      const dateStr = date.toISOString().split("T")[0]
      const dayName = date.toLocaleDateString("en-US", { weekday: "short" })
      const dayExercises = exercises.filter((e) => e.date === dateStr)

      days.push({
        date: dateStr,
        dayName,
        hasWorkout: dayExercises.length > 0,
        exerciseCount: dayExercises.length,
      })
    }

    return days
  }, [exercises])

  return (
    <View className="bg-card rounded-2xl p-4">

      {/* Title */}
      <Text className="text-lg font-semibold text-foreground mb-4">
        This Week's Workouts
      </Text>

      {/* Calendar */}
      <View className="flex-row justify-between">
        {workoutDays.map((day) => (
          <View
            key={day.date}
            className={`w-[13%] p-3 rounded-xl items-center border
              ${
                day.hasWorkout
                  ? "bg-primary/20 border-primary"
                  : "bg-secondary/50 border-border"
              }
            `}
          >
            {day.hasWorkout ? (
              <CheckCircle2 size={20} color="#6366F1" />
            ) : (
              <Circle size={20} color="#9CA3AF" />
            )}

            <Text className="text-xs font-medium text-foreground mt-1">
              {day.dayName}
            </Text>

            {day.hasWorkout && (
              <Text className="text-[10px] text-muted-foreground mt-1">
                {day.exerciseCount}
              </Text>
            )}
          </View>
        ))}
      </View>

    </View>
  )
}