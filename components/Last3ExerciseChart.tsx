import { View, Text, Dimensions } from "react-native"
import { BarChart } from "react-native-chart-kit"

type ChartItem = {
  label: string
  volume: number
}

type Props = {
  data: ChartItem[]
}

const screenWidth = Dimensions.get("window").width - 40

export function Last3ExerciseChart({ data }: Props) {
  if (!data || data.length === 0) {
    return (
      <Text className="text-[#9CA3AF] mt-2">
        Select an exercise to see progress
      </Text>
    )
  }

  return (
    <View className="bg-[#151A2E] rounded-2xl p-4 mt-4">
      <Text className="text-white font-semibold mb-3">
        Last 3 Sessions Comparison
      </Text>

      <BarChart
        data={{
          labels: data.map(d => d.label),
          datasets: [{ data: data.map(d => d.volume) }],
        }}
        width={screenWidth}
        height={220}
        fromZero
        yAxisLabel=""        // ✅ REQUIRED BY TYPES
        yAxisSuffix=""       // ✅ REQUIRED BY TYPES
        chartConfig={{
          backgroundGradientFrom: "#151A2E",
          backgroundGradientTo: "#151A2E",
          decimalPlaces: 0,
          color: () => "#6366F1",
          labelColor: () => "#9CA3AF",
        }}
        style={{ borderRadius: 16 }}
      />
    </View>
  )
}