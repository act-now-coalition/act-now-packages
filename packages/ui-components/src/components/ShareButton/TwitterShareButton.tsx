import React from "react";
import TwitterIcon from "@mui/icons-material/Twitter";
import { Typography, Stack } from "@mui/material";
import { StyledReactShareTwitterButton } from "./ShareButton.style";
import { TwitterShareButton as ReactShareTwitterShareButton } from "react-share";

type BaseProps = React.ComponentProps<typeof ReactShareTwitterShareButton>;

export interface TwitterShareButtonProps extends BaseProps {
  onClick: () => void;
}

export const TwitterShareButton: React.FC<TwitterShareButtonProps> = ({
  onClick,
  ...otherProps
}) => (
  <StyledReactShareTwitterButton
    {...otherProps}
    onClick={onClick}
    resetButtonStyle={false} /** allows us to customize styles */
  >
    <Stack spacing={0.75} direction="row" justifyContent="center">
      <Typography variant="labelLarge" color="primary">
        Twitter
      </Typography>
      <TwitterIcon color="primary" />
    </Stack>
  </StyledReactShareTwitterButton>
);
