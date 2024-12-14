import styles from "../stylesheets/post.module.css";
import "../stylesheets/media.css";

import { GoHeart } from "react-icons/go";
import { GoHeartFill } from "react-icons/go";
import { FaLocationArrow } from "react-icons/fa6";
import { IoIosArrowDroprightCircle } from "react-icons/io";
import { IoIosArrowDropleftCircle } from "react-icons/io";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { useState } from "react";
import ShareModal from "../../createPost/components/ShareModal";
import { managePostLike } from "../../../utils/postDataManagement";
import { getUserDetails } from "../../../utils/getUserDetails";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Posts = ({ post, color }) => {
  const userDetails = getUserDetails();
  const [showShareModal, setShowShareModal] = useState(false);
  const [isLiked, setIsLiked] = useState(
    post?.likedBy?.includes(userDetails.uid) || false,
  );
  const [prevIsLiked, setPrevIsLiked] = useState(
    post?.likedBy?.includes(userDetails.uid) || false,
  );
  const [likeCount, setLikeCount] = useState(post?.likeCount || 0);
  const navigate = useNavigate();

  const handleLike = async () => {
    if (!userDetails) {
      toast.error("You need to Create an account to like the post");
      return;
    }

    if (isLiked) {
      setIsLiked(false);
      setLikeCount((prevVal) => prevVal - 1);
    } else {
      setIsLiked(true);
      setLikeCount((prevVal) => prevVal + 1);
    }

    const res = await managePostLike(
      "posts",
      post?.postId,
      "likedBy",
      userDetails.uid,
    );

    if (res?.succees) {
      if (res.removed) {
        setIsLiked(false);
        setPrevIsLiked(false);
      } else {
        setIsLiked(true);
        setPrevIsLiked(true);
      }
    } else {
      setIsLiked(prevIsLiked);
      if (prevIsLiked) setLikeCount((prevVal) => prevVal + 1);
      else setLikeCount((prevVal) => prevVal - 1);
      toast.error("Oops! Something went under the hood");
    }
  };

  const getTimeDifference = (firebaseTimestamp) => {
    const createdAt = firebaseTimestamp?.toDate(); // Convert Firebase timestamp to JS Date
    const now = new Date();
    const timeDiff = now - createdAt; // Difference in milliseconds

    const oneMinute = 60 * 1000;
    const oneHour = 60 * oneMinute;
    const oneDay = 24 * oneHour;

    if (timeDiff < oneHour) {
      const minutes = Math.floor(timeDiff / oneMinute);
      return `${minutes} minute${minutes !== 1 ? "s" : ""} ago`;
    } else if (timeDiff < oneDay) {
      const hours = Math.floor(timeDiff / oneHour);
      return `${hours} hour${hours !== 1 ? "s" : ""} ago`;
    } else {
      const days = Math.floor(timeDiff / oneDay);
      return `${days} day${days !== 1 ? "s" : ""} ago`;
    }
  };

  return (
    <section className={styles.post} style={{ backgroundColor: color }}>
      {showShareModal && (
        <ShareModal
          postId={post?.postId}
          setShowShareModal={setShowShareModal}
        />
      )}
      <div className={styles.creator_meta}>
        <img
          src={post?.photoURL}
          alt="Display picture"
          style={{ cursor: "pointer" }}
          onClick={() => navigate(`/viewProfile`, { state: post })}
        />
        <div className={styles.cretor_content}>
          <p
            style={{ cursor: "pointer" }}
            onClick={() => navigate(`/viewProfile`, { state: post })}
          >
            {post?.displayName}
          </p>
          <span>{getTimeDifference(post?.createdAt)}</span>
        </div>
      </div>
      <p>
        {post?.caption}
        {post?.hastags?.map((item, idx) => {
          return <span key={idx}> #{item} </span>;
        })}
      </p>
      <div></div>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: true,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        modules={[Autoplay, Pagination, Navigation]}
        className={styles.medias}
      >
        <IoIosArrowDropleftCircle
          color="white"
          className="swiper-button-prev"
        />
        {post?.mediaURLs?.map((media, idx) => (
          <SwiperSlide
            style={{
              backgroundColor: "transparent",
            }}
            key={idx}
          >
            {/(mp4|mkv|avi|mov|flv|wmv|webm|mpeg|mpg|3gp|ogg)(\?.*)?$/i.test(
              media,
            ) ? (
              <video
                style={{ borderRadius: "12px" }}
                controls
                autoPlay
                muted
                loop
                src={media}
              />
            ) : (
              <img
                style={{ borderRadius: "12px" }}
                src={media}
                alt="media content"
              />
            )}
          </SwiperSlide>
        ))}
        <IoIosArrowDroprightCircle
          color="white"
          className="swiper-button-next"
        />
      </Swiper>
      <div className={styles.interaction_section}>
        <div className={styles.like} onClick={() => handleLike()}>
          {isLiked ? (
            <GoHeartFill
              color="#D95B7F"
              style={{ cursor: "pointer" }}
              size={window.innerWidth > 768 ? 20 : 16}
            />
          ) : (
            <GoHeart
              color="#D95B7F"
              style={{ cursor: "pointer" }}
              size={window.innerWidth > 768 ? 20 : 16}
            />
          )}
          <p>{likeCount}</p>
        </div>

        <div className={styles.share} onClick={() => setShowShareModal(true)}>
          <FaLocationArrow size={window.innerWidth > 768 ? 20 : 16} />
          <p>Share</p>
        </div>
      </div>
    </section>
  );
};

export default Posts;
