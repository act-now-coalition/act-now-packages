import React, { Fragment } from "react";

import { Table, TableBody, TableHead, TableRow } from "./CompareTable.style";
import { CompareTableProps } from "./interfaces";

export interface CompareTableRowBase {
  /** A unique ID that identifies this row. */
  rowId: string;
}

export const CompareTable = <R extends CompareTableRowBase>({
  rows,
  columns,
  ...muiTableProps
}: CompareTableProps<R>) => {
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
        {rows.map((row, rowIndex) => (
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
