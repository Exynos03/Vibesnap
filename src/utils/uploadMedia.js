import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

async function uploadMedia(file, folderName) {
  if (!file) {
    throw new Error("No file provided for upload.");
  }

  const storage = getStorage(); // Initialize Firebase Storage
  const fileRef = ref(storage, `${folderName}/${file.name}`); // Reference to the file path in Firebase Storage
  const uploadTask = uploadBytesResumable(fileRef, file);

  return new Promise((resolve, reject) => {
    uploadTask.on(
      "state_changed",
      null, // Skip progress tracking
      (error) => {
        // Handle errors
        console.error("Upload failed:", error);
        reject(error);
      },
      () => {
        // Upload completed successfully
        getDownloadURL(uploadTask.snapshot.ref)
          .then((downloadURL) => {
            console.log("File available at", downloadURL);
            resolve(downloadURL); // Resolve with the download URL
          })
          .catch((error) => {
            console.error("Error getting download URL:", error);
            reject(error);
          });
      },
    );
  });
}

export default uploadMedia;
