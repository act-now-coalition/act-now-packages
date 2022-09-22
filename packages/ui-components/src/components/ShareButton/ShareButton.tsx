import React, { useState } from "react";
import { Button } from "@mui/material";
import ShareIcon from "@mui/icons-material/Share";
import { CopyLinkButton } from "./CopyLinkButton";
import { TwitterShareButton } from "./TwitterShareButton";
import { FacebookShareButton } from "./FacebookShareButton";
import { Menu, MenuItem } from "./ShareButton.style";

export interface ShareButtonProps {
  url: string;
  quote: string;
  hashtags?: string[];
  onCopyLink: () => void;
  onShareTwitter: () => void;
  onShareFacebook: () => void;
  menuOrigin?: "left" | "center" | "right";
}

export const ShareButton: React.FC<ShareButtonProps> = ({
  url,
  quote,
  hashtags = [],
  onCopyLink,
  onShareTwitter,
  onShareFacebook,
  menuOrigin = "left",
}) => {
  const [anchorButton, setAnchorButton] = useState<null | HTMLElement>(null);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorButton(event.currentTarget);
  };
  const handleClose = () => {
    const timer = setTimeout(() => setAnchorButton(null), 1000);
    () => clearTimeout(timer);
  };
  return (
    <>
      <Button variant="outlined" endIcon={<ShareIcon />} onClick={handleClick}>
        Share
      </Button>
      <Menu
        anchorEl={anchorButton}
        open={Boolean(anchorButton)}
        onClose={() => setAnchorButton(null)}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: menuOrigin,
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: menuOrigin,
        }}
      >
        <MenuItem>
          <CopyLinkButton
            url={url}
            onClick={() => {
              onCopyLink();
              handleClose();
            }}
          />
        </MenuItem>
        <MenuItem>
          <TwitterShareButton
            url={url}
            title={quote}
            hashtags={hashtags}
            onClick={() => {
              onShareTwitter();
              handleClose();
            }}
          >
            Twitter
          </TwitterShareButton>
        </MenuItem>
        <MenuItem>
          <FacebookShareButton
            url={url}
            quote={quote}
            onClick={() => {
              onShareFacebook();
              handleClose();
            }}
          >
            Facebook
          </FacebookShareButton>
        </MenuItem>
      </Menu>
    </>
  );
};
