import { styled } from "../../styles";

// TODO: Typography should be "micro", update once we update the theme.
export const TickLabel = styled("text")`
  text-anchor: middle;
  dominant-baseline: hanging;
`;

// TODO: Replace grey[500] with the corresponding theme variable.
export const TickMark = styled("line")`
  stroke-width: 1;
  stroke: ${({ theme }) => theme.palette.grey[500]};
`;
