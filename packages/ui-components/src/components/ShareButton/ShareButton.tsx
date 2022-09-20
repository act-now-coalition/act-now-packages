import React, { useState } from "react";
import { Button, ButtonGroup, Box } from "@mui/material";
import ShareIcon from "@mui/icons-material/Share";
import { ClickAwayListener } from "@mui/material";
import { CopyLinkButton } from "./CopyLinkButton";
import { TwitterShareButton } from "./TwitterShareButton";
import { FacebookShareButton } from "./FacebookShareButton";

export interface ShareButtonProps {
  url: string | (() => Promise<string>);
  quote: string;
  hashtags: string[];
  onCopyLink: () => void;
  onShareTwitter: () => void;
  onShareFacebook: () => void;
}

export const ShareButton: React.FC<ShareButtonProps> = ({
  url,
  quote,
  hashtags,
  onCopyLink,
  onShareTwitter,
  onShareFacebook,
}) => {
  // Turn url / imageUrl into asynchronous getters if they aren't already.
  const getUrl = typeof url === "string" ? () => Promise.resolve(url) : url;

  const [socialSharingProps, setSocialSharingProps] = useState<{
    url: string;
    quote: string;
    hashtags: string[];
  } | null>(null);

  // TODO (Fai): Implement useEscToClose in addition to ClickAwayListener.
  const hideSocialButtons = (delay = 0) => {
    const timeoutId = setTimeout(() => setSocialSharingProps(null), delay);
    return () => clearTimeout(timeoutId);
  };

  const showSocialButtons = () => {
    getUrl().then((url) => {
      setSocialSharingProps({
        url,
        quote,
        hashtags,
      });
    });
  };

  const toggleSocialButtons = () => {
    if (socialSharingProps) {
      hideSocialButtons();
    } else {
      showSocialButtons();
    }
  };

  return (
    <ClickAwayListener onClickAway={() => hideSocialButtons()}>
      <>
        <Box mb={1}>
          <Button
            variant="outlined"
            endIcon={<ShareIcon />}
            onClick={toggleSocialButtons}
            style={{ position: "relative" }}
          >
            Share
          </Button>
        </Box>
        {socialSharingProps && (
          <ButtonGroup orientation="vertical">
            <CopyLinkButton
              url={socialSharingProps.url}
              onCopyLink={onCopyLink}
              hideSocialButtons={hideSocialButtons}
            />
            <TwitterShareButton
              url={socialSharingProps.url}
              quote={socialSharingProps.quote}
              hashtags={socialSharingProps.hashtags}
              onClickShare={() => onShareTwitter}
              hideSocialButtons={hideSocialButtons}
            />
            <FacebookShareButton
              url={socialSharingProps.url}
              quote={socialSharingProps.quote}
              onClickShare={() => onShareFacebook}
              hideSocialButtons={hideSocialButtons}
            />
          </ButtonGroup>
        )}
      </>
    </ClickAwayListener>
  );
};
