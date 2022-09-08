import {
  Table as MuiTable,
  TableHead as MuiTableHead,
  TableBody as MuiTableBody,
  TableRow as MuiTableRow,
  TableCell as MuiTableCell,
  tableCellClasses,
} from "@mui/material";
import { styled } from "../../styles";

export const Table = styled(MuiTable)``;

export const TableHead = styled(MuiTableHead)``;

export const TableBody = styled(MuiTableBody)``;

export const TableRow = styled(MuiTableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.grey[50],
  },
  "&:nth-of-type(even)": {
    backgroundColor: theme.palette.common.white,
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
    [`&.${tableCellClasses.head}`]: {
      verticalAlign: "bottom",
      backgroundColor: theme.palette.common.white,
      fontWeight: theme.typography.fontWeightBold,
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
