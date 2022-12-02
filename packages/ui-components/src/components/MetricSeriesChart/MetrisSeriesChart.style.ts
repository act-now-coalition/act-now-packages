import { styled } from "../../styles";

export const SeriesLabel = styled("text")`
  font-size: ${({ theme }) => theme.typography.paragraphSmall.fontSize};
  font-weight: ${({ theme }) => theme.typography.paragraphSmall.fontWeight};
  dominant-baseline: middle;
`;
