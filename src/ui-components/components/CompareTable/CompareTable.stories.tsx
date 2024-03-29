import React, { useState } from "react";

import { Typography } from "@mui/material";
import { ComponentMeta } from "@storybook/react";

import {
  ColumnDefinition,
  ColumnHeader,
  CompareTable,
  SortDirection,
  TableCell,
  TableContainer,
  compare,
  sortTableRows,
} from ".";
import { formatInteger } from "../../../number-format";
import { Region, states } from "../../../regions";

export default {
  title: "Components/CompareTable",
  component: CompareTable,
} as ComponentMeta<typeof CompareTable>;

export interface RowItem {
  rowId: string;
  region: Region;
}

const rows: RowItem[] = states.all
  .sort((a, b) => compare(a.population, b.population))
  .map((region) => ({ region, rowId: region.regionId }));

const StatefulCompareTable = ({ rows }: { rows: RowItem[] }) => {
  const columns: ColumnDefinition<RowItem>[] = [
    {
      columnId: "name",
      name: "Location",
      renderHeader: ({ column }) => (
        <ColumnHeader
          stickyColumn
          stickyRow
          label={column.name}
          align="left"
          sortDirection={
            column.columnId === sortColumnId ? sortDirection : undefined
          }
          onClickSort={(direction) => onClickSort(direction, column.columnId)}
          sx={{ minWidth: 200 }}
        />
      ),
      renderCell: ({ row }) => (
        <TableCell stickyColumn>{row.region.shortName}</TableCell>
      ),
      sorterAsc: (rowA, rowB) =>
        compare(rowA.region.shortName, rowB.region.shortName),
    },
    {
      columnId: "missing-data",
      name: "Missing Data",
      renderHeader: ({ column }) => (
        <ColumnHeader label={column.name} align="right" />
      ),
      renderCell: () => (
        <TableCell align="right">
          <Typography variant="dataTabular">---</Typography>
        </TableCell>
      ),
    },
    {
      columnId: "fips",
      name: "FIPS Code",
      renderHeader: ({ column }) => (
        <ColumnHeader
          label="FIPS"
          align="right"
          sortDirection={
            column.columnId === sortColumnId ? sortDirection : undefined
          }
          onClickSort={(direction) => onClickSort(direction, column.columnId)}
        />
      ),
      renderCell: ({ row }) => (
        <TableCell align="right">
          <Typography variant="dataTabular">{row.region.regionId}</Typography>
        </TableCell>
      ),
      sorterAsc: (rowA, rowB) =>
        compare(rowA.region.regionId, rowB.region.regionId),
    },
    {
      columnId: "population",
      name: "Population",
      renderHeader: ({ column }) => (
        <ColumnHeader
          label={column.name}
          align="right"
          sortDirection={
            column.columnId === sortColumnId ? sortDirection : undefined
          }
          onClickSort={(direction) => onClickSort(direction, column.columnId)}
        />
      ),
      renderCell: ({ row }) => (
        <TableCell align="right">
          <Typography variant="dataTabular">
            {formatInteger(row.region.population)}
          </Typography>
        </TableCell>
      ),
      sorterAsc: (rowA, rowB) =>
        compare(rowA.region.population, rowB.region.population),
    },
    {
      columnId: "character-count",
      name: "Character count",
      renderHeader: ({ column }) => (
        <ColumnHeader
          label={column.name}
          align="right"
          sortDirection={
            column.columnId === sortColumnId ? sortDirection : undefined
          }
          onClickSort={(direction) => onClickSort(direction, column.columnId)}
          sx={{ minWidth: 160 }}
        />
      ),
      renderCell: ({ row }) => (
        <TableCell align="right">
          <Typography variant="dataTabular">
            {formatInteger(row.region.fullName.length)}
          </Typography>
        </TableCell>
      ),
      sorterAsc: (rowA, rowB) =>
        compare(rowA.region.fullName.length, rowB.region.fullName.length),
    },
  ];

  const [sortState, setSortState] = useState({
    sortColumnId: columns[0].columnId,
    sortDirection: SortDirection.ASC,
  });
  const { sortColumnId, sortDirection } = sortState;

  const onClickSort = (direction: SortDirection, columnId: string) => {
    setSortState({ sortColumnId: columnId, sortDirection: direction });
  };

  const sortedRows = sortTableRows(rows, columns, sortState);
  return <CompareTable rows={sortedRows} columns={columns} />;
};

export const Example = () => {
  return (
    <TableContainer sx={{ maxWidth: 700, height: 600 }}>
      <StatefulCompareTable rows={rows} />
    </TableContainer>
  );
};
