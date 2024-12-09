import { addDoc, collection, getDocs, query, updateDoc, where } from "firebase/firestore";
import { db } from "../config/firebase";

export async function uploadData(collectionName, data, flag) {
    try {
      const colRef = collection(db, collectionName);
  
      if(!flag) {
          // Check if a document with the given uid exists
        const q = query(colRef, where("uid", "==", data.uid));
        const querySnapshot = await getDocs(q);
    
        if (!querySnapshot.empty) {
          // User already exists, return their details
          const existingUser = querySnapshot.docs[0].data();
          return {data:existingUser, existingUser: true};
        }
      }
  
      // Add a new document since the user does not exist
      await addDoc(colRef, data);
      return {data:data, existingUser: true}; 
    } catch (e) {
      console.error("Error adding or checking document:", e);
      throw e;
    }
  }

  export async function updateDataFirestore(collectionName, uid, updatedData) {
    const collectionRef = collection(db, collectionName); // Reference to the collection
    const q = query(collectionRef, where("uid", "==", uid)); // Query to find the document by uid
  
    try {
      const querySnapshot = await getDocs(q);
  
      if (querySnapshot.empty) {
        console.error(`No document found with uid: ${uid}`);
        throw new Error(`No document found with uid: ${uid}`);
      }
  
      const docRef = querySnapshot.docs[0].ref; // Get the document reference of the first match
      await updateDoc(docRef, updatedData);
      return true
    } catch (error) {
      console.error(`Error updating document with uid '${uid}':`, error);
      throw error;
    }
  }

  export async function updateFieldFirestore(collectionName, uid, fieldName, fieldValue) {
    const collectionRef = collection(db, collectionName); // Reference to the collection
    const q = query(collectionRef, where("uid", "==", uid)); // Query to find the document by uid
  
    try {
      const querySnapshot = await getDocs(q);
  
      if (querySnapshot.empty) {
        console.error(`No document found with uid: ${uid}`);
        throw new Error(`No document found with uid: ${uid}`);
      }
  
      const docRef = querySnapshot.docs[0].ref; // Get the document reference of the first match
      await updateDoc(docRef, { [fieldName]: fieldValue });
      console.log(`Field '${fieldName}' updated successfully in document with uid '${uid}'!`);
    } catch (error) {
      console.error(`Error updating field '${fieldName}':`, error);
      throw error;
    }
  }

  export async function getDataByUid(uid, collectionName) {
    const collectionRef = collection(db, collectionName); // Reference to the collection
    const q = query(collectionRef, where("uid", "==", uid)); // Query to find the document by uid
  
    try {
      const querySnapshot = await getDocs(q);
  
      if (querySnapshot.empty) {
        console.log(`No document found with uid: ${uid}`);
        return null;
      }
  
      // Return the data of the first matching document
      return querySnapshot.docs[0].data();
    } catch (error) {
      console.error("Error getting document: ", error);
      return null;
    }
  }