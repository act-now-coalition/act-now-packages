import React from "react";
import { ComponentMeta } from "@storybook/react";
import { Button, Typography } from "@mui/material";
import { formatInteger } from "@actnowcoalition/number-format";
import { states, Region } from "@actnowcoalition/regions";
import {
  SortDirection,
  TableCell,
  CompareTable,
  ColumnDefinition,
  ColumnHeader,
  compare,
  TableContainer,
} from ".";
import { Action, ActionType, SortState, useSortableTable } from "./utils";

export default {
  title: "Table/CompareTable",
  component: CompareTable,
} as ComponentMeta<typeof CompareTable>;

interface RowItem {
  rowId: string;
  region: Region;
}

const rows: RowItem[] = states.all
  .sort((a, b) => compare(a.population, b.population))
  .map((region) => ({ region, rowId: region.regionId }));

const StatefulCompareTable: React.FC<{
  rows: RowItem[];
  dispatch: React.Dispatch<Action>;
  state: SortState;
}> = ({ dispatch, state }) => {
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

  const sortColumnId = state.columnId;
  const sortDirection = state.sortDirection;

  const onClickSort = (direction: SortDirection, columnId: string) => {
    dispatch({ type: ActionType.SET_SORTING_COLUMN, columnId });
    dispatch({ type: ActionType.SET_SORT_DIRECTION, sortDirection: direction });
  };

  return (
    <>
      <CompareTable
        rows={rows}
        columns={columns}
        sortColumnId={sortColumnId}
        sortDirection={sortDirection}
      />
    </>
  );
};

export const Example = () => {
  const initialState = {
    columnId: "name",
    sortDirection: SortDirection.ASC,
  };

  const [state, dispatch] = useSortableTable(initialState);

  return (
    <>
      <Button
        onClick={() =>
          dispatch({
            type: ActionType.SET_SORTING_COLUMN,
            columnId: "population",
          })
        }
      >
        Sort By Population
      </Button>

      <TableContainer sx={{ maxWidth: 400, height: 600 }}>
        <StatefulCompareTable rows={rows} dispatch={dispatch} state={state} />
      </TableContainer>
    </>
  );
};
