import { styled } from "../../styles";

// TODO: Typography should be "micro", update once the theme includes that
export const TickLabel = styled("text")`
  text-anchor: middle;
  dominant-baseline: hanging;
`;

// TODO: Replace grey[500] with the corresponding theme variable when ready
export const TickMark = styled("line")`
  stroke-width: 1;
  stroke: ${({ theme }) => theme.palette.grey[500]};
`;
