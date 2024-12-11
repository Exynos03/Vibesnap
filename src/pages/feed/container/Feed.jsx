import { useNavigate } from "react-router-dom";
import FeedBody from "../components/FeedBody"
import Header from "../components/Header"
import styles from "../stylesheets/post.module.css"
import { FiPlus } from "react-icons/fi";

const Feed = () => {
  const navigate = useNavigate()

  return (
    <main className={styles.feed_container}>
        <Header />
        <FeedBody color="#F7EBFF"/>
        <div className={styles.floating_action_btn} onClick={() => navigate("/createPost")}>
          <FiPlus color="white" size={20}/>
        </div>
    </main>
  )
}

export default Feed
