import React from "react";
import { Table, TableHead, TableBody, TableRow } from "@mui/material";
import { TableProps as MuiTableProps } from "@mui/material";

export interface BaseTableColumn<R> {
  name: string;
  rows: R[];
  sticky?: boolean;
  renderCell: React.FC<{
    row: R;
    rowIndex: number;
    columnIndex: number;
  }>;
  renderHeader: React.FC<{
    column: BaseTableColumn<R>;
    columnIndex: number;
  }>;
}

export interface BaseTableProps<R> extends MuiTableProps {
  rows: R[];
  columns: BaseTableColumn<R>[];
}

export const BaseTable = <R,>({ rows, columns }: BaseTableProps<R>) => {
  return (
    <Table>
      <TableHead>
        <TableRow>
          {columns.map((column, columnIndex) => (
            <>{column.renderHeader({ column, columnIndex })}</>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map((row, rowIndex) => (
          <TableRow key={`table-row-${rowIndex}`}>
            {columns.map((column, columnIndex) => (
              <>{column.renderCell({ row, rowIndex, columnIndex })}</>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
