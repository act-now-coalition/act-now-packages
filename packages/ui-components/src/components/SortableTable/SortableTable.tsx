import React, { Fragment } from "react";
import { TableProps as MuiTableProps } from "@mui/material";
import { Table, TableHead, TableBody, TableRow } from "./SortableTable.style";

export interface ColumnDefinition<R> {
  id: string;
  rows: R[];
  renderHeader: React.FC<{ column: ColumnDefinition<R>; columnIndex: number }>;
  renderCell: React.FC<{ row: R; rowIndex: number; columnIndex: number }>;
}

export interface SortableTableProps<R> {
  rows: R[];
  columns: ColumnDefinition<R>[];
}

export interface BaseTableProps<R> extends MuiTableProps {
  rows: R[];
  columns: ColumnDefinition<R>[];
}

export const SortableTable = <R,>({
  rows,
  columns,
  ...muiTableProps
}: BaseTableProps<R>) => {
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
        {rows.map((row, rowIndex) => (
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
