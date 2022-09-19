import { styled } from "../../styles";
import { css } from "@emotion/react";
import { Button } from "@mui/material";

export const Container = styled("div")``;

export const StyledShareButtonStyles = css`
  cursor: pointer;
  color: white;
  display: block;
  flex: 1;
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
  font-size: 0.875rem;
  font-weight: 700;
  height: 2.5rem;
  line-height: 2.5rem;
  text-transform: uppercase;
  user-select: none;
  text-align: center;

  &:hover {
    background-color: rgba(0, 0, 0, 0.12);
  }

  > button {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
  }

  svg {
    display: block;
    rect {
      fill: transparent;
    }
    path {
      fill: "#000";
    }
  }
`;

export const SocialShareButton = styled("div")`
  ${StyledShareButtonStyles};
  border-right: 1px solid ${(props) => props.theme.palette.grey[500]};
  display: "block";
  width: 60px;
  height: 42px;
  ∂ &:last-child {
    border-right: none;
  }

  ${({ theme }) => theme.breakpoints.up("sm")} {
    width: 80px;
    height: 56px;
  }

  button {
    align-items: center;
  }
`;

// disableElevation: true,
// disableRipple: true,
// disableFocusRipple: true,
// disableTouchRipple: true,

export const SocialButton = styled(Button)`
  width: 60px;
  height: 42px;
  text-transform: none;
  font-size: 0.75rem;
  line-height: 1.2;
  text-transform: none;
  color: rgba(0, 0, 0, 0.7);
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
  font-weight: normal;

  &:focus-visible {
    outline: rgb(0, 95, 204) 1px auto;
  }

  ${({ theme }) => theme.breakpoints.up("sm")} {
    font-size: 0.875rem;
    width: 80px;
    height: 56px;
  }
`;
