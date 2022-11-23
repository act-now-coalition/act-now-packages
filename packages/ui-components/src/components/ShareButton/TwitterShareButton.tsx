import TwitterIcon from "@mui/icons-material/Twitter";
import { Button } from "@mui/material";
import React from "react";
import { TwitterShareButton as ReactShareTwitterShareButton } from "react-share";

export type TwitterShareButtonProps = React.ComponentProps<
  typeof ReactShareTwitterShareButton
> & {
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
