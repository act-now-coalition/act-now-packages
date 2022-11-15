import React, { Fragment } from "react";
import { Table, TableHead, TableBody, TableRow } from "./CompareTable.style";
import { SortDirection, CompareTableProps } from "./interfaces";
import { sortRows } from "./utils";

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
