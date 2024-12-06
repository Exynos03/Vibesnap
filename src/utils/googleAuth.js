import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../config/firebase";

const provider = new GoogleAuthProvider();

export const handleGoogleSignIn = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    console.log("User info:", user);
  } catch (error) {
    console.error("Error during sign-in:", error.message);
  }
};
