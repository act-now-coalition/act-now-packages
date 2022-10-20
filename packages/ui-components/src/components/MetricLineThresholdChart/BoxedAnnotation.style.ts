import { styled } from "../../styles";

// TODO (Pablo): The font-weight for dataTabular is not readable against
// a light background.
export const StyledText = styled("text")`
  font-family: ${({ theme }) => theme.typography.dataTabular.fontFamily};
  font-size: ${({ theme }) => theme.typography.dataTabular.fontSize};
  font-weight: ${({ theme }) =>
    theme.typography.dataEmphasizedSmall.fontWeight};
`;
