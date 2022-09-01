import React from "react";
import { TableProps as MuiTableProps } from "@mui/material";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableCellHead,
} from "./BaseTable.style";

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
            <TableCellHead
              key={`table-column-${columnIndex}`}
              stickyRow={true}
              stickyColumn={column.sticky}
            >
              {column.renderHeader({ column, columnIndex })}
            </TableCellHead>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map((row, rowIndex) => (
          <TableRow key={`table-row-${rowIndex}`}>
            {columns.map((column, columnIndex) => (
              <TableCell
                key={`table-cell-${rowIndex}-${columnIndex}`}
                stickyColumn={column.sticky}
              >
                {column.renderCell({ row, rowIndex, columnIndex })}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
