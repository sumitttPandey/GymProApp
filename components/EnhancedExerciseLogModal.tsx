import { useState } from "react"

import {
  View,
  Text,
  Modal,
  Pressable,
  TextInput,
  ScrollView,
} from "react-native"
import { Plus, Dumbbell, Play, ChevronRight } from "lucide-react-native"
import { useRouter } from "expo-router"
import { useGymStore } from "@/app/lib/use-gym-store"
import { muscleGroups, getExercisesByMuscle } from "@/app/lib/exercises-db"

export function EnhancedExerciseLogModal() {
  const [open, setOpen] = useState(false)
  const [selectedMuscle, setSelectedMuscle] = useState<string | null>(null)
  const [selectedExercise, setSelectedExercise] = useState<string | null>(null)
  const [weight, setWeight] = useState("")
  const [sets, setSets] = useState("")
  const [reps, setReps] = useState("")

  const addExercise = useGymStore((s:any) => s.addExercise)
  const router = useRouter()

  const exercises = selectedMuscle
    ? getExercisesByMuscle(selectedMuscle)
    : []

  const handleAdd = () => {
    if (!selectedExercise || !weight || !sets || !reps) return

    addExercise({
      name: selectedExercise,
      weight: Number(weight),
      sets: Number(sets),
      reps: Number(reps),
      date: new Date().toISOString().split("T")[0],
      muscleGroup: selectedMuscle || "",
    })

    setSelectedMuscle(null)
    setSelectedExercise(null)
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
        <View className="flex-1 bg-black/60 justify-center px-4">
          <View className="bg-card rounded-2xl p-4 max-h-[85%]">
            <View className="flex-row items-center gap-2 mb-4">
              <Dumbbell size={20} className="text-primary" />
              <Text className="text-lg font-bold text-foreground">
                Log Today’s Exercise
              </Text>
            </View>

            {/* Muscle Groups */}
            {!selectedMuscle && (
              <ScrollView className="gap-3">
                {muscleGroups.map((muscle) => (
                  <Pressable
                    key={muscle}
                    onPress={() => setSelectedMuscle(muscle)}
                    className="flex-row justify-between items-center bg-secondary rounded-xl p-4 mb-3"
                  >
                    <Text className="text-base font-medium text-foreground">
                      {muscle}
                    </Text>
                    <ChevronRight size={18} className="text-muted-foreground" />
                  </Pressable>
                ))}
              </ScrollView>
            )}

            {/* Exercise List */}
            {selectedMuscle && !selectedExercise && (
              <ScrollView>
                <Pressable
                  onPress={() => setSelectedMuscle(null)}
                  className="mb-3"
                >
                  <Text className="text-primary">← Back to Muscle Groups</Text>
                </Pressable>

                {exercises.map((ex) => (
                  <View
                    key={ex.name}
                    className="bg-secondary rounded-xl p-3 mb-3 flex-row justify-between"
                  >
                    <View className="flex-1 pr-2">
                      <Text className="font-medium text-foreground">
                        {ex.name}
                      </Text>
                      <Text className="text-xs text-muted-foreground">
                        {ex.description}
                      </Text>
                    </View>

                    <View className="flex-row gap-2">
                      <Pressable
                        onPress={() =>
                          router.push(`/workout`)
                        }
                        className="p-2"
                      >
                        <Play size={18} className="text-primary" />
                      </Pressable>

                      <Pressable
                        onPress={() => setSelectedExercise(ex.name)}
                        className="p-2"
                      >
                        <Plus size={18} className="text-primary" />
                      </Pressable>
                    </View>
                  </View>
                ))}
              </ScrollView>
            )}

            {/* Log Form */}
            {selectedExercise && (
              <View className="gap-3">
                <Pressable onPress={() => setSelectedExercise(null)}>
                  <Text className="text-primary">← Back to Exercises</Text>
                </Pressable>

                <View className="bg-secondary rounded-xl p-3">
                  <Text className="font-semibold text-foreground">
                    {selectedExercise}
                  </Text>
                  <Text className="text-sm text-muted-foreground">
                    {selectedMuscle}
                  </Text>
                </View>

                <View className="flex-row gap-2">
                  <TextInput
                    placeholder="Weight"
                    keyboardType="numeric"
                    value={weight}
                    onChangeText={setWeight}
                    className="flex-1 bg-secondary rounded-xl px-3 py-2 text-foreground"
                  />
                  <TextInput
                    placeholder="Sets"
                    keyboardType="numeric"
                    value={sets}
                    onChangeText={setSets}
                    className="flex-1 bg-secondary rounded-xl px-3 py-2 text-foreground"
                  />
                  <TextInput
                    placeholder="Reps"
                    keyboardType="numeric"
                    value={reps}
                    onChangeText={setReps}
                    className="flex-1 bg-secondary rounded-xl px-3 py-2 text-foreground"
                  />
                </View>

                <Pressable
                  onPress={handleAdd}
                  className="bg-primary py-3 rounded-xl mt-2"
                >
                  <Text className="text-white text-center font-semibold">
                    Add Exercise
                  </Text>
                </Pressable>
              </View>
            )}

            {/* Close */}
            <Pressable
              onPress={() => setOpen(false)}
              className="mt-3"
            >
              <Text className="text-center text-muted-foreground">Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </>
  )
}