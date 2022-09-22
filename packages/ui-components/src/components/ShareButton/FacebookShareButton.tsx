import React from "react";
import * as ReactShare from "react-share";
import FacebookIcon from "@mui/icons-material/Facebook";
import { Button } from "./ShareButton.style";

type BaseProps = React.ComponentProps<typeof ReactShare.FacebookShareButton>;

export interface FacebookShareButtonProps extends BaseProps {
  onClick: () => void;
}

export const FacebookShareButton: React.FC<FacebookShareButtonProps> = ({
  onClick,
  ...otherProps
}) => (
  <Button onClick={() => onClick()} endIcon={<FacebookIcon />} fullWidth>
    <ReactShare.FacebookShareButton {...otherProps} />
  </Button>
);
