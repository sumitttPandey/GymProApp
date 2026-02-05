import { View, Text } from "react-native"
import { useMemo } from "react"
import {
  VictoryArea,
  VictoryBar,
  VictoryChart,
  VictoryAxis,
  VictoryTheme,
} from "victory"
import { useGymStore, computeWeeklyData, computeMonthlyData } from "@/app/lib/use-gym-store"

interface WorkoutProgressChartProps {
  timeRange: "weekly" | "monthly"
}

export function WorkoutProgressChart({ timeRange }: WorkoutProgressChartProps) {
  const exercises = useGymStore((state) => state.exercises)

  const weeklyData = useMemo(() => computeWeeklyData(exercises), [exercises])
  const monthlyData = useMemo(() => computeMonthlyData(exercises), [exercises])

  const chartData =
    timeRange === "weekly"
      ? weeklyData.map((d) => ({ x: d.date, y: d.totalWeight, sets: d.totalSets }))
      : monthlyData.map((d) => ({ x: d.week, y: d.weight, sets: d.sets }))

  const hasData = chartData.some((d) => d.y > 0 || d.sets > 0)

  if (!hasData) {
    return (
      <View className="bg-card rounded-2xl p-6 h-[300px] items-center justify-center">
        <Text className="text-muted-foreground text-center">
          No workout data yet{"\n"}Log your first exercise 🚀
        </Text>
      </View>
    )
  }

  return (
    <View className="bg-card rounded-2xl p-4">

      <Text className="text-lg font-semibold text-foreground mb-4">
        Workout Progress
      </Text>

      {/* Weight Area Chart */}
      <VictoryChart
        height={250}
        theme={VictoryTheme.material}
        domainPadding={{ x: 20 }}
      >
        <VictoryAxis
          style={{ tickLabels: { fontSize: 10, fill: "#9CA3AF" } }}
        />
        <VictoryAxis
          dependentAxis
          style={{ tickLabels: { fontSize: 10, fill: "#9CA3AF" } }}
        />
        <VictoryArea
          interpolation="monotoneX"
          data={chartData}
          style={{
            data: {
              fill: "rgba(99,102,241,0.3)",
              stroke: "#6366F1",
              strokeWidth: 2,
            },
          }}
        />
      </VictoryChart>

      {/* Sets Bar Chart */}
      <VictoryChart
        height={180}
        theme={VictoryTheme.material}
        domainPadding={{ x: 20 }}
      >
        <VictoryAxis
          style={{ tickLabels: { fontSize: 10, fill: "#9CA3AF" } }}
        />
        <VictoryBar
          data={chartData}
          x="x"
          y="sets"
          style={{
            data: {
              fill: "#22C55E",
              borderRadius: 4,
            },
          }}
        />
      </VictoryChart>

    </View>
  )
}