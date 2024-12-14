import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../config/firebase";
import setCookie from "../cookies/setCookies";
import { uploadData } from "./UserData";

const provider = new GoogleAuthProvider();

export const handleGoogleSignIn = async () => {
  // const navigate = useNavigate()
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    const data = {
      displayName: user?.providerData[0]?.displayName,
      email: user?.providerData[0]?.email,
      phoneNumber: user?.providerData[0]?.phoneNumber,
      photoURL: user?.providerData[0]?.photoURL,
      bio: null,
      coverPhotoURL:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOwRConBYl2t6L8QMOAQqa5FDmPB_bg7EnGA&s",
      providerId: user?.providerData[0]?.providerId,
      uid: user?.providerData[0]?.uid,
    };
    const res = await uploadData("userData", data);
    setCookie("sessionData", JSON.stringify(res.data));
    return res;
  } catch (error) {
    console.error("Error during sign-in:", error.message);
  }
};
