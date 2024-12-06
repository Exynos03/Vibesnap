import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB6yiqS7thyzF_pzQ7KyXAJbQ2x7yBLxTE",
  authDomain: "loveto-love-line.firebaseapp.com",
  projectId: "loveto-love-line",
  storageBucket: "loveto-love-line.appspot.com",
  messagingSenderId: "307344031776",
  appId: "1:307344031776:web:1156bef98fb60533077c45",
  measurementId: "G-7D5WP954JM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);
export const provider = new GoogleAuthProvider();