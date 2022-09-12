import { styled } from "../../styles";
import isValidProp from "@emotion/is-prop-valid";

export const ProgressBarContainer = styled("div", {
  shouldForwardProp: isValidProp,
})<{
  width: number;
}>`
  width: 100%;
  max-width: ${(props) => props.width}px;
`;

export const StyledSvg = styled("svg")`
  width: 100%;
  border-radius: 4px;
`;
