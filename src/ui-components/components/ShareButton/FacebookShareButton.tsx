import React from "react";

import FacebookIcon from "@mui/icons-material/Facebook";
import { Button } from "@mui/material";
import { FacebookShareButton as ReactShareFacebookShareButton } from "react-share";

export type FacebookShareButtonProps = React.ComponentProps<
  typeof ReactShareFacebookShareButton
> & {
  /**
   * Callback fired when the Facebook share button is clicked.
   */
  onClick: () => void;
};

export const FacebookShareButton = ({
  onClick,
  ...otherProps
}: FacebookShareButtonProps) => (
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
