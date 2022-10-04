import { styled } from "../../styles";
import { Menu as MuiMenu, MenuItem as MuiMenuItem } from "@mui/material";
import { FacebookShareButton, TwitterShareButton } from "react-share";
import { css } from "@emotion/react";

export const Menu = styled(MuiMenu)`
  .MuiMenu-paper {
    margin-top: ${(props) => props.theme.spacing(1)};
    min-width: 125px;
  }
  .MuiMenu-list {
    padding: 0;
  }
`;

export const MenuItem = styled(MuiMenuItem)`
  padding: 0;
`;

const ReactShareButtonStyles = css`
  width: 100%;
  cursor: pointer;
  border: none;
  background: none;
  padding: 6px 8px;
`;

export const StyledReactShareFacebookButton = styled(FacebookShareButton)`
  ${ReactShareButtonStyles};
`;

export const StyledReactShareTwitterButton = styled(TwitterShareButton)`
  ${ReactShareButtonStyles};
`;
