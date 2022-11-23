import { css } from "@emotion/react";
import isValidProp from "@emotion/is-prop-valid";
import { styled } from "../../styles";

export const TickLabel = styled("text")`
  text-anchor: middle;
  dominant-baseline: hanging;
  fill: ${({ theme }) => theme.typography.paragraphSmall.color};
  font-family: ${({ theme }) => theme.typography.paragraphSmall.fontFamily};
  font-size: ${({ theme }) => theme.typography.paragraphSmall.fontSize};
  font-weight: ${({ theme }) => theme.typography.paragraphSmall.fontWeight};
`;

export const TickMark = styled("line")`
  stroke-width: 1;
  stroke: ${({ theme }) => theme.palette.border.default};
`;

const getTopRadius = ($roundTop: number) => css`
  border-top-left-radius: ${$roundTop}px;
  border-top-right-radius: ${$roundTop}px;
`;

const getBottomRadius = ($roundBottom: number) => css`
  border-bottom-left-radius: ${$roundBottom}px;
  border-bottom-right-radius: ${$roundBottom}px;
`;

export const LegendColor = styled("div", { shouldForwardProp: isValidProp })<{
  roundTop: number;
  roundBottom: number;
}>`
  ${(props) => getTopRadius(props.roundTop)}
  ${(props) => getBottomRadius(props.roundBottom)}
`;
