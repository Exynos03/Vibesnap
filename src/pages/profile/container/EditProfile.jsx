import { useState } from "react"
import { getUserDetails } from "../../../utils/getUserDetails"
import HeaderProfile from "../components/HeaderProfile"
import styles from "../stylesheets/profile.module.css"
import toast from "react-hot-toast"
import { getDataByUid, updateDataFirestore } from "../../../utils/UserData"
import setCookie from "../../../cookies/setCookies"
import { useNavigate } from "react-router-dom"

const EditProfile = () => {
  const userDetails = getUserDetails()
  const [profilePhoto, setProfilePhoto] = useState(userDetails?.photoURL)
  const [coverPhoto, setCoverPhoto] = useState(userDetails?.coverPhotoURL)
  const [name,setName] = useState(userDetails?.displayName)
  const [bio, setBio] = useState(userDetails?.bio)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  
  const handleSaveData = async () => {
    try {
      const data = await getDataByUid(userDetails?.uid, "userData")
      const newData = {
        ...data,
        bio: bio,
        displayName: name,
        coverPhotoURL: coverPhoto,
        photoURL: profilePhoto
      }
      await updateDataFirestore("userData",userDetails?.uid, newData)
      setCookie("sessionData", JSON.stringify(newData))
    } catch (error) {
      console.error("Error updating profile => ", error)
    }
  }

  const handleSaveBtn = async (e) => {
    e.preventDefault()
    setLoading(true)

    if(!(name?.length > 0)) {
      toast.error("Name can't be empty!")
      return
    } else if (!(bio?.length > 0)) {
      toast.error("Bio can't be empty!")
      return
    }
    toast.promise(
      handleSaveData(),
       {
         loading: 'Updating...',
         success: "Saved!",
         error: "Something went wrong. Try again later",
       }
     );
     navigate("/profile")
     setLoading(false)
  }

  return (
    <section>
        <HeaderProfile editMode={true} setProfilePhoto={setProfilePhoto} setCoverPhoto={setCoverPhoto} navigateRoute="/profile" coverPhoto={coverPhoto} profilePhoto={profilePhoto}/>
        <div className={styles.info}>
          <label>
            Name
            <input 
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>

          <label>
            Bio
            <input 
              type="text"
              placeholder="Enter your bio"
              onChange={(e) => setBio(e.target.value)}
              value={bio}
            />
          </label>
        </div>

        <button className={styles.btn} onClick={(e) => handleSaveBtn(e)} disabled={loading} >
          Save
        </button>
    </section>
  )
}

export default EditProfile
