import { Button, ButtonProps } from "@mui/material";
import { Menu, MenuItem } from "./ShareButton.style";
import React, { useState } from "react";

import { CopyLinkButton } from "./CopyLinkButton";
import { FacebookShareButton } from "./FacebookShareButton";
import ShareIcon from "@mui/icons-material/Share";
import { TwitterShareButton } from "./TwitterShareButton";
import isNull from "lodash/isNull";

const noop = () => {
  return;
};

export interface BaseShareButtonProps {
  url: string;
  quote: string;
  hashtags?: string[];
  onCopyLink?: () => void;
  onShareTwitter?: () => void;
  onShareFacebook?: () => void;
  menuOrigin?: "left" | "center" | "right";
}

export type ShareButtonProps = ButtonProps & BaseShareButtonProps;

export const ShareButton = ({
  url,
  quote,
  hashtags = [],
  onCopyLink = noop,
  onShareTwitter = noop,
  onShareFacebook = noop,
  menuOrigin = "left",
  ...muiButtonProps
}: ShareButtonProps) => {
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
      <Button
        variant="outlined"
        endIcon={<ShareIcon />}
        onClick={handleClick}
        {...muiButtonProps}
      >
        Share
      </Button>
      <Menu
        anchorEl={anchorButton}
        open={!isNull(anchorButton)}
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
