import React from "react";

import {
  Table as MuiTable,
  TableBody as MuiTableBody,
  TableCell as MuiTableCell,
  TableContainer as MuiTableContainer,
  TableHead as MuiTableHead,
  TableRow as MuiTableRow,
  linkClasses,
  tableCellClasses,
  typographyClasses,
} from "@mui/material";

import { styled } from "../../styles";

export const TableContainer = MuiTableContainer;

// The table needs to have a height to allow us to set height: 100% on children
// of TableCell.
export const Table = styled(MuiTable)`
  height: 100%;
  border-collapse: separate;
`;

export const TableHead = MuiTableHead;

export const TableBody = MuiTableBody;

// Alternate white and light grey background for table rows
export const TableRow = styled(MuiTableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.grey[50],
  },
  "&:nth-of-type(even)": {
    backgroundColor: theme.palette.common.white,
  },
  "&:hover": {
    [`.${linkClasses.root} .${typographyClasses.root}`]: {
      color: theme.palette.primary.dark,
    },
  },
}));

const getStickyRowProps = (stickyRow?: boolean) =>
  stickyRow ? { top: 0, position: "sticky", zIndex: 1 } : {};

const getStickyColumnProps = (stickyColumn?: boolean) =>
  stickyColumn ? { left: 0, position: "sticky", zIndex: 2 } : {};

const getStickyRowAndColumnProps = (
  stickyRow?: boolean,
  stickyColumn?: boolean
) => (stickyRow && stickyColumn ? { zIndex: 3 } : {});

const shouldForwardTableCellProps = (name: string) =>
  !["stickyRow", "stickyColumn"].includes(name);

export const TableCell = styled(MuiTableCell, {
  shouldForwardProp: shouldForwardTableCellProps,
})<{ stickyRow?: boolean; stickyColumn?: boolean }>(
  ({ theme, stickyRow, stickyColumn }) => ({
    [`.${tableCellClasses.root}`]: {
      padding: theme.spacing(1),
    },
    [`&.${tableCellClasses.head}`]: {
      verticalAlign: "bottom",
      backgroundColor: theme.palette.common.white,
      ...getStickyRowProps(stickyRow),
      ...getStickyColumnProps(stickyColumn),
      ...getStickyRowAndColumnProps(stickyRow, stickyColumn),
    },
    [`&.${tableCellClasses.body}`]: {
      backgroundColor: "inherit",
      ...getStickyColumnProps(stickyColumn),
    },
  })
);

export type TableCellProps = React.ComponentProps<typeof TableCell>;
