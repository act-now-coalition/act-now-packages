import { styled, theme } from "../../styles";
import { Button } from "@mui/material";
import isValidProp from "@emotion/is-prop-valid";

export const SocialShareButton = styled("div", {
  shouldForwardProp: isValidProp,
})<{ color?: string }>`
  width: 64px;
  height: 48px;

  border-right: 1px solid ${(props) => props.theme.palette.grey[200]};
  &:last-child {
    border-right: none;
  }

  &:hover {
    background-color: ${theme.palette.grey[200]};
  }

  > button {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
  }

  button {
    align-items: center;
  }

  svg {
    rect {
      fill: transparent;
    }
    path {
      fill: ${(props) => props.color ?? "#000"};
    }
  }

  ${({ theme }) => theme.breakpoints.up("sm")} {
    width: 80px;
    height: 56px;
  }
`;

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
