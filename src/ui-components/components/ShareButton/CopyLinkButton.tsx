import React, { useState } from "react";

import LinkIcon from "@mui/icons-material/Link";
import Button from "@mui/material/Button";
import { CopyToClipboard } from "react-copy-to-clipboard";

interface CopyLinkButtonProps {
  /**
   * URL copied when the copy link button is clicked.
   */
  url: string;
  /**
   * Callback fired when the copy link button is clicked.
   */
  onClick: () => void;
}

export const CopyLinkButton = ({ url, onClick }: CopyLinkButtonProps) => {
  const [copiedLink, setCopiedLink] = useState(false);
  return (
    <CopyToClipboard
      text={url}
      onCopy={() => {
        setCopiedLink(true);
        onClick();
      }}
    >
      <Button endIcon={<LinkIcon />} fullWidth>
        {copiedLink ? "Copied!" : "Copy Link"}
      </Button>
    </CopyToClipboard>
  );
};
