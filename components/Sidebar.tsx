import { useState } from "react"
import { View, Text, Pressable } from "react-native"
import {
  LayoutDashboard,
  Dumbbell,
  Apple,
  TrendingUp,
  Calendar,
  Settings,
  User,
  Menu,
  X,
} from "lucide-react-native"

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", active: true },
  { icon: Dumbbell, label: "Workouts", active: false },
  { icon: Apple, label: "Nutrition", active: false },
  { icon: TrendingUp, label: "Progress", active: false },
  { icon: Calendar, label: "Schedule", active: false },
  { icon: Settings, label: "Settings", active: false },
]

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Mobile menu button */}
      <Pressable
        onPress={() => setIsOpen(!isOpen)}
        className="lg:hidden absolute top-4 left-4 z-50 p-2 bg-card rounded-lg border border-border"
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </Pressable>

      {/* Overlay */}
      {isOpen && (
        <Pressable
          className="lg:hidden absolute inset-0 bg-background/80 z-40"
          onPress={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <View
        className={`
          absolute lg:relative
          left-0 top-0 bottom-0 z-40
          w-64 bg-sidebar border-r border-sidebar-border
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Logo */}
        <View className="p-6 border-b border-sidebar-border">
          <View className="flex-row items-center gap-3">
            <View className="w-10 h-10 rounded-xl bg-primary items-center justify-center">
              <Dumbbell size={20} color="white" />
            </View>
            <Text className="text-xl font-bold text-sidebar-foreground">
              FitTrack
            </Text>
          </View>
        </View>

        {/* Navigation */}
        <View className="flex-1 p-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon
            return (
              <Pressable
                key={item.label}
                className={`
                  flex-row items-center gap-3
                  px-4 py-3 rounded-lg
                  ${item.active ? "bg-sidebar-accent" : ""}
                `}
              >
                <Icon
                  size={20}
                  color={item.active ? "#22c55e" : "#9ca3af"}
                />
                <Text
                  className={`text-sm font-medium ${
                    item.active
                      ? "text-sidebar-primary"
                      : "text-sidebar-foreground/70"
                  }`}
                >
                  {item.label}
                </Text>
              </Pressable>
            )
          })}
        </View>

        {/* User */}
        <View className="p-4 border-t border-sidebar-border">
          <View className="flex-row items-center gap-3 px-4 py-3">
            <View className="w-10 h-10 rounded-full bg-accent items-center justify-center">
              <User size={20} color="white" />
            </View>
            <View className="flex-1">
              <Text className="text-sm font-medium text-sidebar-foreground">
                Alex Johnson
              </Text>
              <Text className="text-xs text-muted-foreground">
                Pro Member
              </Text>
            </View>
          </View>
        </View>
      </View>
    </>
  )
}