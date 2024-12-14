import { useLocation, useNavigate } from "react-router-dom";
import { getUserDetails } from "../../../utils/getUserDetails";
import HeaderProfile from "../components/HeaderProfile";
import MyPost from "../components/MyPost";
import styles from "../stylesheets/profile.module.css";
import { FiPlus } from "react-icons/fi";

const Profile = () => {
  const userDetails = getUserDetails();
  const location = useLocation();
  const data = location.state;
  const navigate = useNavigate();

  const resolveDataToShow = () => {
    if (location.pathname === "/viewProfile" || data) return data;
    else return userDetails;
  };

  return (
    <section>
      <HeaderProfile
        editMode={false}
        navigateRoute="/feed"
        coverPhoto={resolveDataToShow()?.coverPhotoURL}
        profilePhoto={resolveDataToShow()?.photoURL}
      />
      <div className={styles.info}>
        <h1>{resolveDataToShow()?.displayName}</h1>
        <p>{resolveDataToShow()?.bio}</p>
      </div>
      <MyPost uid={resolveDataToShow()?.uid} />
      <div
        className={styles.floating_action_btn}
        onClick={() => navigate("/createPost")}
      >
        <FiPlus color="white" size={20} />
      </div>
    </section>
  );
};

export default Profile;
