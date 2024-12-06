import styles from "../stylesheets/header-profile.module.css"

const HeaderProfile = ({ coverPhoto, profilePhoto}) => {
  return (
    <header>
      {/* Cover photo */}
        <img src={coverPhoto} className={styles.cover_photo} alt="Cover photo"/>

      {/* Profile photo */}
        <img src={profilePhoto} className={styles.profile_photo} alt="Profile photo"/>
    </header>
  )
}

export default HeaderProfile
