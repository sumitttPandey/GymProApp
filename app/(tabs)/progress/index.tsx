import { useMemo, useState } from "react"
import {
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native"

import { useGymStore } from "@/app/lib/use-gym-store"
import { getLast7DaysNutrition } from "@/app/lib/nutritionHelpers"
import {
  getLast3MuscleProgress,
  getMuscleGroups,
} from "@/app/lib/workoutHelper"

import { EnhancedExerciseLogModal } from "@/components/EnhancedExerciseLogModal"
import { ExerciseDropDown } from "@/components/ExerciseDropDown"
import { Last3ExerciseChart } from "@/components/Last3ExerciseChart"



export default function Dashboard() {
  const [selectedWorkoutDate, setSelectedWorkoutDate] = useState(
    new Date().toISOString().split("T")[0]
  )
  const [selectedMuscle, setSelectedMuscle] = useState<string | null>(null)

  const removeExercise = useGymStore(s => s.removeExercise)

  const exercises = useGymStore(s => s.exercises)
  const meals = useGymStore(s => s.meals)

  /* ---------------- WORKOUTS BY DATE ---------------- */
  const workoutsForDate = useMemo(() => {
    return exercises
      .filter(e => e.date === selectedWorkoutDate)
      .sort((a: any, b: any) => b.id - a.id)
  }, [exercises, selectedWorkoutDate])

  /* ---------------- MUSCLE GROUPS ---------------- */
  const muscleGroups = useMemo(
    () => getMuscleGroups(exercises),
    [exercises]
  )

  const last3Progress = useMemo(() => {
    if (!selectedMuscle) return []
    return getLast3MuscleProgress(exercises, selectedMuscle)
  }, [selectedMuscle, exercises])

  /* ---------------- NUTRITION ---------------- */
  const nutrition7 = useMemo(
    () => getLast7DaysNutrition(meals),
    [meals]
  )

  return (
    <ScrollView
      className="flex-1 bg-white mt-6"
      contentContainerStyle={{ padding: 20 }}
      showsVerticalScrollIndicator={false}
    >
      {/* HEADER */}
      <Text className="text-2xl font-bold text-black">
        Dashboard
      </Text>
      <Text className="text-gray-500 mb-6">
        Workout & nutrition overview
      </Text>

      {/* ---------------- WORKOUTS ---------------- */}
      <View className="mb-10">
        <View className="flex-row justify-between items-center mb-3">
          <Text className="text-xl font-semibold text-black">
            Workouts
          </Text>
          <EnhancedExerciseLogModal />
        </View>

        {/* DATE SELECTOR */}
        <View className="flex-row items-center mb-4">
          <Pressable
            onPress={() =>
              setSelectedWorkoutDate(
                new Date(
                  new Date(selectedWorkoutDate).setDate(
                    new Date(selectedWorkoutDate).getDate() - 1
                  )
                ).toISOString().split("T")[0]
              )
            }
            className="px-3 py-2 bg-gray-200 rounded-lg mr-2"
          >
            <Text>◀</Text>
          </Pressable>

          <Text className="font-semibold text-black">
            {selectedWorkoutDate}
          </Text>

          <Pressable
            onPress={() =>
              setSelectedWorkoutDate(
                new Date(
                  new Date(selectedWorkoutDate).setDate(
                    new Date(selectedWorkoutDate).getDate() + 1
                  )
                ).toISOString().split("T")[0]
              )
            }
            className="px-3 py-2 bg-gray-200 rounded-lg ml-2"
          >
            <Text>▶</Text>
          </Pressable>
        </View>

        {/* WORKOUT LIST */}
        {workoutsForDate.length === 0 && (
          <View className="bg-gray-100 rounded-xl p-6">
            <Text className="text-gray-500 text-center">
              No workouts logged for this day
            </Text>
          </View>
        )}

        {workoutsForDate.map((e, i) => (
          <View
            key={i}
            className="bg-gray-400 rounded-2xl p-4 mb-3 flex-row justify-between items-center"
          >
            {/* LEFT */}
            <View>
              <Text className="text-black font-semibold">
                {e.name}
              </Text>

              <Text className="text-gray-600 mt-1">
                {e.sets} × {e.reps}
                {e.weight > 0 && ` @ ${e.weight} kg`}
              </Text>

              <Text className="text-gray-400 text-xs mt-2">
                {e.date}
              </Text>
            </View>

            {/* REMOVE */}
            <TouchableOpacity
              onPress={() => removeExercise(e.id)}
              className="pl-4"
            >
              <Text className="text-red-500 text-lg">✕</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>

      {/* ---------------- MUSCLE PROGRESS ---------------- */}
      <Text className="text-xl font-semibold text-black mb-3">
        Muscle Progress
      </Text>

      <ExerciseDropDown
        items={muscleGroups}
        value={selectedMuscle}
        onSelect={setSelectedMuscle}
      />

      <Last3ExerciseChart data={last3Progress} />

      {/* ---------------- NUTRITION ---------------- */}
      <Text className="text-xl font-semibold text-black mt-10 mb-3">
        Nutrition (Last 7 Days)
      </Text>

      <View className="bg-gray-400 rounded-2xl p-4">
        {nutrition7.map(day => (
          <View key={day.date} className="mb-3">
            <Text className="text-gray-900 text-xs">
              {day.date}
            </Text>
            <Text className="text-black text-sm">
              🔥 {day.calories} kcal   💪 {day.protein} g
            </Text>
          </View>
        ))}
      </View>
    </ScrollView>
  )
}