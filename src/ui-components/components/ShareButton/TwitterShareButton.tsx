import React from "react";

import TwitterIcon from "@mui/icons-material/Twitter";
import { Button } from "@mui/material";
import { TwitterShareButton as ReactShareTwitterShareButton } from "react-share";

export type TwitterShareButtonProps = React.ComponentProps<
  typeof ReactShareTwitterShareButton
> & {
  /**
   * Callback fired when the Twitter share button is clicked.
   */
  onClick: () => void;
};

export const TwitterShareButton = ({
  onClick,
  ...otherProps
}: TwitterShareButtonProps) => (
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
