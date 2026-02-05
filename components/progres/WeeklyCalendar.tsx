import { View, Text } from "react-native"
import { Check, X } from "lucide-react-native"

const weekDays = [
  { day: "Mon", date: 6, completed: true, workout: "Upper Body" },
  { day: "Tue", date: 7, completed: true, workout: "Cardio" },
  { day: "Wed", date: 8, completed: true, workout: "Legs" },
  { day: "Thu", date: 9, completed: false, workout: "Rest Day" },
  { day: "Fri", date: 10, completed: true, workout: "Push" },
  { day: "Sat", date: 11, completed: true, workout: "Pull" },
  { day: "Sun", date: 12, completed: false, workout: "Core", isToday: true },
]

export function WeeklyCalendar() {
  return (
    <View className="bg-card rounded-2xl p-4">

      {/* Title */}
      <Text className="text-lg font-semibold text-foreground mb-3">
        This Week
      </Text>

      {/* Calendar row */}
      <View className="flex-row justify-between mb-4">
        {weekDays.map((item) => {
          const isToday = item.isToday

          return (
            <View
              key={item.day}
              className={`items-center p-3 rounded-xl w-[13%]
                ${isToday ? "bg-primary" : "bg-secondary/50"}
              `}
            >
              <Text
                className={`text-xs font-medium ${
                  isToday ? "text-primary-foreground/80" : "text-muted-foreground"
                }`}
              >
                {item.day}
              </Text>

              <Text
                className={`text-lg font-bold my-1 ${
                  isToday ? "text-primary-foreground" : "text-foreground"
                }`}
              >
                {item.date}
              </Text>

              <View
                className={`w-6 h-6 rounded-full items-center justify-center
                  ${
                    item.completed
                      ? "bg-chart-1"
                      : isToday
                      ? "bg-primary-foreground/20"
                      : "bg-muted"
                  }
                `}
              >
                {item.completed ? (
                  <Check size={12} color="white" />
                ) : (
                  <X size={12} color={isToday ? "white" : "#9CA3AF"} />
                )}
              </View>
            </View>
          )
        })}
      </View>

      {/* Workout list */}
      <View className="space-y-2">
        {weekDays.map((item) => (
          <View
            key={item.day}
            className={`flex-row items-center justify-between p-3 rounded-lg
              ${
                item.isToday
                  ? "bg-primary/10 border border-primary/30"
                  : "bg-secondary/30"
              }
            `}
          >
            <View className="flex-row items-center gap-3">
              <Text className="w-10 text-sm font-medium text-foreground">
                {item.day}
              </Text>
              <Text className="text-sm text-muted-foreground">
                {item.workout}
              </Text>
            </View>

            {item.completed && (
              <Text className="text-xs text-chart-1 font-medium">
                Completed
              </Text>
            )}

            {item.isToday && !item.completed && (
              <Text className="text-xs text-primary font-medium">
                Today
              </Text>
            )}
          </View>
        ))}
      </View>

    </View>
  )
}