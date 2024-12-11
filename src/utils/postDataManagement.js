import  {db}  from "../config/firebase"; 
import { collection, query, where, getDocs, updateDoc, arrayUnion, arrayRemove, increment } from "firebase/firestore";

export async function managePostLike(collectionName, postId, theFieldName, uid) {
  try {
    // Query the Firestore collection to find the document with the matching postId
    const q = query(collection(db, collectionName), where("postId", "==", postId));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const docRef = querySnapshot.docs[0].ref; // Assume the first matching document

      // Retrieve the current data
      const data = querySnapshot.docs[0].data();
      const currentArray = data[theFieldName] || [];

      if (currentArray.includes(uid)) {
        // UID exists in the array, remove it and decrement likeCount
        await updateDoc(docRef, {
          [theFieldName]: arrayRemove(uid),
          likeCount: increment(-1), // Decrease like count
        });
        return {"succees": true, "removed" : true}; // Successfully removed
      } else {
        // UID does not exist in the array, add it and increment likeCount
        await updateDoc(docRef, {
          [theFieldName]: arrayUnion(uid),
          likeCount: increment(1), // Increase like count
        });
        return {"succees": true, "removed" : false}; // Successfully added
      }
    } else {
      console.error("No document found with the specified postId.");
      return {"succees": false, "removed" : false}; // Document not found
    }
  } catch (error) {
    console.error("Error updating Firestore document:", error);
    return { status: false, error: error.message }; // Error occurred
  }
}

