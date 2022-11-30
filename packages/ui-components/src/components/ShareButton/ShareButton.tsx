import React, { useState } from "react";

import ShareIcon from "@mui/icons-material/Share";
import { Button, ButtonProps, PopoverOrigin } from "@mui/material";
import isNull from "lodash/isNull";

import { CopyLinkButton } from "./CopyLinkButton";
import { FacebookShareButton } from "./FacebookShareButton";
import { Menu, MenuItem } from "./ShareButton.style";
import { TwitterShareButton } from "./TwitterShareButton";

const noop = () => {
  return;
};

export interface ShareButtonProps {
  url: string;
  quote: string;
  hashtags?: string[];
  onCopyLink?: () => void;
  onShareTwitter?: () => void;
  onShareFacebook?: () => void;
  menuOrigin?: PopoverOrigin["horizontal"];
  variant?: ButtonProps["variant"];
  size?: ButtonProps["size"];
}

export const ShareButton = ({
  url,
  quote,
  hashtags = [],
  onCopyLink = noop,
  onShareTwitter = noop,
  onShareFacebook = noop,
  menuOrigin = "left",
  variant = "outlined",
  size = "large",
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
        variant={variant}
        size={size}
        endIcon={<ShareIcon />}
        onClick={handleClick}
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
