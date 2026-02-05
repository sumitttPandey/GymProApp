import { View, Text } from "react-native";

export default function OnboardingLayout({
  step,
  title,
  subtitle,
  children,
}: any) {
  return (
    <View className="flex-1 bg-white px-6 pt-16">
      {/* STEP */}
      <Text className="text-gray-400 text-sm mb-2">
        STEP {step} OF 4
      </Text>

      {/* TITLE */}
      <Text className="text-3xl font-bold text-black mb-2">
        {title}
      </Text>

      {/* SUBTITLE */}
      <Text className="text-gray-500 text-base mb-10">
        {subtitle}
      </Text>

      {children}
    </View>
  );
}