import { useEffect, useState } from "react";
import styles from "../stylesheets/post.module.css";
import Posts from "./Posts";
import { collection, query, orderBy, startAfter, limit, getDocs } from 'firebase/firestore';
import { db } from "../../../config/firebase";
import { FadeLoader } from "react-spinners";
import InfiniteScroll from "react-infinite-scroll-component";
import { useNavigate } from "react-router-dom";
import removeCookie from "../../../cookies/removeCookies";
import { fetchPostById } from "../../../utils/postDataManagement";
import toast from "react-hot-toast";
import { getUserDetails } from "../../../utils/getUserDetails";

const FeedBody = ({sharePostFlag}) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [lastVisible, setLastVisible] = useState(null);
  const [hasMoreData, setHasMoreData] = useState(true);
  const [individualPost, setIndividualPost] = useState()
  const navigate = useNavigate()
  const userDetails = getUserDetails()

  const colors = ["#F7EBFF", "#FFFAEE"];
  let colorIndex = 0;

  const createNewAccountNavigation = () => {
    if(!userDetails) navigate("/feed")
    removeCookie("sessionData")
    navigate("/")
  }

  const getNextColor = () => {
    const color = colors[colorIndex];
    colorIndex = (colorIndex + 1) % colors.length;
    return color;
  };

  const fetchPosts = async () => {
    if (loading || !hasMoreData) return;

    setLoading(true);
    try {
      const postsRef = collection(db, 'posts');
      let q = query(postsRef, orderBy('createdAt', 'desc'), limit(20)); // Fetch 5 posts at a time

      if (lastVisible) {
        q = query(postsRef, orderBy('createdAt', 'desc'), startAfter(lastVisible), limit(20));
      }

      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        setHasMoreData(false);
        return;
      }

      const newPosts = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

      // Merge new posts with the existing ones, avoiding duplicates
      setPosts((prevPosts) => {
        const uniquePosts = new Map();
        [...prevPosts, ...newPosts].forEach(post => {
          uniquePosts.set(post.id, post);
        });
        return Array.from(uniquePosts.values());
      });

      setLastVisible(querySnapshot.docs[querySnapshot.docs.length - 1]);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  function getUUIDFromURL() {
    const match = window.location.href.match(/\/feed\/([a-f0-9\-]{36})/);
    return match ? match[1] : null;
  }

  const fetchIndividualPost = async () => {
    setLoading(true)
    const postId = getUUIDFromURL()

    const response = await fetchPostById(postId)
    
    if(!response) {
      toast.error("Something went wrong. Try again later!")
    } else {
      setIndividualPost(response)
    }
    setLoading(false)
  }

  useEffect(() => {
    if(sharePostFlag)fetchIndividualPost()
    else fetchPosts();
  }, []); // Initial fetch when the component mounts

  return (
    <section className={styles.feedbody}>
      { (sharePostFlag && !userDetails) ? <h1 onClick={() => createNewAccountNavigation()} style={{cursor:"pointer", textDecoration:"underline"}}>Join Vibesnap</h1> : <h1 onClick={() => navigate("/feed")}>Feeds</h1> }
      {
        sharePostFlag ? 
          <div className={styles.post_div}>
            {
              loading ?
                <FadeLoader color="black" />
              :
                <Posts post={individualPost} color={getNextColor()} />
            }
          </div>
        :
          <InfiniteScroll
            dataLength={posts.length}
            next={fetchPosts}
            hasMore={hasMoreData}
            loader={<FadeLoader color="black" />}
            className={styles.post_div}
            endMessage={<div>You have consumed all the posts 🐰</div>}
          >
            {posts.map((post, idx) => (
              <Posts post={post} key={idx} color={getNextColor()} />
            ))}
          </InfiniteScroll>
      }
    </section>
  );
};

export default FeedBody;
