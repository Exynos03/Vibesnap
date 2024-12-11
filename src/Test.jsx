import React from 'react';
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  WhatsappShareButton,
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
  WhatsappIcon,
} from 'react-share';

const Test = () => {
  const shareUrl = 'https://yourwebsite.com';
  const title = 'Check out this amazing content!';

  return (
    <div style={{ display: 'flex', gap: '10px' }}>
      <FacebookShareButton url={shareUrl} quote={title}>
        <FacebookIcon size={32} round />
      </FacebookShareButton>

      <TwitterShareButton url={shareUrl} title={title}>
        <TwitterIcon size={32} round />
      </TwitterShareButton>

      <LinkedinShareButton url={shareUrl} title={title}>
        <LinkedinIcon size={32} round />
      </LinkedinShareButton>

      <WhatsappShareButton url={shareUrl} title={title}>
        <WhatsappIcon size={32} round />
      </WhatsappShareButton>
    </div>
  );
};

export default Test;
