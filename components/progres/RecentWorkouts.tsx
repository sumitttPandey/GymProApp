import { View, Text, ScrollView, Pressable } from "react-native"
import { Clock, Dumbbell, Flame, X } from "lucide-react-native"
import { useGymStore } from "@/app/lib/use-gym-store"

export function RecentWorkouts() {
  const exercises = useGymStore((state:any) => state.exercises)
  const removeExercise = useGymStore((state:any) => state.removeExercise)

  const workoutsByDate = exercises.reduce((acc: any, exercise: any) => {
    if (!acc[exercise.date]) acc[exercise.date] = []
    acc[exercise.date].push(exercise)
    return acc
  }, {})

  const recentWorkouts = Object.entries(workoutsByDate)
    .sort(([a], [b]) => new Date(b).getTime() - new Date(a).getTime())
    .slice(0, 4)
    .map(([date, dayExercises]: any) => {
      const totalWeight = dayExercises.reduce(
        (sum: number, e: any) => sum + e.weight * e.sets * e.reps,
        0
      )

      const totalSets = dayExercises.reduce((sum: number, e: any) => sum + e.sets, 0)
      const estimatedCalories = Math.round(totalSets * 8 + totalWeight * 0.01)

      const tags = [...new Set(dayExercises.map((e: any) => e.muscleGroup).filter(Boolean))].slice(0, 3)

      const today = new Date().toISOString().split("T")[0]
      const yesterday = new Date(Date.now() - 86400000).toISOString().split("T")[0]

      let dateLabel = date
      if (date === today) dateLabel = "Today"
      else if (date === yesterday) dateLabel = "Yesterday"
      else {
        const diff = Math.floor((Date.now() - new Date(date).getTime()) / 86400000)
        dateLabel = `${diff} days ago`
      }

      return {
        date,
        dateLabel,
        exercises: dayExercises,
        totalWeight,
        estimatedCalories,
        duration: `${Math.round(totalSets * 2.5)} min`,
        tags,
      }
    })

  return (
    <View className="bg-card rounded-2xl border border-border p-4">
      {/* Header */}
      <View className="flex-row justify-between items-center mb-4">
        <Text className="text-lg font-semibold text-foreground">Recent Workouts</Text>
        {exercises.length > 0 && (
          <Text className="text-sm text-muted-foreground">
            {exercises.length} exercises logged
          </Text>
        )}
      </View>

      {recentWorkouts.length === 0 ? (
        <View className="items-center py-10">
          <Dumbbell size={40} color="#888" />
          <Text className="text-muted-foreground mt-3">No workouts yet</Text>
          <Text className="text-xs text-muted-foreground mt-1">
            Log your first exercise to get started
          </Text>
        </View>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          {recentWorkouts.map((workout: any) => (
            <View
              key={workout.date}
              className="bg-secondary/30 rounded-xl p-4 mb-4"
            >
              {/* Top row */}
              <View className="flex-row justify-between mb-3">
                <View>
                  <Text className="text-foreground font-medium">
                    {workout.exercises.length} Exercises
                  </Text>
                  <Text className="text-xs text-muted-foreground">
                    {workout.dateLabel}
                  </Text>
                </View>

                <View className="flex-row gap-1">
                  {workout.tags.map((tag: string) => (
                    <View
                      key={tag}
                      className="bg-primary/10 px-2 py-0.5 rounded-full"
                    >
                      <Text className="text-xs text-primary">{tag}</Text>
                    </View>
                  ))}
                </View>
              </View>

              {/* Exercises */}
              <View className="space-y-2 mb-3">
                {workout.exercises.map((ex: any) => (
                  <View
                    key={ex.id}
                    className="flex-row justify-between items-center bg-background/60 p-2 rounded-lg"
                  >
                    <Text className="text-foreground">{ex.name}</Text>

                    <View className="flex-row items-center gap-3">
                      <Text className="text-xs text-muted-foreground">
                        {ex.weight} × {ex.sets}×{ex.reps}
                      </Text>

                      <Pressable onPress={() => removeExercise(ex.id)}>
                        <X size={14} color="#ef4444" />
                      </Pressable>
                    </View>
                  </View>
                ))}
              </View>

              {/* Stats */}
              <View className="flex-row justify-between border-t border-border/40 pt-3">
                <View className="flex-row items-center gap-2">
                  <Clock size={14} color="#888" />
                  <Text className="text-sm text-foreground">
                    {workout.duration}
                  </Text>
                </View>

                <View className="flex-row items-center gap-2">
                  <Flame size={14} color="#f97316" />
                  <Text className="text-sm text-foreground">
                    {workout.estimatedCalories} kcal
                  </Text>
                </View>

                <View className="flex-row items-center gap-2">
                  <Dumbbell size={14} color="#22c55e" />
                  <Text className="text-sm text-foreground">
                    {(workout.totalWeight / 1000).toFixed(1)}k lbs
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  )
}