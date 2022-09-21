import React, { useState } from "react";
import { Button, ButtonGroup, Box } from "@mui/material";
import ShareIcon from "@mui/icons-material/Share";
import { ClickAwayListener } from "@mui/material";
import { CopyLinkButton } from "./CopyLinkButton";
import { TwitterShareButton } from "./TwitterShareButton";
import { FacebookShareButton } from "./FacebookShareButton";

export interface ShareButtonProps {
  url: string;
  quote: string;
  hashtags?: string[];
  onCopyLink: () => void;
  onShareTwitter: () => void;
  onShareFacebook: () => void;
  justifyButton?: "flex-start" | "flex-end" | "center";
}

export const ShareButton: React.FC<ShareButtonProps> = ({
  url,
  quote,
  hashtags = [],
  onCopyLink,
  onShareTwitter,
  onShareFacebook,
  justifyButton = "flex-start",
}) => {
  const [visibleSocialButtons, setVisibleSocialButtons] = useState(false);

  // TODO (Fai): Implement useEscToClose in addition to ClickAwayListener.
  const hideSocialButtons = () => {
    const timer = setTimeout(() => setVisibleSocialButtons(false), 1000);
    return () => clearTimeout(timer);
  };

  const toggleSocialButtons = () => {
    setVisibleSocialButtons(!visibleSocialButtons);
  };

  return (
    <ClickAwayListener onClickAway={() => hideSocialButtons()}>
      <Box display="flex" flexDirection="column">
        <Box display="flex">
          <Button
            variant="outlined"
            endIcon={<ShareIcon />}
            onClick={toggleSocialButtons}
          >
            Share
          </Button>
        </Box>
        {visibleSocialButtons && (
          <Box display="flex" justifyContent={justifyButton} mt={1}>
            <ButtonGroup orientation="vertical">
              <CopyLinkButton
                url={url}
                onClick={() => {
                  onCopyLink();
                  hideSocialButtons();
                }}
              />
              <TwitterShareButton
                url={url}
                quote={quote}
                hashtags={hashtags}
                onClick={() => {
                  onShareTwitter();
                  hideSocialButtons();
                }}
              />
              <FacebookShareButton
                url={url}
                quote={quote}
                onClick={() => {
                  onShareFacebook();
                  hideSocialButtons();
                }}
              />
            </ButtonGroup>
          </Box>
        )}
      </Box>
    </ClickAwayListener>
  );
};
