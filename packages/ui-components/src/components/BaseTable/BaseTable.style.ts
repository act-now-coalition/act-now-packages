import isValidProp from "@emotion/is-prop-valid";
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
  background-color: #eee;
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

export const TableCell = styled(MuiTableCell, {
  shouldForwardProp: isValidProp,
})<{ stickyColumn?: boolean }>`
  ${({ stickyColumn }) => (stickyColumn ? cssStickyColumn : null)}
`;

export const TableCellHead = styled(TableCell, {
  shouldForwardProp: isValidProp,
})<{ stickyRow?: boolean; stickyColumn?: boolean }>`
  ${({ stickyRow }) => (stickyRow ? cssStickyRow : null)}
  ${({ stickyRow, stickyColumn }) =>
    stickyRow && stickyColumn ? cssStickyRowAndColumn : null}
`;
