import { useNavigate } from "react-router-dom"
import { getUserDetails } from "../../../utils/getUserDetails"
import styles from "../stylesheets/header.module.css"

const Header = () => {
  const userDetails = getUserDetails()
  const navigate = useNavigate()
  
    return (
    <header className={styles.header}>
        <img src={userDetails?.photoURL} alt="Display Image" onClick={() => navigate("/profile")}/>
        <div className={styles.greeting_section}>
            <p>Welcome Back,</p>
            <h3>{userDetails?.displayName}</h3>
        </div>
    </header>
  )
}

export default Header
