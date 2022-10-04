import React from "react";
import { FacebookShareButton as ReactShareFacebookShareButton } from "react-share";
import FacebookIcon from "@mui/icons-material/Facebook";
import { StyledReactShareFacebookButton } from "./ShareButton.style";
import { Typography, Stack } from "@mui/material";

type BaseProps = React.ComponentProps<typeof ReactShareFacebookShareButton>;

export interface FacebookShareButtonProps extends BaseProps {
  onClick: () => void;
}

export const FacebookShareButton: React.FC<FacebookShareButtonProps> = ({
  onClick,
  ...otherProps
}) => (
  <StyledReactShareFacebookButton
    {...otherProps}
    onClick={onClick}
    resetButtonStyle={false} /** allows us to customize styles */
  >
    <Stack spacing={0.75} direction="row" justifyContent="center">
      <Typography variant="labelLarge" color="primary">
        Facebook
      </Typography>
      <FacebookIcon color="primary" />
    </Stack>
  </StyledReactShareFacebookButton>
);
