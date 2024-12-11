import { useEffect, useRef, useState } from "react";
import styles from "../stylesheets/post.module.css"
import Posts from "./Posts"
import { collection, query, orderBy, startAfter, limit, getDocs } from 'firebase/firestore';
import { db } from "../../../config/firebase";
import { FadeLoader } from "react-spinners";

const FeedBody = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [lastVisible, setLastVisible] = useState(null);  // To track the last fetched document
  const [hasMoreData, setHasMoreData] = useState(true); // To check if more data is available
  const scrollContainerRef = useRef(null);  // Reference to the scroll container
  const colors = ["#F7EBFF", "#FFFAEE"]

  useEffect(() => {
    fetchPosts();
  }, []);

  const getNextColor = (colors) => {
    const currentColor = localStorage.getItem("selectedColor");
    
    if (!currentColor) {
      localStorage.setItem("selectedColor", colors[0]);
      return colors[0];
    }
  
    const nextColor = colors.find(color => color !== currentColor);
    localStorage.setItem("selectedColor", nextColor);
    return nextColor;
  }

  const fetchPosts = async () => {
    if (loading || !hasMoreData) return;
  
    console.log("Fetching posts...");
    setLoading(true);
  
    try {
      const postsRef = collection(db, 'posts');
      let q = query(postsRef, orderBy('createdAt', 'desc'), limit(1)); // Ensure consistent ordering
  
      // Use lastVisible for pagination
      if (lastVisible) {
        q = query(postsRef, orderBy('createdAt', 'desc'), startAfter(lastVisible), limit(2));
      }
  
      const querySnapshot = await getDocs(q);
  
      if (querySnapshot.empty) {
        setHasMoreData(false);
        setLoading(false);
        return;
      }
  
      const newPosts = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  
      // Check for duplicates in fetched posts
      setPosts((prevPosts) => {
        const uniquePosts = newPosts.filter(
          (newPost) => !prevPosts.some((post) => post.id === newPost.id)
        );
        return [...prevPosts, ...uniquePosts];
      });
  
      // Update the last visible document for pagination
      setLastVisible(querySnapshot.docs[querySnapshot.docs.length - 1]);
  
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };
  

  const handleScroll = () => {
    const scrollContainer = scrollContainerRef.current;

    if (
      scrollContainer.scrollTop + scrollContainer.clientHeight >= scrollContainer.scrollHeight - 10 &&
      hasMoreData && !loading
    ) {
      fetchPosts();
    }
  };

  return (
    <section className={styles.feedbody}>
        <h1>Feeds</h1>
        <div
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className={styles.post_div}
        >
          
          {posts.map((post, idx) => (
            <Posts post={post} key={idx} color={getNextColor(colors)}/>
          ))}
          {loading && <FadeLoader color="black" />}
          {!hasMoreData && <div>That’s all, folks! 🐰</div>}
        </div>
    </section>
  )
}

export default FeedBody
