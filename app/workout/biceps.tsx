import React from "react";
import { View, Text, TouchableOpacity, ImageBackground, FlatList, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { SafeAreaView, ScrollView } from "react-native";

const { width } = Dimensions.get("window");

export default function WorkoutScreen() {
  const router = useRouter();

 const workouts = [
  {
    name: "Long Head (Biceps Peak)",
    route: "/Exercise/biceps-longhead",
    image:
      "https://fitliferegime.com/wp-content/uploads/2022/06/Best-Long-Head-Bicep-Exercises.jpg",
  },
  {
    name: "Short Head (Biceps Thickness)",
    route: "/Exercise/biceps-shorthead",
    image:
      "https://fitliferegime.com/wp-content/uploads/2022/06/Best-Short-Head-Bicep-Exercises.jpg",
  },
  {
    name: "Brachialis (Arm Width)",
    route: "/Exercise/brachialis",
    image:
      "https://fitliferegime.com/wp-content/uploads/2022/06/Best-Brachialis-Exercises.jpg",
  },
  {
    name: "Forearms / Brachioradialis",
    route: "/Exercise/forearms",
    image:
      "https://lh6.googleusercontent.com/proxy/27qO6ZGA6JZ-Rwb7WJPtEB6-F39LpQqJRu6Cz6HFQlBQ9KdOMMlj6JRH8J6upE_dVyxZnqvNyRCDdNkQ9AP5MLtUitaTXwahZ7Wt9EpVPZT2Za7E1UeD9UNJuBBi1MGvPzLqDO2VftIwHOjT8_Fn9ekj4ZSdBFasMwi6CN6u",
  },
];
  
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
        {/* Header */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            padding: 13,
            backgroundColor: "black",
            marginTop: -59
          }}
        >
          <TouchableOpacity onPress={() => router.push("/workout")} style={{ marginRight: 10, marginTop: 30 }}>
            <Ionicons name="arrow-back" size={26} color="white" />
          </TouchableOpacity>
          <Text style={{ fontSize: 20, fontWeight: "bold", color: "white", marginTop: 30 }}>
            Biceps Workout
          </Text>
        </View>
  
        {/* Workout List */}
        <FlatList
          data={workouts}
          keyExtractor={(item) => item.name}
          numColumns={1}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ padding: 16 }}
          renderItem={({ item }) => (
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => router.push(item.route as any)}
              style={{
                width: width - 32,
                height: 200,
                borderRadius: 20,
                overflow: "hidden",
                marginBottom: 20,
                alignSelf: "center",
                backgroundColor: "#fff",
                shadowColor: "red",
                shadowOpacity: 0.8,
                shadowOffset: { width: 0, height: 6 },
                shadowRadius: 10,
              }}
            >
              <ImageBackground
                source={{ uri: item.image }}
                style={{
                  flex: 1,
                  justifyContent: "flex-end",
                }}
                imageStyle={{
                  borderRadius: 20,
                }}
              >
                {/* Overlay */}
                <View
                  style={{
                    backgroundColor: "rgba(0,0,0,0.6)",
                    paddingVertical: 12,
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      color: "#fff",
                      fontSize: 22,
                      fontWeight: "700",
                      letterSpacing: 1,
                    }}
                  >
                    {item.name}
                  </Text>
                </View>
              </ImageBackground>
            </TouchableOpacity>
          )}
        />
      </SafeAreaView>
    );
  }