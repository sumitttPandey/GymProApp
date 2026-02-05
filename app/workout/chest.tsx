import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  FlatList,
  Dimensions,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const { width } = Dimensions.get("window");

export default function WorkoutScreen() {
  const router = useRouter();

  const workouts = [
    {
      name: "Push Ups",
      route: "/Exercise/pushups", // category = "pushups"
      image: "https://training.fit/wp-content/uploads/2020/02/liegestuetze-800x448.png",
    },
    {
      name: "Dumbbell Press",
      route: "/Exercise/dumbbell", // category = "dumbbell"
      image: "https://liftmanual.com/wp-content/uploads/2023/04/dumbbell-twisting-bench-press.jpg",
    },
    {
      name: "Barbell Press",
      route: "/Exercise/barbell", // category = "barbell"
      image: "https://www.shutterstock.com/image-illustration/closegrip-barbell-bench-press-3d-600nw-430936051.jpg",
    },
    {
      name: "Rope Pushdown",
      route: "/Exercise/rope", // category = "rope"
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhfSr1N6hru3Gtw1W3R6IrWHh_YrpWDFG7-A&s",
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
          Chest Workout
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