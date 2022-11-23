import {
  CompareTableProps,
  SortDirection,
  Table,
  TableBody,
  TableHead,
  TableRow,
} from ".";
import React, { Fragment } from "react";

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

/**
 * Sort the rows using the given sorter function and direction
 */
export function sortRows<R>(
  rows: R[],
  sortDirection: SortDirection,
  sorterAsc?: (a: R, b: R) => number
): R[] {
  if (!sorterAsc) {
    return rows;
  }

  const sortedAsc = [...rows].sort(sorterAsc);
  return sortDirection === SortDirection.ASC ? sortedAsc : sortedAsc.reverse();
}

/**
 * Function that compares two items for sorting (ascending).
 *
 * @example
 * ```tsx
 * compare("a", "b") // -1
 * compare("a", "a") // 0
 * compare(1, 2) // -1
 * [3, 2, 4, 1].sort(compare) // [1, 2, 3, 4]
 * ```
 */
export function compare<T>(a: T, b: T): number {
  if (a < b) {
    return -1;
  } else if (a > b) {
    return 1;
  } else {
    return 0;
  }
}
