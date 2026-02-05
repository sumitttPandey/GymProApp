import { View, Text } from "react-native"

export function ExerciseProgressChart({ data }: { data: any[] }) {
  if (data.length === 0) {
    return (
      <Text className="text-[#9CA3AF]">
        No data for this exercise
      </Text>
    )
  }

  const max = Math.max(...data.map(d => d.volume))

  return (
    <View className="mt-4">
      {data.map((d, i) => (
        <View key={i} className="mb-3">
          <Text className="text-[#9CA3AF] text-xs mb-1">
            {d.date}
          </Text>

          <View className="flex-row items-center gap-3">
            <View className="flex-1 h-3 bg-[#1F2937] rounded-full overflow-hidden">
              <View
                className="h-3 bg-indigo-500"
                style={{
                  width: `${(d.volume / max) * 100}%`,
                }}
              />
            </View>
            <Text className="text-white text-xs">
              {d.volume}
            </Text>
          </View>
        </View>
      ))}
    </View>
  )
}