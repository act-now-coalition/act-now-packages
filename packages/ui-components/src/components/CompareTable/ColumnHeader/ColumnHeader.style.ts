import { styled } from "../../../styles";
import { TableCell } from "..";

export const StyledTableCell = styled(TableCell, {
  shouldForwardProp: (name) => name !== "isSortActive",
})<{ isSortActive?: boolean }>`
  padding-bottom: ${({ theme }) => theme.spacing(0.5)};
  border-bottom: ${({ theme, isSortActive }) =>
    isSortActive
      ? `solid 2px ${theme.palette.common.black}`
      : `solid 1px ${theme.palette.border.default}`};
  color: ${({ theme, isSortActive }) =>
    isSortActive ? theme.palette.common.black : theme.palette.secondary.light};
`;
