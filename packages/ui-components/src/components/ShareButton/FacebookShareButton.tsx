import React from "react";
import * as ReactShare from "react-share";
import FacebookIcon from "@mui/icons-material/Facebook";
import { Button } from "./ShareButton.style";

export const FacebookShareButton: React.FC<{
  url: string;
  quote: string;
  onClick: () => void;
}> = ({ url, quote, onClick }) => (
  <Button onClick={() => onClick()} endIcon={<FacebookIcon />} fullWidth>
    <ReactShare.FacebookShareButton url={url} quote={quote}>
      Facebook
    </ReactShare.FacebookShareButton>
  </Button>
);
