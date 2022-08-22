import { styled } from "../../styles";

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
