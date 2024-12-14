import FeedBody from "../components/FeedBody";
import Header from "../components/Header";
import styles from "../stylesheets/post.module.css";

const IndividualPost = () => {
  return (
    <main className={styles.feed_container}>
      {/* <Header sharePostFlag={true}/> */}
      <FeedBody sharePostFlag={true} color="#F7EBFF" />
    </main>
  );
};

export default IndividualPost;
