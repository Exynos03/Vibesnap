import { useEffect, useState } from "react";
import styles from "../stylesheets/my-post.module.css";
import { GoHeartFill } from "react-icons/go";
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  where,
} from "firebase/firestore";
import { db } from "../../../config/firebase";
import InfiniteScroll from "react-infinite-scroll-component";
import { FadeLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";

const MyPost = ({ uid }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [lastVisible, setLastVisible] = useState(null);
  const [hasMoreData, setHasMoreData] = useState(true);
  const navigate = useNavigate();

  const fetchPosts = async () => {
    if (loading || !hasMoreData) return;

    setLoading(true);
    try {
      const postsRef = collection(db, "posts");

      let q = query(
        postsRef,
        where("uid", "==", uid),
        orderBy("createdAt", "desc"),
        limit(20),
      );

      if (lastVisible) {
        q = query(
          postsRef,
          where("uid", "==", uid),
          orderBy("createdAt", "desc"),
          startAfter(lastVisible),
          limit(10),
        );
      }

      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        setHasMoreData(false);
        return;
      }

      const newPosts = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setPosts((prevPosts) => {
        const postMap = new Map();
        [...prevPosts, ...newPosts].forEach((post) => {
          postMap.set(post.id, post);
        });
        return Array.from(postMap.values());
      });

      setLastVisible(querySnapshot.docs[querySnapshot.docs.length - 1]);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [uid]);

  return (
    <div className={styles.my_posts}>
      <p>My Posts</p>
      <InfiniteScroll
        dataLength={posts.length}
        next={fetchPosts}
        hasMore={hasMoreData}
        loader={
          <div
            style={{
              width: "200%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "20px",
            }}
          >
            <FadeLoader color="black" />
          </div>
        }
        className={styles.grid}
        endMessage={<div></div>}
      >
        {posts.length > 0
          ? posts.map((post) => (
              <div
                className={styles.post}
                key={post.id}
                onClick={() => navigate("/feed/" + post?.postId)}
              >
                {/\.(mp4|mkv|avi|mov|flv|wmv|webm|mpeg|mpg|3gp|ogg)(\?.*)?$/i.test(
                  post?.mediaURLs[0],
                ) ? (
                  <video
                    controls
                    autoPlay
                    muted
                    loop
                    src={post?.mediaURLs[0]}
                  />
                ) : (
                  <img src={post?.mediaURLs[0]} alt="Post image" />
                )}
                <div className={styles.media_count}>
                  1/{post?.mediaURLs?.length}
                </div>
                <p>{post?.caption}</p>
                <div className={styles.likes}>
                  <GoHeartFill
                    color="#FFFFFF"
                    size={window.innerWidth > 768 ? 22 : 15}
                  />
                  <p>{post?.likeCount}</p>
                </div>
              </div>
            ))
          : !loading && (
              <div
                style={{
                  width: "200%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: "20px",
                }}
              >
                You have not posted anything yet
              </div>
            )}
      </InfiniteScroll>
    </div>
  );
};

export default MyPost;
