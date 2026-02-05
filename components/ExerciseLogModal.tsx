import { useState } from "react"
import {
  View,
  Text,
  Modal,
  Pressable,
  TextInput,
  ScrollView,
} from "react-native"
import { Plus, Dumbbell } from "lucide-react-native"
import { useGymStore } from "@/app/lib/use-gym-store"

const exerciseOptions = [
  "Bench Press",
  "Squat",
  "Deadlift",
  "Shoulder Press",
  "Barbell Row",
  "Lat Pulldown",
  "Leg Press",
  "Bicep Curl",
  "Tricep Extension",
  "Leg Curl",
  "Calf Raise",
  "Chest Fly",
  "Lunges",
  "Pull Ups",
  "Push Ups",
]

export function ExerciseLogModal() {
  const [open, setOpen] = useState(false)
  const [exercise, setExercise] = useState<string | null>(null)
  const [weight, setWeight] = useState("")
  const [sets, setSets] = useState("")
  const [reps, setReps] = useState("")

  const addExercise = useGymStore((s) => s.addExercise)

  const handleAdd = () => {
    if (!exercise || !weight || !sets || !reps) return

    addExercise({
      name: exercise,
      weight: Number(weight),
      sets: Number(sets),
      reps: Number(reps),
      date: new Date().toISOString().split("T")[0],
    })

    setExercise(null)
    setWeight("")
    setSets("")
    setReps("")
    setOpen(false)
  }

  return (
    <>
      {/* Trigger Button */}
      <Pressable
        onPress={() => setOpen(true)}
        className="flex-row items-center gap-2 bg-primary px-4 py-3 rounded-xl"
      >
        <Plus size={16} color="white" />
        <Text className="text-white font-semibold">Log Exercise</Text>
      </Pressable>

      {/* Modal */}
      <Modal visible={open} animationType="slide" transparent>
        <View className="flex-1 bg-black/50 justify-end">
          <View className="bg-background rounded-t-3xl p-5">
            {/* Header */}
            <View className="flex-row items-center gap-2 mb-4">
              <Dumbbell size={20} className="text-primary" />
              <Text className="text-lg font-bold text-foreground">
                Log Today’s Exercise
              </Text>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              {/* Exercise selector */}
              <Text className="text-sm mb-1 text-muted-foreground">
                Exercise
              </Text>

              {exerciseOptions.map((ex) => (
                <Pressable
                  key={ex}
                  onPress={() => setExercise(ex)}
                  className={`p-3 rounded-lg mb-2 ${
                    exercise === ex
                      ? "bg-primary"
                      : "bg-secondary"
                  }`}
                >
                  <Text
                    className={`${
                      exercise === ex
                        ? "text-white"
                        : "text-foreground"
                    }`}
                  >
                    {ex}
                  </Text>
                </Pressable>
              ))}

              {/* Inputs */}
              <View className="flex-row gap-3 mt-4">
                <TextInput
                  placeholder="Weight"
                  keyboardType="numeric"
                  value={weight}
                  onChangeText={setWeight}
                  className="flex-1 bg-secondary rounded-lg px-3 py-2"
                />
                <TextInput
                  placeholder="Sets"
                  keyboardType="numeric"
                  value={sets}
                  onChangeText={setSets}
                  className="flex-1 bg-secondary rounded-lg px-3 py-2"
                />
                <TextInput
                  placeholder="Reps"
                  keyboardType="numeric"
                  value={reps}
                  onChangeText={setReps}
                  className="flex-1 bg-secondary rounded-lg px-3 py-2"
                />
              </View>

              {/* Submit */}
              <Pressable
                onPress={handleAdd}
                className="bg-primary mt-6 py-3 rounded-xl items-center"
              >
                <Text className="text-white font-semibold">
                  Add Exercise
                </Text>
              </Pressable>

              <Pressable
                onPress={() => setOpen(false)}
                className="mt-3 items-center"
              >
                <Text className="text-muted-foreground">Cancel</Text>
              </Pressable>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </>
  )
}