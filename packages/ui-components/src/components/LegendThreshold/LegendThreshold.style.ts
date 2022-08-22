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

export const LegendThresholdVerticalWrapper = styled("div", {
  shouldForwardProp: isValidProp,
})<{
  $height: number;
}>`
  width: fit-content;
  height: ${(props) => props.$height}px;
`;

export const LegendContainer = styled("div", {
  shouldForwardProp: isValidProp,
})<{
  $height: number;
}>`
  display: flex;
  height: ${(props) => props.$height}px;
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
  $width: number;
  $color: string;
  $roundTop: number;
  $roundBottom: number;
}>`
  background-color: ${(props) => props.$color};
  width: ${(props) => props.$width}px;
  margin-right: ${(props) => props.theme.spacing(2)};
  ${(props) => getTopRadius(props.$roundTop)}
  ${(props) => getBottomRadius(props.$roundBottom)}
`;

export const LegendLabelContainer = styled("div")`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const LegendLabelStyles = css`
  font-size: 0.875rem;
  white-space: nowrap;
`;

export const LegendLabel = styled("div")`
  ${LegendLabelStyles}
  color: ${({ theme }) => theme.palette.secondary.dark};
  font-weight: ${({ theme }) => theme.typography.fontWeightBold};
`;

export const LegendSublabel = styled("div")`
  ${LegendLabelStyles}
  color: ${({ theme }) => theme.palette.secondary.light};
`;
