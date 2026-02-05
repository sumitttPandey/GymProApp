// firebase/firebaseConfig.ts
import { initializeApp } from "firebase/app";
import { initializeAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyBElSSqLLgTO2tMwQ15Je_NNUZYTx5E6t4",
  authDomain: "gym-app-345be.firebaseapp.com",
  projectId: "gym-app-345be",
  storageBucket: "gym-app-345be.firebasestorage.app",
  messagingSenderId: "454699928539",
  appId: "1:454699928539:web:af7a1e4ed7168ab6f935fe",
  measurementId: "G-HC3SEMTL2G"
};

const app = initializeApp(firebaseConfig);

let auth: any;

try {
  const { getReactNativePersistence } = require("firebase/auth/react-native");

  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
  });
  console.log("Firebase Auth initialized with React Native persistence.");
} catch (e) {
  const { initializeAuth: _initializeAuth } = require("firebase/auth");
  auth = _initializeAuth(app);
  console.warn(
    "Could not enable React Native persistence for Firebase Auth. Falling back to default auth. Error:",
    e
  );
}

const db = getFirestore(app);

export { app, auth, db };