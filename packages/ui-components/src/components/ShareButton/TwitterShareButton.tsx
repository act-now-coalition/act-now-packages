import React from "react";
import * as ReactShare from "react-share";
import TwitterIcon from "@mui/icons-material/Twitter";
import { Button } from "@mui/material";

export const TwitterShareButton: React.FC<{
  url: string;
  quote: string;
  hashtags?: string[];
  onClickShare: () => void;
  hideSocialButtons: () => void;
}> = ({ url, quote, hashtags, onClickShare, hideSocialButtons }) => (
  <Button
    onClick={() => {
      onClickShare();
      setTimeout(() => hideSocialButtons(), 1000);
    }}
    endIcon={<TwitterIcon />}
  >
    <ReactShare.TwitterShareButton url={url} hashtags={hashtags} title={quote}>
      Twitter
    </ReactShare.TwitterShareButton>
  </Button>
);
