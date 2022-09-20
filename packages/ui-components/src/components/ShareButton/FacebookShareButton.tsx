import React from "react";
import * as ReactShare from "react-share";
import { SocialShareButton } from "./ShareButton.style";

export const COLOR_FACEBOOK = "#3b5998";

export const FacebookShareButtonInner: React.FC<{
  url: string;
  quote: string;
  socialIconSize: number;
}> = ({ url, quote, socialIconSize }) => (
  <ReactShare.FacebookShareButton url={url} quote={quote}>
    <ReactShare.FacebookIcon size={socialIconSize} round={false} fill="auto" />
  </ReactShare.FacebookShareButton>
);

export const FacebookShareButton: React.FC<{
  url: string;
  quote: string;
  socialIconSize: number;
  onClickShare: () => void;
}> = ({ url, quote, socialIconSize, onClickShare }) => (
  <SocialShareButton color={COLOR_FACEBOOK} onClick={onClickShare}>
    <FacebookShareButtonInner
      url={url}
      quote={quote}
      socialIconSize={socialIconSize}
    />
  </SocialShareButton>
);
