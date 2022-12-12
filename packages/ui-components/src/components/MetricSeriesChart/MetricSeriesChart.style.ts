import { styled } from "../../styles";

export const SeriesLabel = styled("text")`
  font-size: ${({ theme }) => theme.typography.paragraphSmall.fontSize};
  font-weight: ${({ theme }) => theme.typography.paragraphSmall.fontWeight};
  font-family: ${({ theme }) => theme.typography.paragraphSmall.fontFamily};
  line-height: ${({ theme }) => theme.typography.paragraphSmall.lineHeight};
  dominant-baseline: middle;
`;
