import { getUserDetails } from "../../../utils/getUserDetails"
import HeaderProfile from "../components/HeaderProfile"
import styles from "../stylesheets/profile.module.css"

const Profile = () => {
  const userDetails = getUserDetails()

  return (
    <section>
        <HeaderProfile editMode={false} navigateRoute="/feed" coverPhoto={userDetails?.coverPhotoURL} profilePhoto={userDetails?.photoURL} />
        <div className={styles.info}>
          <h1>{userDetails?.displayName}</h1>
          <p>{userDetails?.bio}</p>
        </div>
    </section>
  )
}

export default Profile
