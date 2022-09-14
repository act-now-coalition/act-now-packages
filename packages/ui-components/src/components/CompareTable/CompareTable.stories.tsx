import React, { useState } from "react";
import { ComponentMeta } from "@storybook/react";
import { Paper, Typography } from "@mui/material";
import { formatInteger } from "@actnowcoalition/number-format";
import { states, Region } from "@actnowcoalition/regions";
import {
  SortDirection,
  TableCell,
  CompareTable,
  ColumnDefinition,
  ColumnHeader,
} from ".";

export default {
  title: "Table/CompareTable",
  component: CompareTable,
} as ComponentMeta<typeof CompareTable>;

interface RowItem {
  rowId: string;
  region: Region;
}

const rows: RowItem[] = states.all
  .sort((a, b) => (a.population > b.population ? -1 : 1))
  .map((region) => ({ region, rowId: region.regionId }));

const StatefulCompareTable: React.FC<{
  rows: RowItem[];
}> = () => {
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
          sortDirection={sortDirection}
          isSortActive={column.columnId === sortColumnId}
          onClickSort={(direction) => onClickSort(direction, column.columnId)}
          sx={{ minWidth: 200 }}
        />
      ),
      renderCell: ({ row }) => (
        <TableCell stickyColumn>{row.region.shortName}</TableCell>
      ),
      sorterAsc: (rowA, rowB) =>
        rowA.region.shortName < rowB.region.shortName ? -1 : 1,
    },
    {
      columnId: "fips",
      name: "FIPS Code",
      renderHeader: ({ column }) => (
        <ColumnHeader
          label="FIPS"
          align="right"
          sortDirection={sortDirection}
          isSortActive={column.columnId === sortColumnId}
          onClickSort={(direction) => onClickSort(direction, column.columnId)}
        />
      ),
      renderCell: ({ row }) => (
        <TableCell align="right">
          <Typography variant="dataTabular">{row.region.regionId}</Typography>
        </TableCell>
      ),
      sorterAsc: (rowA, rowB) =>
        rowA.region.regionId < rowB.region.regionId ? -1 : 1,
    },
    {
      columnId: "population",
      name: "Population",
      renderHeader: ({ column }) => (
        <ColumnHeader
          label={column.name}
          align="right"
          sortDirection={sortDirection}
          isSortActive={column.columnId === sortColumnId}
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
        rowA.region.population - rowB.region.population,
    },
    {
      columnId: "words",
      name: "Character count",
      renderHeader: ({ column }) => (
        <ColumnHeader
          label={column.name}
          align="right"
          sortDirection={sortDirection}
          isSortActive={column.columnId === sortColumnId}
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
        rowA.region.fullName.length - rowB.region.fullName.length,
    },
  ];

  const [sortColumnId, setSortColumnId] = useState(columns[0].columnId);
  const [sortDirection, setSortDirection] = useState(SortDirection.ASC);

  const onClickSort = (direction: SortDirection, columnId: string) => {
    setSortColumnId(columnId);
    setSortDirection(direction);
  };

  return (
    <CompareTable
      rows={rows}
      columns={columns}
      sortColumnId={sortColumnId}
      sortDirection={sortDirection}
    />
  );
};

export const Example = () => {
  return (
    <Paper sx={{ maxWidth: 400, height: 600, overflow: "auto" }}>
      <StatefulCompareTable rows={rows} />
    </Paper>
  );
};
