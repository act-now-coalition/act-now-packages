import React, { Fragment } from "react";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  SortDirection,
  CompareTableProps,
} from ".";

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
  const sortColumn = columns.find((column) => column.id === sortColumnId);
  const sortedRows =
    sortColumn && sortColumn.compareFn
      ? sortRows(rows, sortColumn.compareFn, sortDirection)
      : rows;

  return (
    <Table {...muiTableProps}>
      <TableHead>
        <TableRow>
          {columns.map((column, columnIndex) => (
            <Fragment key={`column-${column.id}`}>
              {column.renderHeader({ column, columnIndex })}
            </Fragment>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {sortedRows.map((row, rowIndex) => (
          <TableRow key={`table-row-${row.rowId}`}>
            {columns.map((column, columnIndex) => (
              <Fragment key={`cell-${row.rowId}-${column.id}`}>
                {column.renderCell({ row, rowIndex, columnIndex })}
              </Fragment>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

function sortRows<R>(
  rows: R[],
  compareFn: (a: R, b: R) => number,
  sortDirection: SortDirection
): R[] {
  const sortedAsc = [...rows].sort(compareFn);
  return sortDirection === SortDirection.ASC ? sortedAsc : sortedAsc.reverse();
}
