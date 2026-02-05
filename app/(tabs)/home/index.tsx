import React, { useEffect, useState } from "react";
import ScoreCard from "../../scoreCard/scorecard";
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Image,
  ImageBackground,
} from "react-native";
import { useRouter } from "expo-router";
import { getAuth } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase/firebaseConfig";
import WaterTracker from "../../waterTracker/waterTracker";
import NutritionCard from "@/app/nutrition/nutrition";

export default function HomeScreen() {
  const router = useRouter();
  const auth = getAuth();
  const [userName, setUserName] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const today = new Date();

  const formattedDate = today.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      if (auth.currentUser) {
        const userDoc = await getDoc(doc(db, "users", auth.currentUser.uid));
        if (userDoc.exists()) {
          setUserName(userDoc.data().name || "User");
          setProfilePic(
            userDoc.data().photoURL ||
            "https://cdn-icons-png.flaticon.com/512/847/847969.png"
          );
        }
      }
    };
    fetchUserData();
  }, []);

  return (
    <ScrollView className="flex-1 bg-white px-5 pt-12">
      {/* Header */}
      <View className="mb-4">
        <ImageBackground
          source={require("../../../assets/images/header.jpg")}
          resizeMode="cover"
          className="flex-column p-4 rounded-xl overflow-hidden"
        >
          <View className="flex-row justify-between items-center">
            <Text className="text-white text-xl font-bold">
              {formattedDate}
            </Text>
            <TouchableOpacity onPress={() => router.push("/profile")}>
              <Image
                source={{ uri: profilePic }}
                className="w-10 h-10 rounded-full border-2 border-white"
              />
            </TouchableOpacity>
          </View>
          <Text className="text-white font-bold text-lg leading-8 mt-2">
            Hello, {userName}
          </Text>
        </ImageBackground>
      </View>

      {/* Quote */}
      <View className="bg-black rounded-xl p-3" >
      <Text className="text-white text-lg font-bold leading-6 mb-3">
        Push yourself because no one else is going to do it for you.
      </Text>
      </View>
      <TouchableOpacity className="mt-2">
        <Text className="text-orange-900 font-semibold underline text-base" 
        onPress={() => router.push("/workout")}>
          Start Workout →
        </Text>
      </TouchableOpacity>

      {/* Workout Categories */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="mb-6 mt-6 h-60 "
      >
        {/* Score Card */}
        <View className="bg-orange-500 rounded-2xl p-9 mr-3 justify-center items-center">
          <ScoreCard score={87} />
        </View>

        {/* Water Tracker */}
        <View className=" bg-blue-500 rounded-2xl p-9 mr-3 justify-center items-center">
          <WaterTracker />
        </View>

        {/* Example: Nutrition Card */}
        <View className="bg-gray-500 rounded-2xl p-9 mr-3 justify-center items-center">
            <NutritionCard calories={1800} protein={120} carbs={200} fat={50} />
          </View>
      </ScrollView>

      {/* Recent Workouts */}
      <Text className="text-black text-xl font-bold mb-4">Recent Workouts</Text>
      <View className="bg-neutral-900 rounded-2xl p-4 mb-4 border border-white/10">
        <Text className="text-white font-semibold">Full Body Blast</Text>
        <Text className="text-gray-400 text-sm">45 mins • 350 kcal</Text>
      </View>
      <View className="bg-neutral-900 rounded-2xl p-4 mb-20 border border-white/10">
        <Text className="text-white font-semibold">HIIT Cardio</Text>
        <Text className="text-gray-400 text-sm">20 mins • 200 kcal</Text>
      </View>
    </ScrollView>
  );
}