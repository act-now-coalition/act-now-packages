import React, { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import LinkIcon from "@mui/icons-material/Link";
import Button from "@mui/material/Button";

interface CopyLinkButtonProps {
  url: string;
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
