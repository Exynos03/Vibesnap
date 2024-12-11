import styles from "../stylesheets/share-modal.module.css"
import { RxCross2 } from "react-icons/rx";
import { IoMdCopy } from "react-icons/io";
import {
    FacebookShareButton,
    TwitterShareButton,
    LinkedinShareButton,
    WhatsappShareButton,
    TelegramShareButton,
    InstapaperShareButton,
    RedditShareButton,
    FacebookMessengerShareButton,
    FacebookMessengerIcon,
    RedditIcon,
    InstapaperIcon,
    TelegramIcon,
    FacebookIcon,
    TwitterIcon,
    LinkedinIcon,
    WhatsappIcon,
  } from 'react-share';

import toast from "react-hot-toast";

const ShareModal = ({postId, setShowShareModal}) => {
    const shareUrl = window.location.href + "/" + postId;
    const title = 'Check out this amazing content!';

    const handleCopyUrl = (url) => {
        navigator.clipboard.writeText(url)
          .then(() => {
            toast.success("URL copied to clipboard!");
          })
          .catch((err) => {
            console.error("Failed to copy: ", err);
            toast.error("Failed to copy the URL.");
          });
      };    

  return (
    <>
        <div className={styles.popup_wrapper}></div>
        <div className={styles.modal_container}>
            <div className={styles.header}>
                <p>Share post</p>
                <div className={styles.cross} onClick={() => setShowShareModal(false)}>
                    <RxCross2 />
                </div>
            </div>
            <div  className={styles.grid_container}>
            <FacebookShareButton className={styles.grid_item} url={shareUrl} quote={title}>
                <FacebookIcon size={50} round />
            </FacebookShareButton>

            <TwitterShareButton className={styles.grid_item} url={shareUrl} title={title}>
                <TwitterIcon size={50} round />
            </TwitterShareButton>

            <LinkedinShareButton className={styles.grid_item} url={shareUrl} title={title}>
                <LinkedinIcon size={50} round />
            </LinkedinShareButton>

            <WhatsappShareButton className={styles.grid_item} url={shareUrl} title={title}>
                <WhatsappIcon size={50} round />
            </WhatsappShareButton>
            <RedditShareButton className={styles.grid_item} url={shareUrl} quote={title}>
                <RedditIcon size={50} round />
            </RedditShareButton>

            <FacebookMessengerShareButton className={styles.grid_item} url={shareUrl} title={title}>
                <FacebookMessengerIcon size={50} round />
            </FacebookMessengerShareButton>

            <TelegramShareButton className={styles.grid_item} url={shareUrl} title={title}>
                <TelegramIcon size={50} round />
            </TelegramShareButton>

            <InstapaperShareButton className={styles.grid_item} url={shareUrl} title={title}>
                <InstapaperIcon size={50} round />
            </InstapaperShareButton>
            </div>
            <div className={styles.link}>
                <p>Page Link</p>
                <div>
                    <p>{shareUrl}</p>
                    <IoMdCopy color="#212121" size={20} style={{cursor:"pointere"}} onClick={() => handleCopyUrl(shareUrl)}/>
                </div>
            </div>
        </div>
    </>
  )
}

export default ShareModal
