import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // ✅ Required for Firestore
import { getAnalytics } from "firebase/analytics";

// Firebase Configuration
const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: "projets-2f34a.firebaseapp.com",
  projectId: "projets-2f34a",
  storageBucket: "projets-2f34a.firebasestorage.app",
  messagingSenderId: "164340179237",
  appId: "1:164340179237:web:cb767acf9c61c27d61facc",
  measurementId: "G-Y5K6XFPFTE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
//const analytics = getAnalytics(app);
