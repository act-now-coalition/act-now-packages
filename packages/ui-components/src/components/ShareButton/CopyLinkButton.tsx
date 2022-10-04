import React, { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import LinkIcon from "@mui/icons-material/Link";
import Button from "@mui/material/Button";

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
      <Button
        endIcon={<LinkIcon />}
        fullWidth
        sx={{ ":hover": { backgroundColor: "transparent" } }}
      >
        {copiedLink ? "Copied!" : "Copy Link"}
      </Button>
    </CopyToClipboard>
  );
};
