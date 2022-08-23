import { styled } from "../../styles";
import isValidProp from "@emotion/is-prop-valid";
import { css } from "@emotion/react";

// TODO: Typography should be "paragraph.small", update once we update the theme.
export const TickLabel = styled("text")`
  text-anchor: middle;
  dominant-baseline: hanging;
  fill: ${({ theme }) => theme.palette.text.primary};
`;

export const TickMark = styled("line")`
  stroke-width: 1;
  stroke: ${({ theme }) => theme.palette.border.default};
`;

export const LegendThresholdVerticalWrapper = styled("div")`
  width: fit-content;
`;

export const LegendContainer = styled("div")`
  display: flex;
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
  margin-right: ${(props) => props.theme.spacing(2)};
  ${(props) => getTopRadius(props.roundTop)}
  ${(props) => getBottomRadius(props.roundBottom)}
`;

export const LegendLabelContainer = styled("div")`
  display: flex;
  flex-direction: column;
  justify-content: center;
  white-space: nowrap;
`;
