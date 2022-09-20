import React from "react";
import { FacebookShareButton } from "./FacebookShareButton";
import { TwitterShareButton } from "./TwitterShareButton";
import { CopyLinkButton } from "./CopyLinkButton";
import { Stack, useTheme } from "@mui/material";

export const SocialButtonBlock: React.FC<{
  url: string;
  quote: string;
  socialIconSize: number;
  onShareOnFacebook: () => void;
  onShareOnTwitter: () => void;
  onCopyLink: () => void;
  hideSocialButton: () => void;
}> = ({
  url,
  quote,
  socialIconSize,
  onShareOnFacebook,
  onShareOnTwitter,
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

  const theme = useTheme();

  return (
    <Stack
      direction="row"
      position="absolute"
      marginTop="8px"
      borderRadius="4px"
      boxShadow={`${theme.palette.grey[300]} 0px 8px 32px`}
    >
      <CopyLinkButton
        url={socialSharingProps.url}
        onCopyLink={() => {
          onCopyLink();
          closeShareButtonGroup();
        }}
      />
      <TwitterShareButton
        onClickShare={() => {
          onShareOnTwitter();
          closeShareButtonGroup();
        }}
        {...socialSharingProps}
        hashtags={["COVIDActNow"]}
      />
      <FacebookShareButton
        onClickShare={() => {
          onShareOnFacebook();
          closeShareButtonGroup();
        }}
        {...socialSharingProps}
      />
    </Stack>
  );
};

//box-shadow: 0px ${theme.spacing(1)}px ${theme.spacing(4)}px rgba(0, 0, 0, 0.2);
