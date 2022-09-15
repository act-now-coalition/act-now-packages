import { TableProps as MuiTableProps } from "@mui/material";

/** Represents sorting directions for a column. */
export enum SortDirection {
  ASC = "ascending",
  DESC = "descending",
}

export interface ColumnDefinition<R> {
  /** A unique ID that identifies the this column. */
  columnId: string;
  /**
   * The name of the column. It can be used to render the header
   * or to add accessibility labels if the column header doesn't
   * have visible names.
   */
  name: string;
  /** Render the column header. */
  renderHeader: React.FC<{ column: ColumnDefinition<R>; columnIndex: number }>;
  /** Render the table cell. */
  renderCell: React.FC<{ row: R; rowIndex: number; columnIndex: number }>;
  /**
   * Comparator function to use when sorting the table by this
   * column in ascending order. Calling `rows.sort(column.sorterAsc)`
   * should return the rows sorted by column, in ascending order.
   **/
  sorterAsc?: (a: R, b: R) => number;
}

export interface CompareTableProps<R> extends MuiTableProps {
  /** Table rows. */
  rows: R[];
  /** List of column definitions. */
  columns: ColumnDefinition<R>[];
  /** ID of the column to sort by. */
  sortColumnId?: string;
  /** Sort direction. */
  sortDirection?: SortDirection;
}
