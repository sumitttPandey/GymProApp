import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { SafeAreaView, ScrollView } from "react-native";

export default function WorkoutScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView style={{ flex: 1 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: 10,
            marginTop: 10,
          }}
        >
          {/* Back Button */}
          <TouchableOpacity
            onPress={() => router.push("/workout")}
            style={{
              padding: 10,
              borderRadius: 50,
              backgroundColor: "#f2f2f2",
              marginRight: 10,
            }}
          >
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>

          {/* Title */}
          <Text style={{ fontSize: 20, fontWeight: "bold", color: "black" }}>
            Triceps Workout
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}