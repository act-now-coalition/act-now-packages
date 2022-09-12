import { TableProps as MuiTableProps } from "@mui/material";

export enum SortDirection {
  ASC = "asc",
  DESC = "desc",
}

export interface ColumnDefinition<R> {
  id: string;
  renderHeader: React.FC<{ column: ColumnDefinition<R>; columnIndex: number }>;
  renderCell: React.FC<{ row: R; rowIndex: number; columnIndex: number }>;
  compareFn?: (a: R, b: R) => number;
}

export interface CompareTableProps<R> extends MuiTableProps {
  rows: R[];
  columns: ColumnDefinition<R>[];
  sortColumnId?: string;
  sortDirection?: SortDirection;
}
