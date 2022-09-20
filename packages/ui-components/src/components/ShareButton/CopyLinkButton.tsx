import React, { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Button } from "@mui/material";
import LinkIcon from "@mui/icons-material/Link";

export const CopyLinkButton = ({
  url,
  onCopyLink,
  hideSocialButtons,
}: {
  url: string;
  onCopyLink: () => void;
  hideSocialButtons: () => void;
}) => {
  const [copiedLink, setCopiedLink] = useState(false);
  return (
    <CopyToClipboard
      text={url}
      onCopy={() => {
        setCopiedLink(true);
        onCopyLink();
        setTimeout(() => hideSocialButtons(), 1000);
      }}
    >
      <Button endIcon={<LinkIcon />}>
        {copiedLink ? "Copied!" : "Copy Link"}
      </Button>
    </CopyToClipboard>
  );
};
