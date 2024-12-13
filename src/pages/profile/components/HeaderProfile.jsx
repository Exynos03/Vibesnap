import { useRef } from "react";
import styles from "../stylesheets/header-profile.module.css"
import { FaArrowLeft } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import uploadMedia from "../../../utils/uploadMedia";
import toast from "react-hot-toast";
import removeCookie from "../../../cookies/removeCookies";

const HeaderProfile = ({editMode , coverPhoto, profilePhoto, navigateRoute, setCoverPhoto, setProfilePhoto}) => {
  const navigate = useNavigate();
  const profileInputRef = useRef(null);
  const coverInputRef = useRef(null);

  // Function to upload media to storage and upate in user's document
  const uploadPhotoUpload = async (photoType, file) => {
    if(!file) return

    if(photoType === "profile") {
      try {
        const dowloadURL = await uploadMedia(file, 'profilePicture')
        setProfilePhoto(dowloadURL)
      } catch (error) {
        console.error("Error in media upload => ", error)
      }
    } else {
      try {
        const dowloadURL = await uploadMedia(file, 'coverPicture')
        setCoverPhoto(dowloadURL)
      } catch (error) {
        console.error("Error in media upload => ", error)
      }
    }
  }

  // Function to trigger the hidden file input
  const handleFileInputClick = (refType) => {
    if (refType.current) {
      refType.current.click();
    }
  };

  // Function to handle file selection
  const handleFileChange = (event, inputType) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      toast.promise(
        uploadPhotoUpload(inputType, files[0]),
         {
           loading: 'Updating...',
           success: inputType === "profile" ? "Profile picture updated!" : "Cover photo updated!",
           error: "Something went wrong. Try again later",
         }
       );
    }
  };
  
  return (
    <header>
      <FaArrowLeft className={styles.arrow_top} onClick={() => navigate(navigateRoute)}/>
      {/* Cover photo */}
      <div className={styles.cover_photo}>
        <img src={coverPhoto}  alt="Cover photo"/>
        { editMode && <div className={styles.cover_edit_btn_div} onClick={() => handleFileInputClick(coverInputRef)}><MdEdit className={styles.edit_btn}/></div> }
      </div>
      {/* Profile photo */}
        <div className={styles.profile_photo}>
          <img src={profilePhoto}  alt="Profile photo"/>
          { editMode && <div className={styles.edit_btn_div} onClick={() => handleFileInputClick(profileInputRef)}><MdEdit className={styles.edit_btn}/></div>}
        </div>       

        { !editMode && <div className={styles.btns}>
            <button onClick={() => navigate("/editProfile")}>Edit Profile</button> 
            <button onClick={() => {removeCookie("sessionData"); navigate("/")}}>Log out</button>
          </div> }
        <input
          type="file"
          accept="image/*" // Accepts all image types
          style={{ display: 'none' }} // Makes the input invisible
          ref={profileInputRef}
          onChange={(e) => handleFileChange(e, "profile")}
        />

        <input
          type="file"
          accept="image/*" // Accepts all image types
          style={{ display: 'none' }} // Makes the input invisible
          ref={coverInputRef}
          onChange={(e) => handleFileChange(e, "cover")}
        />
    </header>
  )
}

export default HeaderProfile
