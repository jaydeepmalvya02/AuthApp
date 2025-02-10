// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey:import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "auth-app-bc207.firebaseapp.com",
  projectId: "auth-app-bc207",
  storageBucket: "auth-app-bc207.firebasestorage.app",
  messagingSenderId: "705284152880",
  appId: "1:705284152880:web:f5a0e976de18797249d7f5"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);