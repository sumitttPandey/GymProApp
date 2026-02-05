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
import { useRouter } from "expo-router";
import { Button } from "@react-navigation/elements";

const { width } = Dimensions.get("window");

const workouts = [
  {
    name: "Chest",
    route: "/workout/chest",
    image:
      "/Users/scoobydoo/Desktop/personal/ReactNative/GymProApp/assets/images/chest.jpeg"
  },
  { name: "Back", route: "/workout/back", image: "/Users/scoobydoo/Desktop/personal/ReactNative/GymProApp/assets/images/back.jpeg" },
  { name: "Biceps", route: "/workout/biceps", image: "https://thumbs.dreamstime.com/b/close-up-man-s-hand-bicep-28881705.jpg" },
  { name: "Triceps", route: "/workout/triceps", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKeSK3v-t8uwlQNM8ndCb9lv_sVB5jvvX9PA&s" },
  { name: "Legs", route: "/workout/legs", image: "/Users/scoobydoo/Pictures/Photos Library.photoslibrary/resources/derivatives/C/C53DC22C-1ABB-46B7-9961-B6DE728AFDAF_1_105_c.jpeg" },
  { name: "Shoulders", route: "/workout/shoulders", image: "//Users/scoobydoo/Desktop/personal/ReactNative/GymProApp/assets/images/shoulder.jpg" },
  { name: "Abs", route: "/workout/abs", image: "/Users/scoobydoo/Desktop/personal/ReactNative/GymProApp/assets/images/abs.jpg" },
];

export default function WorkoutMenu() {
  const router = useRouter();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>

     <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          padding: 16,
          backgroundColor: "#000",
          marginTop:-59,
          marginBottom: 20,
        }}
      >
        <Text style={{ fontSize: 20, fontWeight: "bold", color: "white",marginTop:30 }}>
          Start Workout
        </Text>
      </View>

      <FlatList
        data={workouts}
        keyExtractor={(item) => item.name}
        numColumns={1}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => router.push(item.route as any)}
            style={{
              width: width -30, 
              height: 180,
              borderRadius: 20,
              overflow: "hidden",
              marginBottom: 20,
              backgroundColor: "#eee",
              alignSelf: "center",
              shadowColor: "#000",
              shadowOpacity: 0.15,
              shadowOffset: { width: 0, height: 5 },
              shadowRadius: 8,
              elevation: 5,
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
                  backgroundColor: "rgba(0,0,0,0.45)",
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