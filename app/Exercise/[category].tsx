import React from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, useLocalSearchParams } from "expo-router";
import YoutubePlayer from "react-native-youtube-iframe";

export default function ExerciseScreen() {
  const router = useRouter();
  const { category } = useLocalSearchParams();

  // Extract YouTube ID from ANY URL
  const getYouTubeID = (url: string) => {
    if (!url) return null;
    const regex =
      /(?:youtube\.com\/.*v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]+)/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  // ------------------- EXERCISE LISTS -------------------

  const dExercises = [
    {
      id: "1",
      title: "Flat Dumbbell Press",
      video: "https://www.youtube.com/embed/VmB1G1K7v94",
      instructions:
        "Perform 3 sets of 8–12 reps. Keep your back flat on the bench and control the movement while pressing.",
    },
    {
      id: "2",
      title: "Incline Dumbbell Press",
      video: "https://www.youtube.com/embed/8iPEnn-ltC8",
      instructions:
        "Adjust bench to 30–45°. Focus on pressing with your upper chest.",
    },
    {
      id: "3",
      title: "Decline Dumbbell Press",
      video: "https://www.youtube.com/embed/Pf1nDoqx_1A",
      instructions:
        "Secure your legs on decline bench and press the dumbbells with control.",
    },
  ];

  const bExercises = [
    {
      id: "1",
      title: "Flat Barbell Bench Press",
      video: "https://www.youtube.com/embed/SCVCLChPQFY",
      instructions:
        "Lie flat on bench, grip slightly wider than shoulders, brace core and press.",
    },
    {
      id: "2",
      title: "Incline Barbell Bench Press",
      video: "https://www.youtube.com/embed/PZ7waXzAzZc",
      instructions:
        "Bench at 30–45° incline. Lower bar to upper chest, press smoothly.",
    },
    {
      id: "3",
      title: "Decline Barbell Bench Press",
      video: "https://www.youtube.com/embed/lKPjipHRl4w",
      instructions:
        "Use decline bench. Lower bar to lower chest. Great for lower pecs.",
    },
  ];

  const rExercises = [
    {
      id: "1",
      title: "Rope Pushdown",
      video: "https://www.youtube.com/embed/u68kD9MGZ80",
      instructions:
        "Grip rope ends, elbows tight to body. Push rope down until full extension.",
    },
  ];

  const pExercises = [
    {
      id: "1",
      title: "Standard Push Ups",
      video: "https://www.youtube.com/embed/WDIpL0pjun0",
      instructions:
        "Hands under shoulders, body straight. Lower chest near floor and push up.",
    },
    {
      id: "2",
      title: "Incline Push Ups",
      video: "https://www.youtube.com/embed/Gvm5Q29UHbk",
      instructions:
        "Hands on elevated surface, keep body straight, lower chest to the platform.",
    },
    {
      id: "3",
      title: "Decline Push Ups",
      video: "https://www.youtube.com/embed/DBz85WuXqMk",
      instructions:
        "Feet elevated. Lower chest to floor and push up.",
    },
    {
      id: "4",
      title: "Diamond Push Ups",
      video: "https://www.youtube.com/embed/J0DnG1_S92I",
      instructions:
        "Hands form a diamond under chest. Elbows tight. Great for triceps.",
    },
    {
      id: "5",
      title: "Knee Push Ups",
      video: "https://www.youtube.com/embed/bwWlK8f1-NM",
      instructions:
        "Knees on floor, body straight. Lower chest down and push up.",
    },
  ];

  const pullExercises = [
    {
      id: "1",
      title: "Pull Ups",
      video: "https://www.youtube.com/embed/eGo4IYlbE5g",
      instructions:
        "Grip the bar slightly wider than shoulders. Pull chest toward bar while keeping core tight. Lower with control.",
    },
  ]
  const latExercises = [
    {
      id: "1",
      title: "Lat Pulldown",
      video: "https://www.youtube.com/embed/CAwf7n6Luuc",
      instructions:
        "Grip bar wide. Pull bar down to upper chest while squeezing lats. Avoid leaning back too much.",
    },
  ]
  const cableExercises = [
    {
      id: "1",
      title: "Seated Cable Row",
      video: "https://www.youtube.com/embed/qD1WZ5pSuvk",
      instructions:
        "Sit upright, pull handle toward your waist. Keep chest tall and squeeze shoulder blades together.",
    },
  ]
  const barbellExercises = [
    {
      id: "1",
      title: "Barbell Row(Bent Over)",
      video: "https://www.youtube.com/embed/vT2GjY_Umpw",
      instructions:
        "Hinge at hips, bar just below knees. Pull bar toward lower ribs while keeping back straight.",
    },
    {
      id: "1",
      title: "Reverse Barbell Row(Bent Over)",
      video: "https://www.youtube.com/embed/qXrTDQG1oUQ",
      instructions:
        "Hinge at hips, bar just below knees. Pull bar toward lower ribs while keeping back straight & hands reverse.",
    },
  ];

  const longHeadBiceps = [
    {
      id: "1",
      title: "Dumbbell Alternate Curl",
      video: "https://www.youtube.com/embed/8d2we4UqOSs",
      instructions:
        "Curl one dumbbell at a time while rotating palm upward. Keep elbows slightly behind body to target long head.",
    },
    {
      id: "2",
      title: "Incline Dumbbell Curl",
      video: "https://www.youtube.com/embed/HhHHBj3qTJ4",
      instructions:
        "Sit on incline bench with arms hanging back. Curl dumbbells up focusing on stretch and peak contraction.",
    },
    {
      id: "3",
      title: "EZ Bar Curl (Wide Grip)",
      video: "https://www.youtube.com/embed/0dGZXGOijC0",
      instructions:
        "Use wider grip on EZ bar to emphasize outer biceps and peak.",
    },
  ];

  const shortHeadBiceps = [
    {
      id: "1",
      title: "Barbell Curl",
      video: "https://www.youtube.com/embed/kwG2ipFRgfo",
      instructions:
        "Grip barbell shoulder-width. Curl up while keeping elbows close to torso.",
    },
    {
      id: "2",
      title: "EZ Bar Curl (Close Grip)",
      video: "https://www.youtube.com/embed/kwG2ipFRgfo",
      instructions:
        "Use close grip to emphasize inner biceps thickness.",
    },
    {
      id: "3",
      title: "Machine Preacher Curl",
      video: "https://www.youtube.com/embed/4T9UQ4FBbXk",
      instructions:
        "Sit on preacher machine and curl handles upward with strict form.",
    },
  ];

  const brachialisExercises = [
    {
      id: "1",
      title: "Dumbbell Hammer Curl",
      video: "https://www.youtube.com/embed/zC3nLlEvin4",
      instructions:
        "Hold dumbbells with palms facing each other. Curl up while keeping elbows fixed.",
    },
    {
      id: "2",
      title: "EZ Bar Hammer Curl",
      video: "https://www.youtube.com/embed/soxrZlIl35U",
      instructions:
        "Use neutral grip on EZ bar to focus on brachialis.",
    },
  ];

  const forearmBiceps = [
    {
      id: "1",
      title: "Reverse Barbell Curl",
      video: "https://www.youtube.com/embed/qXrTDQG1oUQ",
      instructions:
        "Grip barbell with palms facing down. Curl bar upward focusing on forearms.",
    },
    {
      id: "2",
      title: "Rope Cable Curl",
      video: "https://www.youtube.com/embed/FHyM5zYx5xQ",
      instructions:
        "Attach rope to low pulley. Curl rope upward while keeping palms neutral.",
    },
  ];

  // ------------------- CHOOSE CATEGORY -------------------

  let data: any[] = [];
  let title = "";

  switch (category) {
    case "dumbbell":
      data = dExercises;
      title = "Dumbbell Press Variations";
      break;
    case "barbell":
      data = bExercises;
      title = "Barbell Press Variations";
      break;
    case "pushups":
      data = pExercises;
      title = "Push Ups Variations";
      break;
    case "rope":
      data = rExercises;
      title = "Rope Pushdowns";
      break;
    case "pullups":
      data = pullExercises;
      title = "Pull ups";
      break;
    case "latpulldown":
      data = latExercises;
      title = "Lat pullDown";
      break;
    case "seatedrows":
      data = cableExercises;
      title = "Seated Cable Row";
      break;
    case "barbellrows":
      data = barbellExercises;
      title = "Barbell Row";
      break;
    case "biceps-longhead":
      data = longHeadBiceps;
      title = "Biceps-Longhead";
      break;
    case "biceps-shorthead":
      data = shortHeadBiceps;
      title = "Biceps-Shorthead";
      break;
    case "brachialis":
      data = brachialisExercises;
      title = "Biceps Width";
      break;
    case "forearms":
      data = forearmBiceps;
      title = "Forearms";
      break;
  }

  // ------------------- UI -------------------

  return (
    <View className="flex-1 bg-white">
      {/* Header */}
      <View className="flex-row items-center px-4 py-3 pt-6 bg-black">
        <TouchableOpacity
          onPress={() => router.back()}
          className="mr-2 mt-6 p-1 rounded-full bg-gray-800"
        >
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text className="text-2xl font-bold text-white mt-6">{title}</Text>
      </View>

      {/* Exercise List */}
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => {
          const videoId = getYouTubeID(item.video);

          return (
            <View className="mb-8">
              <Text className="mt-6 ml-4 text-2xl font-bold text-black">
                {index + 1}. {item.title}
              </Text>

              <View className="h-56 mx-4 mt-3 rounded-xl overflow-hidden bg-black">
                {videoId ? (
                  <YoutubePlayer height={230} play={false} videoId={videoId} />
                ) : (
                  <Text className="text-center mt-24 text-gray-500">
                    Video unavailable
                  </Text>
                )}
              </View>

              <View className="px-4 mt-4">
                <Text className="text-lg font-semibold mb-2">Instructions</Text>
                <Text className="text-base text-gray-600 mb-4">
                  {item.instructions}
                </Text>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
}