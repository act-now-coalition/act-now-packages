import React from "react";
import * as ReactShare from "react-share";
import TwitterIcon from "@mui/icons-material/Twitter";
import { Button } from "./ShareButton.style";

export const TwitterShareButton: React.FC<{
  url: string;
  quote: string;
  hashtags?: string[];
  onClick: () => void;
}> = ({ url, quote, hashtags, onClick }) => (
  <Button onClick={() => onClick()} endIcon={<TwitterIcon />} fullWidth>
    <ReactShare.TwitterShareButton url={url} hashtags={hashtags} title={quote}>
      Twitter
    </ReactShare.TwitterShareButton>
  </Button>
);
