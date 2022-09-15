import React from "react";
import isNumber from "lodash/isNumber";
import { Metric } from "@actnowcoalition/metrics";
import { MetricValue } from "../MetricValue";
import {
  ColumnDefinition,
  ColumnHeader,
  TableCell,
  SortDirection,
} from "../CompareTable";
import { Row } from "./interfaces";

export function createMetricColumn(
  metric: Metric,
  sortDirection: SortDirection,
  sortColumnId: string,
  onClickSort: (direction: SortDirection, columnId: string) => void
): ColumnDefinition<Row> {
  return {
    columnId: metric.id,
    name: metric.name,
    renderHeader: ({ column }) => {
      const isSortActive = sortColumnId === column.columnId;
      return (
        <ColumnHeader
          label={column.name}
          sortDirection={sortDirection}
          isSortActive={isSortActive}
          onClickSort={(dir) => onClickSort(dir, column.columnId)}
          aria-sort={isSortActive ? sortDirection : undefined}
        />
      );
    },
    renderCell: ({ row }) => (
      <TableCell>
        <MetricValue
          metric={metric}
          region={row.region}
          variant="dataTabular"
          justifyContent="end"
        />
      </TableCell>
    ),
    sorterAsc: (rowA, rowB) => {
      const { currentValue: valueA } =
        rowA.multiMetricDataStore.metricData(metric);
      const { currentValue: valueB } =
        rowB.multiMetricDataStore.metricData(metric);

      if (isNumber(valueA) && isNumber(valueB)) {
        return valueA - valueB;
      }

      if (!isNumber(valueA) && !isNumber(valueB)) {
        return 0;
      } else {
        return isNumber(valueA) ? -1 : 1;
      }
    },
  };
}

export function createLocationColumn(
  sortDirection: SortDirection,
  sortColumnId: string,
  onClickSort: (direction: SortDirection, columnId: string) => void
): ColumnDefinition<Row> {
  return {
    columnId: "location",
    name: "Location",
    renderHeader: ({ column }) => {
      const isSortActive = sortColumnId === column.columnId;
      return (
        <ColumnHeader
          label={column.name}
          sortDirection={sortDirection}
          isSortActive={column.columnId === sortColumnId}
          onClickSort={(dir) => onClickSort(dir, column.columnId)}
          aria-sort={isSortActive ? sortDirection : undefined}
          stickyColumn
          stickyRow
        />
      );
    },
    renderCell: ({ row }) => (
      <TableCell stickyColumn>{row.region.fullName}</TableCell>
    ),
    sorterAsc: (rowA, rowB) =>
      rowA.region.fullName < rowB.region.fullName ? -1 : 1,
  };
}
