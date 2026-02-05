// app/auth/login.tsx
import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, Image } from "react-native";
import { useRouter } from "expo-router";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth, db } from "@/firebase/firebaseConfig";
import * as ImagePicker from "expo-image-picker";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState("");
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const router = useRouter();

  // Pick image from gallery
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  // Upload image to Firebase Storage
  const uploadProfileImage = async (uri: string, uid: string) => {
    const storage = getStorage();
    const response = await fetch(uri);
    const blob = await response.blob();

    const storageRef = ref(storage, `profilePictures/${uid}.jpg`);
    await uploadBytes(storageRef, blob);

    return await getDownloadURL(storageRef);
  };

  const handleAuth = async () => {
    if (!email || !password) {
      setError("Please enter email and password.");
      return;
    }

    try {
      if (isSignUp) {
        const userCred = await createUserWithEmailAndPassword(auth, email, password);

        let photoURL = "";
        if (profileImage) {
          photoURL = await uploadProfileImage(profileImage, userCred.user.uid);
          await updateProfile(userCred.user, { photoURL });
        }

        Alert.alert("Account Created", "Welcome to GymPro!");
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        Alert.alert("Welcome Back!", email);
      }

      router.replace("/height");
    } catch (err: any) {
      console.log("Firebase Auth Error:", err);
      setError(err.message);
    }
  };

  return (
    <View className="flex-1 justify-center px-6 bg-white">
      {/* Profile Image */}
      {isSignUp && (
        <TouchableOpacity onPress={pickImage} className="self-center mb-6">
          <Image
            source={{
              uri: profileImage || "https://via.placeholder.com/100",
            }}
            style={{ width: 100, height: 100, borderRadius: 50 }}
          />
          <Text className="text-center text-gray-500 mt-2">
            Tap to select profile photo
          </Text>
        </TouchableOpacity>
      )}

      <Text className="text-4xl font-bold text-center text-gray-800 mb-8">
        {isSignUp ? "Sign Up" : "Login"}
      </Text>

      <TextInput
        placeholder="Email"
        className="h-12 border border-gray-300 rounded-lg px-4 mb-4 text-base"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        placeholder="Password"
        className="h-12 border border-gray-300 rounded-lg px-4 mb-6 text-base"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      {error ? <Text className="text-red-500 mb-4">{error}</Text> : null}

      <TouchableOpacity
        className="bg-blue-600 rounded-lg py-3 mb-4"
        onPress={handleAuth}
      >
        <Text className="text-white text-center text-lg font-semibold">
          {isSignUp ? "Sign Up" : "Login"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setIsSignUp(!isSignUp)}>
        <Text className="text-blue-600 text-center">
          {isSignUp
            ? "Already have an account? Login"
            : "Don't have an account? Sign Up"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}