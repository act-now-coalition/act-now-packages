import React from "react";
import * as ReactShare from "react-share";
import FacebookIcon from "@mui/icons-material/Facebook";
import { Button } from "@mui/material";

export const FacebookShareButton: React.FC<{
  url: string;
  quote: string;
  onClickShare: () => void;
  hideSocialButtons: () => void;
}> = ({ url, quote, onClickShare, hideSocialButtons }) => (
  <Button
    onClick={() => {
      onClickShare();
      setTimeout(() => hideSocialButtons(), 1000);
    }}
    endIcon={<FacebookIcon />}
  >
    <ReactShare.FacebookShareButton url={url} quote={quote}>
      Facebook
    </ReactShare.FacebookShareButton>
  </Button>
);
