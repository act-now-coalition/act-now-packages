import React, { Fragment } from "react";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  SortDirection,
  CompareTableProps,
} from ".";

export const CompareTable = <R,>({
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
            <Fragment key={`column-${columnIndex}`}>
              {column.renderHeader({ column, columnIndex })}
            </Fragment>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {sortedRows.map((row, rowIndex) => (
          <TableRow key={`table-row-${rowIndex}`}>
            {columns.map((column, columnIndex) => (
              <Fragment key={`cell-${rowIndex}-${columnIndex}`}>
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
