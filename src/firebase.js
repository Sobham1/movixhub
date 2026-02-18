import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
//import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // ✅ Import properly
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCukBdr5QrIUjuvPvRdZqcFXxUnGZ88KTQ",
  authDomain: "movixhub-auth.firebaseapp.com",
  projectId: "movixhub-auth",
  storageBucket: "movixhub-auth.firebasestorage.app",
  messagingSenderId: "496336770845",
  appId: "1:496336770845:web:390027b6498e5c0e03b3f4",
  measurementId: "G-8X0T5GXRCH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig); // ✅ First initialize
const analytics = getAnalytics(app);      // Optional
export const auth = getAuth(app);
export const db = getFirestore(app);      // ✅ Now pass initialized app


//export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
