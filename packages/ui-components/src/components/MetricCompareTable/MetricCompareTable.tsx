import React, { useState } from "react";
import isNumber from "lodash/isNumber";
import { Region } from "@actnowcoalition/regions";
import { Metric, MultiMetricDataStore } from "@actnowcoalition/metrics";
import { MetricValue } from "../MetricValue";
import {
  ColumnDefinition,
  CompareTable,
  ColumnHeader,
  TableCell,
  SortDirection,
} from "../CompareTable";
import { useMetricCatalog } from "../MetricCatalogContext";

export interface MetricCompareTableProps {
  regions: Region[];
  metrics: (Metric | string)[];
}

interface Row {
  rowId: string;
  region: Region;
  multiMetricsDataStore: MultiMetricDataStore;
}

export const MetricCompareTable: React.FC<MetricCompareTableProps> = ({
  regions,
  metrics: metricOrIds,
}) => {
  // sorting state, etc
  const [sortDirection, setSortDirection] = useState(SortDirection.DESC);
  const [sortColumnId, setSortColumnId] = useState("location");

  const onClickSort = (direction: SortDirection, columnId: string) => {
    setSortDirection(direction);
    setSortColumnId(columnId);
  };

  const metricCatalog = useMetricCatalog();
  const metrics = metricOrIds.map((m) => metricCatalog.getMetric(m));

  // Define rows and columns
  const { data, error } = metricCatalog.useDataForRegionsAndMetrics(
    regions,
    metrics
  );

  if (!data || error) {
    return null;
  }

  const rows: Row[] = data.all.map((multiMetricDataStore) => ({
    rowId: multiMetricDataStore.region.regionId,
    region: multiMetricDataStore.region,
    multiMetricsDataStore: multiMetricDataStore,
  }));

  const columns: ColumnDefinition<Row>[] = [
    {
      id: "location",
      renderCell: ({ row }) => (
        <TableCell stickyColumn>{row.region.fullName}</TableCell>
      ),
      renderHeader: ({ column }) => (
        <ColumnHeader
          label="Location"
          sortDirection={sortDirection}
          isSortActive={column.id === sortColumnId}
          onClickSort={(dir) => onClickSort(dir, column.id)}
          stickyColumn
          stickyRow
        />
      ),
      compareFn: (rowA, rowB) =>
        rowA.region.fullName < rowB.region.fullName ? -1 : 1,
    },
    ...metrics.map((metric) =>
      createMetricColumn(metric, sortDirection, sortColumnId, onClickSort)
    ),
  ];

  const sortColumn = columns.find((col) => col.id === sortColumnId);
  const sortedRows =
    sortColumn && sortColumn.compareFn
      ? sortBy<Row>(rows, sortColumn.compareFn, sortDirection)
      : rows;

  return <CompareTable rows={sortedRows} columns={columns} />;
};

function createMetricColumn(
  metric: Metric,
  sortDirection: SortDirection,
  sortColumnId: string,
  onClickSort: (direction: SortDirection, columnId: string) => void
): ColumnDefinition<Row> {
  return {
    id: metric.id,
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
    renderHeader: ({ column }) => (
      <ColumnHeader
        label={metric.name}
        sortDirection={sortDirection}
        isSortActive={sortColumnId === column.id}
        onClickSort={(dir) => onClickSort(dir, column.id)}
      />
    ),
    compareFn: (rowA, rowB) => {
      const { currentValue: valueA } =
        rowA.multiMetricsDataStore.metricData(metric);
      const { currentValue: valueB } =
        rowB.multiMetricsDataStore.metricData(metric);

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

function sortBy<T>(
  items: T[],
  sortAsc: (a: T, b: T) => number,
  direction: SortDirection
): T[] {
  const sortedAsc = [...items].sort(sortAsc);
  return direction === SortDirection.ASC ? sortedAsc : sortedAsc.reverse();
}
