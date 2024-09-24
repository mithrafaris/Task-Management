// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "task-5aec4.firebaseapp.com",
  projectId: "task-5aec4",
  storageBucket: "task-5aec4.appspot.com",
  messagingSenderId: "992192429036",
  appId: "1:992192429036:web:832b99c5714ee17d46dec9",
  measurementId: "G-TTYPXS9KV5"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);