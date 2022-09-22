import React from "react";
import * as ReactShare from "react-share";
import TwitterIcon from "@mui/icons-material/Twitter";
import { Button } from "./ShareButton.style";

type BaseProps = React.ComponentProps<typeof ReactShare.TwitterShareButton>;

export interface TwitterShareButtonProps extends BaseProps {
  onClick: () => void;
}

export const TwitterShareButton: React.FC<TwitterShareButtonProps> = ({
  onClick,
  ...otherProps
}) => (
  <Button onClick={() => onClick()} endIcon={<TwitterIcon />} fullWidth>
    <ReactShare.TwitterShareButton {...otherProps} />
  </Button>
);
