import React from "react";
// import FacebookShareButton from './FacebookShareButton';
// import TwitterShareButton from './TwitterShareButton';
import CopyLinkButton from "./CopyLinkButton";

export const SocialButtonBlock: React.FC<{
  url: string;
  quote: string;
  socialIconSize: number;
  // onShareOnFacebook: () => void;
  // onShareOnTwitter: () => void;
  onCopyLink: () => void;
  hideSocialButton: () => void;
}> = ({
  url,
  quote,
  socialIconSize,
  // onShareOnFacebook,
  // onShareOnTwitter,
  onCopyLink,
  hideSocialButton,
}) => {
  const socialSharingProps = {
    url,
    quote,
    socialIconSize,
  };
  function closeShareButtonGroup() {
    setTimeout(() => hideSocialButton(), 1000);
  }
  return (
    <div>
      <CopyLinkButton
        url={socialSharingProps.url}
        onCopyLink={() => {
          onCopyLink();
          closeShareButtonGroup();
        }}
      />
      {/* <TwitterShareButton
        onClickShare={() => {
          onShareOnTwitter();
          closeShareButtonGroup();
        }}
        {...socialSharingProps}
        hashtags={['COVIDActNow']}
      /> */}
      {/* <FacebookShareButton
        onClickShare={() => {
          onShareOnFacebook();
          closeShareButtonGroup();
        }}
        {...socialSharingProps}
      /> */}
    </div>
  );
};
