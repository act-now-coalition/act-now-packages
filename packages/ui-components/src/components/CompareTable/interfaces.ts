import { TableProps as MuiTableProps } from "@mui/material";

export enum SortDirection {
  ASC = "asc",
  DESC = "desc",
}

export interface ColumnDefinition<R> {
  /** Unique ID for the column (unique in the table) */
  columnId: string;
  /** Accessible name for the column */
  name: string;
  /** */
  renderHeader: React.FC<{ column: ColumnDefinition<R>; columnIndex: number }>;
  /** */
  renderCell: React.FC<{ row: R; rowIndex: number; columnIndex: number }>;
  /** How to sort the rows when sorting by this column rows.sort(sorterAsc)*/
  sorterAsc?: (a: R, b: R) => number;
}

export interface CompareTableProps<R> extends MuiTableProps {
  /** Array of rows. The table will match the sorting order initially */
  rows: R[];
  /** Column definitions */
  columns: ColumnDefinition<R>[];
  /** ID of the column to sort by */
  sortColumnId?: string;
  /** Sort direction (ASC or DESC) */
  sortDirection?: SortDirection;
}
