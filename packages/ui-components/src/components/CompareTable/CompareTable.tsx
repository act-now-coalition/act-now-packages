import React, { Fragment } from "react";
import { TableProps as MuiTableProps } from "@mui/material";
import { SortDirection } from "../../common/utils/compare";
import { Table, TableHead, TableBody, TableRow } from "./CompareTable.style";
import { sortRows } from "./utils";

export interface ColumnDefinition<R> {
  /** A unique ID that identifies this column. */
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

export interface CompareTableRowBase {
  /** A unique ID that identifies this row. */
  rowId: string;
}

export const CompareTable = <R extends CompareTableRowBase>({
  rows,
  columns,
  sortColumnId,
  sortDirection = SortDirection.DESC,
  ...muiTableProps
}: CompareTableProps<R>) => {
  const sortColumn = columns.find((column) => column.columnId === sortColumnId);
  const sortedRows = sortRows(rows, sortDirection, sortColumn?.sorterAsc);

  return (
    <Table {...muiTableProps}>
      <TableHead>
        <TableRow>
          {columns.map((column, columnIndex) => (
            <Fragment key={`column-${column.columnId}`}>
              {column.renderHeader({ column, columnIndex })}
            </Fragment>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {sortedRows.map((row, rowIndex) => (
          <TableRow key={`table-row-${row.rowId}`} hover>
            {columns.map((column, columnIndex) => (
              <Fragment key={`cell-${row.rowId}-${column.columnId}`}>
                {column.renderCell({ row, rowIndex, columnIndex })}
              </Fragment>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
