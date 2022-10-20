import { styled } from "../../styles";

export const StyledText = styled("text")`
  font-family: ${({ theme }) => theme.typography.dataTabular.fontFamily};
  font-size: ${({ theme }) => theme.typography.dataTabular.fontSize};
  font-weight: ${({ theme }) => theme.typography.dataTabular.fontWeight};
`;
