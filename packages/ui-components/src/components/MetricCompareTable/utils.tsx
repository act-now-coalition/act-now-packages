import React from "react";
import isNumber from "lodash/isNumber";
import { Metric } from "@actnowcoalition/metrics";
import { MetricValue } from "../MetricValue";
import {
  ColumnDefinition,
  ColumnHeader,
  TableCell,
  SortDirection,
  getAriaSort,
} from "../CompareTable";
import { Row, RegionLinkComponentProp } from "./interfaces";

export function createMetricColumn(
  metric: Metric,
  sortDirection: SortDirection,
  sortColumnId: string,
  onClickSort: (direction: SortDirection, columnId: string) => void,
  RegionLinkComponent: RegionLinkComponentProp
): ColumnDefinition<Row> {
  return {
    columnId: metric.id,
    name: metric.name,
    renderHeader: ({ column }) => {
      const isSortActive = sortColumnId === column.columnId;
      return (
        <ColumnHeader
          label={column.name}
          sortDirection={isSortActive ? sortDirection : undefined}
          onClickSort={(dir) => onClickSort(dir, column.columnId)}
          aria-sort={getAriaSort(isSortActive, sortDirection)}
        />
      );
    },
    renderCell: ({ row }) => (
      <TableCell>
        <RegionLinkComponent region={row.region}>
          <MetricValue
            metric={metric}
            region={row.region}
            variant="dataTabular"
            justifyContent="end"
          />
        </RegionLinkComponent>
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
        // Sort locations with a metric value before locations that are
        // missing the value
        return isNumber(valueA) ? -1 : 1;
      }
    },
  };
}

export function createLocationColumn(
  sortDirection: SortDirection,
  sortColumnId: string,
  onClickSort: (direction: SortDirection, columnId: string) => void,
  RegionLinkComponent: RegionLinkComponentProp
): ColumnDefinition<Row> {
  return {
    columnId: "location",
    name: "Location",
    renderHeader: ({ column }) => {
      const isSortActive = sortColumnId === column.columnId;
      return (
        <ColumnHeader
          label={column.name}
          sortDirection={isSortActive ? sortDirection : undefined}
          onClickSort={(dir) => onClickSort(dir, column.columnId)}
          aria-sort={getAriaSort(isSortActive, sortDirection)}
          stickyColumn
          stickyRow
        />
      );
    },
    renderCell: ({ row }) => (
      <TableCell stickyColumn>
        <RegionLinkComponent region={row.region}>
          {row.region.fullName}
        </RegionLinkComponent>
      </TableCell>
    ),
    sorterAsc: (rowA, rowB) =>
      rowA.region.fullName < rowB.region.fullName ? -1 : 1,
  };
}
