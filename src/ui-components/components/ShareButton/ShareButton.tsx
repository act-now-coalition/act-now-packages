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
  /**
   * URL to share with social share buttons and to copy with copy link button.
   */
  url: string;
  /**
   * Share quote.
   */
  quote: string;
  /**
   * Array of hashtags shared by Twitter share button.
   * @default []
   */
  hashtags?: string[];
  /**
   * Callback fired when copy link button is clicked.
   */
  onCopyLink?: () => void;
  /**
   * Callback fired when Twitter share button is clicked.
   */
  onShareTwitter?: () => void;
  /**
   * Callback fired when Facebook share button is clicked.
   */
  onShareFacebook?: () => void;
  /**
   * Horizontal origin of the popover containing the share buttons.
   * @default "left"
   */
  menuOrigin?: PopoverOrigin["horizontal"];
  /**
   * MUI Button variant applied to the anchor button.
   * @default "outlined"
   */
  variant?: ButtonProps["variant"];
  /**
   * MUI Button size applied to the anchor button.
   * @default "large"
   */
  size?: ButtonProps["size"];
  /**
   * MUI Button className applied to the anchor button.
   */
  className?: string;
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
  className = "",
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
        className={className}
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
        anchorOrigin={{ vertical: "bottom", horizontal: menuOrigin }}
        transformOrigin={{ vertical: "top", horizontal: menuOrigin }}
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
