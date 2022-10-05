import React from "react";
import TwitterIcon from "@mui/icons-material/Twitter";
import { Button } from "@mui/material";
import { TwitterShareButton as ReactShareTwitterShareButton } from "react-share";

type BaseProps = React.ComponentProps<typeof ReactShareTwitterShareButton>;

export interface TwitterShareButtonProps extends BaseProps {
  onClick: () => void;
}

export const TwitterShareButton: React.FC<TwitterShareButtonProps> = ({
  onClick,
  ...otherProps
}) => (
  <ReactShareTwitterShareButton {...otherProps}>
    <Button
      onClick={onClick}
      endIcon={<TwitterIcon />}
      fullWidth
      component="div"
    >
      Twitter
    </Button>
  </ReactShareTwitterShareButton>
);
