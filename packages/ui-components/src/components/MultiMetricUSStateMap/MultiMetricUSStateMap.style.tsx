import { Box } from "@mui/material";
import { styled } from "../../styles";

export const BorderedContainer = styled(Box)`
  border: ${({ theme }) => `1px solid ${theme.palette.border.default}`};
`;

export const BorderedContainerLast = styled(BorderedContainer)`
  border-bottom-left-radius: ${({ theme }) => theme.shape.borderRadius}px;
  border-bottom-right-radius: ${({ theme }) => theme.shape.borderRadius}px;
  border-top: none;
  padding: ${({ theme }) => theme.spacing(3)};
`;
