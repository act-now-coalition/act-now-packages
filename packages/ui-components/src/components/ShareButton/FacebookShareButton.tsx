import React from "react";
import { FacebookShareButton as ReactShareFacebookShareButton } from "react-share";
import FacebookIcon from "@mui/icons-material/Facebook";
import { Button } from "@mui/material";

type BaseProps = React.ComponentProps<typeof ReactShareFacebookShareButton>;

export interface FacebookShareButtonProps extends BaseProps {
  onClick: () => void;
}

export const FacebookShareButton: React.FC<FacebookShareButtonProps> = ({
  onClick,
  ...otherProps
}) => (
  <ReactShareFacebookShareButton {...otherProps}>
    <Button
      onClick={onClick}
      endIcon={<FacebookIcon />}
      fullWidth
      component="div"
    >
      Facebook
    </Button>
  </ReactShareFacebookShareButton>
);
