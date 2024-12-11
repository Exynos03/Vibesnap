import { FaArrowLeft } from "react-icons/fa";
import MediaViewer from "../components/MediaViewer.jsx";
import "../stylesheets/media-viewer.css"
import uploadMedia from "../../../utils/uploadMedia.js";
import { useState } from "react";
import { getUserDetails } from "../../../utils/getUserDetails.js";
import { uploadData } from "../../../utils/UserData.js";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';

const CreatePost = () => {
  const [caption, setCaption] = useState('')
  const [files, setFiles] = useState([]);
  const[loading,setLoading] = useState(false)
  const userDetails = getUserDetails()
  const navigate = useNavigate()

    const uploadFilesToFirebase = async () => {
        const folderName = "posts"; // Define the folder where files will be uploaded
      
        try {
          const uploadPromises = files.map((file) =>
            uploadMedia(file, folderName)
          );
      
          // Wait for all upload promises to resolve
          const downloadURLs = await Promise.all(uploadPromises);
      
          // return the array of download URLs
          return downloadURLs;
        } catch (error) {
          console.error("Error uploading files:", error);
          throw error; // Rethrow error if needed for external handling
        }
    };

    const extractHashtags = (text) => {
        // Regular expression to match hashtags
        const hashtagRegex = /#(\w+)/g;
        const hashtags = [];
        let caption = text;
      
        // Find and extract hashtags
        let match;
        while ((match = hashtagRegex.exec(text)) !== null) {
          hashtags.push(match[1]); // Add the matched hashtag to the array
        }
      
        // Remove hashtags from the original text
        caption = text.replace(hashtagRegex, "").trim();
      
        return { hashtags, caption };
    }

    const uploadNewPost = async () => {
        setLoading(true)
        try {
            const mediaArray = await uploadFilesToFirebase()

            const newPost = {
                postId:uuidv4(),
                uid: userDetails?.uid,
                mediaURLs: mediaArray,
                caption: extractHashtags(caption)?.caption,
                hastags: extractHashtags(caption)?.hashtags,
                creatorName: userDetails?.displayName,
                photoURL: userDetails?.photoURL,
                likeCount: 0,
                likedBy : []
            }

            await uploadData("posts", newPost, true)
            navigate("/feed")
        } catch (error) {
            console.error("Error happend in post uplaod => ", error);
        } finally {
          setLoading(false)
        }
    }

    const handleCreateBtn = async (e) => {
        e.preventDefault()
        
    
        if(!(caption?.length > 0)) {
          toast.error("Caption can't be empty!")
          return
        }

        toast.promise(
          uploadNewPost(),
           {
             loading: 'Creating...',
             success: "Your post is live now!",
             error: "Something went wrong. Try again later",
           }
         );
      }

  return (
    <section>
        <FaArrowLeft color="#000000" size={ window.innerWidth > 768 ? 30 : 25} style={{marginLeft:"8%", marginTop:"5%", cursor:"Pointer"}} onClick={() => navigate(-1)}/>  
        <MediaViewer files={files} setFiles={setFiles} setCaption={setCaption} caption={caption}/>
        <button className="create-btn" onClick={handleCreateBtn} disabled={loading}>Create</button>
    </section>
  )
}

export default CreatePost
