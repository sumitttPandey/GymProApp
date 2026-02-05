import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Modal,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function BarbellPressScreen() {
  const router = useRouter();

  const totalSets = 3; // can make dynamic later
  const [modalVisible, setModalVisible] = useState(false);
  const [sets, setSets] = useState<any[]>([]);
  const [currentSet, setCurrentSet] = useState(1);
  const [weight, setWeight] = useState("");
  const [reps, setReps] = useState("");

  // Save Set
  const saveSet = () => {
    if (!weight || !reps) return;

    setSets((prev) => [
      ...prev,
      { set: currentSet, weight: weight, reps: reps, skipped: false },
    ]);

    if (currentSet < totalSets) {
      setCurrentSet((prev) => prev + 1);
    } else {
      setCurrentSet(totalSets + 1); // all done
    }

    setWeight("");
    setReps("");
    setModalVisible(false);
  };

  // Skip Set
  const skipSet = () => {
    setSets((prev) => [
      ...prev,
      { set: currentSet, weight: "-", reps: "-", skipped: true },
    ]);

    if (currentSet < totalSets) {
      setCurrentSet((prev) => prev + 1);
    } else {
      setCurrentSet(totalSets + 1); // completed
    }
  };

  return (
    <View className="flex-1 bg-white">
      {/* Header */}
      <View className="flex-row items-center pt-12 px-4 py-5 bg-black">
        <TouchableOpacity onPress={() => router.back()} className="mr-3">
          <Ionicons name="arrow-back" size={26} color="white" />
        </TouchableOpacity>
        <Text className="text-white text-lg font-bold">
          Incline Dumbell Press
        </Text>
      </View>

      {/* Show Saved Sets */}
      <FlatList
        data={sets}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{ padding: 16 }}
        renderItem={({ item }) => (
          <View className="bg-gray-100 p-4 rounded-lg mb-3 flex-row justify-between">
            <Text className="text-black font-semibold">Set {item.set}</Text>
            {item.skipped ? (
              <Text className="text-red-500 font-semibold">Skipped</Text>
            ) : (
              <>
                <Text className="text-black">Weight: {item.weight} kg</Text>
                <Text className="text-black">Reps: {item.reps}</Text>
              </>
            )}
          </View>
        )}
      />

      {/* Bottom Tracker & Buttons */}
      <View className="absolute bottom-0 left-0 right-0 bg-white p-4 shadow-lg rounded-t-2xl">
        {/* Progress Info */}
        <View className="items-center mb-3">
          {currentSet <= totalSets ? (
            <Text className="text-lg font-bold text-gray-800">
              Set {currentSet} of {totalSets}
            </Text>
          ) : (
            <Text className="text-lg font-bold text-green-700">
              Workout Completed 🎉
            </Text>
          )}

          {/* Progress Bar */}
          <View className="w-full h-2 bg-gray-200 rounded-full mt-2">
            <View
              className="h-2 bg-green-500 rounded-full"
              style={{
                width: `${(sets.length / totalSets) * 100}%`,
              }}
            />
          </View>
        </View>

        {/* Buttons */}
        <View className="flex-row justify-between">
          {/* Start Set */}
          <TouchableOpacity
            onPress={() => setModalVisible(true)}
            disabled={currentSet > totalSets}
            className={`flex-1 mr-2 py-4 rounded-full flex-row justify-center items-center ${
              currentSet > totalSets ? "bg-gray-400" : "bg-black"
            }`}
            activeOpacity={0.85}
          >
            <Ionicons
              name="barbell"
              size={20}
              color="white"
              style={{ marginRight: 8 }}
            />
            <Text className="text-white font-bold text-lg">
              {currentSet <= totalSets
                ? `Start Set ${currentSet}`
                : "Completed"}
            </Text>
          </TouchableOpacity>

          {/* Skip / Done */}
          {currentSet <= totalSets ? (
            <TouchableOpacity
              onPress={skipSet}
              className="flex-1 ml-2 py-4 rounded-full bg-yellow-500 flex-row justify-center items-center"
              activeOpacity={0.85}
            >
              <Ionicons
                name="play-skip-forward"
                size={20}
                color="white"
                style={{ marginRight: 8 }}
              />
              <Text className="text-white font-bold text-lg">Skip</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => router.back()}
              className="flex-1 ml-2 py-4 rounded-full bg-green-600 flex-row justify-center items-center"
              activeOpacity={0.85}
            >
              <Ionicons
                name="checkmark"
                size={20}
                color="white"
                style={{ marginRight: 8 }}
              />
              <Text className="text-white font-bold text-lg">Done</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Modal for entering reps & weight */}
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View className="flex-1 justify-center items-center bg-black/50">
          <View className="bg-white w-11/12 p-6 rounded-2xl">
            <Text className="text-xl font-bold mb-4">Set {currentSet}</Text>

            <TextInput
              placeholder="Enter Weight (kg)"
              value={weight}
              onChangeText={setWeight}
              keyboardType="numeric"
              className="border border-gray-300 rounded-lg px-4 py-3 mb-3"
            />

            <TextInput
              placeholder="Enter Reps"
              value={reps}
              onChangeText={setReps}
              keyboardType="numeric"
              className="border border-gray-300 rounded-lg px-4 py-3 mb-5"
            />

            <TouchableOpacity
              onPress={saveSet}
              className="bg-black py-3 rounded-lg items-center"
            >
              <Text className="text-white font-bold text-lg">Save Set</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              className="mt-3 items-center"
            >
              <Text className="text-red-500 font-semibold">Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}