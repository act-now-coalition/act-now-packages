import React, { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Button } from "@mui/material";
import LinkIcon from "@mui/icons-material/Link";

export const CopyLinkButton = ({
  url,
  onClick,
}: {
  url: string;
  onClick: () => void;
}) => {
  const [copiedLink, setCopiedLink] = useState(false);
  return (
    <CopyToClipboard
      text={url}
      onCopy={() => {
        setCopiedLink(true);
        onClick();
      }}
    >
      <Button endIcon={<LinkIcon />}>
        {copiedLink ? "Copied!" : "Copy Link"}
      </Button>
    </CopyToClipboard>
  );
};
