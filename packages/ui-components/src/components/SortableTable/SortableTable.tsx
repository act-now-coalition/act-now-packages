import React, { Fragment } from "react";
import { TableProps as MuiTableProps } from "@mui/material";
import { Table, TableHead, TableBody, TableRow } from "./SortableTable.style";
import { SortDirection } from "../SortControls";

export interface ColumnDefinition<R> {
  id: string;
  rows: R[];
  renderHeader: React.FC<{ column: ColumnDefinition<R>; columnIndex: number }>;
  renderCell: React.FC<{ row: R; rowIndex: number; columnIndex: number }>;
  compareFn?: (a: R, b: R) => number;
}

export interface SortableTableProps<R> extends MuiTableProps {
  rows: R[];
  columns: ColumnDefinition<R>[];
  sortColumnId?: string;
  sortDirection?: SortDirection;
}

export const SortableTable = <R,>({
  rows,
  columns,
  sortColumnId,
  sortDirection = SortDirection.DESC,
  ...muiTableProps
}: SortableTableProps<R>) => {
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
