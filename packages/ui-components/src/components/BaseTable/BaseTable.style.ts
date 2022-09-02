import {
  Table as MuiTable,
  TableBody as MuiTableBody,
  TableCell as MuiTableCell,
  TableHead as MuiTableHead,
  TableRow as MuiTableRow,
} from "@mui/material";
import { css } from "@emotion/react";
import { styled } from "../../styles";

export const Table = styled(MuiTable)``;

export const TableHead = styled(MuiTableHead)``;

export const TableBody = styled(MuiTableBody)``;

export const TableRow = styled(MuiTableRow)``;

const cssStickyColumn = css`
  left: 0;
  position: sticky;
  z-index: 2;
  background-color: #fafafa;
`;

const cssStickyRow = css`
  top: 0;
  position: sticky;
  background-color: #eee;
  z-index: 1;
`;

const cssStickyRowAndColumn = css`
  top: 0;
  left: 0;
  position: sticky;
  z-index: 3;
  background-color: #eee;
`;

const isStickyProp = (propName: string) =>
  !["stickyRow", "stickyColumn"].includes(propName);

export const TableCell = styled(MuiTableCell, {
  shouldForwardProp: isStickyProp,
})<{
  stickyColumn?: boolean;
}>`
  ${({ stickyColumn }) => (stickyColumn ? cssStickyColumn : null)}
`;

export const TableCellHead = styled(TableCell, {
  shouldForwardProp: isStickyProp,
})<{
  stickyRow?: boolean;
  stickyColumn?: boolean;
}>`
  font-weight: ${({ theme }) => theme.typography.fontWeightBold};
  ${({ stickyRow }) => (stickyRow ? cssStickyRow : null)}
  ${({ stickyRow, stickyColumn }) =>
    stickyRow && stickyColumn ? cssStickyRowAndColumn : null}
`;
