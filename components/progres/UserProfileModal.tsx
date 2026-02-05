import { useState } from "react"
import { Modal, View, Text, TextInput, Pressable } from "react-native"
import { User, Ruler, Scale, X } from "lucide-react-native"
import { useGymStore } from "@/app/lib/use-gym-store"

export function UserProfileModal() {
  const [open, setOpen] = useState(false)

  const profile = useGymStore((s) => s.profile)
  const updateProfile = useGymStore((s) => s.updateProfile)

  const [name, setName] = useState(profile.name)
  const [height, setHeight] = useState(profile.height.toString())
  const [weight, setWeight] = useState(profile.weight.toString())
  const [goalCalories, setGoalCalories] = useState(profile.goalCalories.toString())
  const [goalProtein, setGoalProtein] = useState(profile.goalProtein.toString())

  const bmi = profile.weight / Math.pow(profile.height / 100, 2)

  const saveProfile = () => {
    updateProfile({
      name,
      height: Number(height),
      weight: Number(weight),
      goalCalories: Number(goalCalories),
      goalProtein: Number(goalProtein),
    })
    setOpen(false)
  }

  return (
    <>
      {/* Open button */}
      <Pressable
        onPress={() => setOpen(true)}
        className="w-10 h-10 rounded-lg border border-border items-center justify-center"
      >
        <User size={18} />
      </Pressable>

      <Modal transparent animationType="fade" visible={open}>
        <View className="flex-1 bg-black/50 items-center justify-center px-4">
          <View className="w-full max-w-md bg-card rounded-2xl p-5">

            {/* Header */}
            <View className="flex-row items-center justify-between mb-4">
              <View className="flex-row items-center gap-2">
                <User size={20} className="text-primary" />
                <Text className="text-lg font-semibold text-foreground">
                  Your Profile
                </Text>
              </View>

              <Pressable onPress={() => setOpen(false)}>
                <X size={20} />
              </Pressable>
            </View>

            {/* Stats */}
            <View className="flex-row justify-between bg-secondary/40 rounded-xl p-4 mb-4">
              <View className="items-center flex-1">
                <Ruler size={18} />
                <Text className="font-bold text-foreground">{profile.height} cm</Text>
                <Text className="text-xs text-muted-foreground">Height</Text>
              </View>

              <View className="items-center flex-1">
                <Scale size={18} />
                <Text className="font-bold text-foreground">{profile.weight} kg</Text>
                <Text className="text-xs text-muted-foreground">Weight</Text>
              </View>

              <View className="items-center flex-1">
                <Text className="text-xs font-bold text-chart-2">BMI</Text>
                <Text className="font-bold text-foreground">{bmi.toFixed(1)}</Text>
                <Text className="text-xs text-muted-foreground">
                  {bmi < 18.5
                    ? "Underweight"
                    : bmi < 25
                    ? "Normal"
                    : bmi < 30
                    ? "Overweight"
                    : "Obese"}
                </Text>
              </View>
            </View>

            {/* Inputs */}
            <View className="gap-3">
              <TextInput
                placeholder="Name"
                value={name}
                onChangeText={setName}
                className="bg-secondary rounded-lg px-4 py-3 text-foreground"
              />

              <View className="flex-row gap-3">
                <TextInput
                  placeholder="Height (cm)"
                  keyboardType="numeric"
                  value={height}
                  onChangeText={setHeight}
                  className="flex-1 bg-secondary rounded-lg px-4 py-3 text-foreground"
                />
                <TextInput
                  placeholder="Weight (kg)"
                  keyboardType="numeric"
                  value={weight}
                  onChangeText={setWeight}
                  className="flex-1 bg-secondary rounded-lg px-4 py-3 text-foreground"
                />
              </View>

              <View className="flex-row gap-3">
                <TextInput
                  placeholder="Daily Calories"
                  keyboardType="numeric"
                  value={goalCalories}
                  onChangeText={setGoalCalories}
                  className="flex-1 bg-secondary rounded-lg px-4 py-3 text-foreground"
                />
                <TextInput
                  placeholder="Protein (g)"
                  keyboardType="numeric"
                  value={goalProtein}
                  onChangeText={setGoalProtein}
                  className="flex-1 bg-secondary rounded-lg px-4 py-3 text-foreground"
                />
              </View>
            </View>

            {/* Save */}
            <Pressable
              onPress={saveProfile}
              className="mt-5 bg-primary rounded-xl py-3 items-center"
            >
              <Text className="text-primary-foreground font-semibold">
                Save Profile
              </Text>
            </Pressable>

          </View>
        </View>
      </Modal>
    </>
  )
}