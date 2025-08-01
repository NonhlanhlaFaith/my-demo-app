// Import the Firebase modules
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your Firebase config object
const firebaseConfig = {
  apiKey: "AIzaSyBcpu_yEpUvxLEFCyaPxqPvjLagPoXx3Xg",
  authDomain: "mytasktracker-137a0.firebaseapp.com",
  projectId: "mytasktracker-137a0",
  storageBucket: "mytasktracker-137a0.appspot.com",
  messagingSenderId: "744341131682",
  appId: "1:744341131682:web:4534f32b4ad48a2034a2fb",
  measurementId: "G-ZW79GJNYKP"
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth and Firestore services
export const auth = getAuth(app);
export const db = getFirestore(app);
