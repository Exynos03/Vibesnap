import { db } from "../config/firebase";
import {
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  arrayUnion,
  arrayRemove,
  increment,
} from "firebase/firestore";

export async function managePostLike(
  collectionName,
  postId,
  theFieldName,
  uid,
) {
  try {
    // Query the Firestore collection to find the document with the matching postId
    const q = query(
      collection(db, collectionName),
      where("postId", "==", postId),
    );
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
        return { succees: true, removed: true }; // Successfully removed
      } else {
        // UID does not exist in the array, add it and increment likeCount
        await updateDoc(docRef, {
          [theFieldName]: arrayUnion(uid),
          likeCount: increment(1), // Increase like count
        });
        return { succees: true, removed: false }; // Successfully added
      }
    } else {
      console.error("No document found with the specified postId.");
      return { succees: false, removed: false }; // Document not found
    }
  } catch (error) {
    console.error("Error updating Firestore document:", error);
    return { status: false, error: error.message }; // Error occurred
  }
}

export async function fetchPostById(postId) {
  if (!postId) {
    throw new Error("postId is required.");
  }

  try {
    // Reference to the posts collection
    const postsRef = collection(db, "posts");

    // Query to find the document with the given postId
    const q = query(postsRef, where("postId", "==", postId));

    // Execute the query
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return false;
    }

    // Assuming postId is unique, return the first matching post
    const post = querySnapshot.docs[0].data();

    return post;
  } catch (error) {
    console.error("Error fetching post:", error);
    return false;
  }
}

export async function fetchPostsByUid(uid, limit = 10) {
  try {
    if (!uid) {
      throw new Error("A valid UID is required.");
    }

    // Query the posts collection
    const postsRef = collection(db, "posts");
    const querySnapshot = await postsRef
      .where("uid", "==", uid)
      .orderBy("createdAt", "desc")
      .limit(limit)
      .get();

    if (querySnapshot.empty) {
      return []; // Return an empty array if no posts are found
    }

    // Map the query results to an array of post data
    const posts = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return posts;
  } catch (error) {
    console.error("Error fetching posts:", error);
    return false;
  }
}
