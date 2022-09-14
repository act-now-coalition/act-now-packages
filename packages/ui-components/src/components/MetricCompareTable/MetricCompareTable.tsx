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
  sortRows,
} from "../CompareTable";
import { useMetricCatalog } from "../MetricCatalogContext";

export interface MetricCompareTableProps {
  /** List of regions (first column)  */
  regions: Region[];
  /** List of metrics or metricID - order of the columns will match */
  metrics: (Metric | string)[];
}

interface Row {
  /** Unique ID for the row */
  rowId: string;
  /** Region */
  region: Region;
  /** multiMetricDataStore instance, make the data available on each row */
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
      columnId: "location",
      name: "Location",
      renderHeader: ({ column }) => (
        <ColumnHeader
          label={column.name}
          sortDirection={sortDirection}
          isSortActive={column.columnId === sortColumnId}
          onClickSort={(dir) => onClickSort(dir, column.columnId)}
          stickyColumn
          stickyRow
        />
      ),
      renderCell: ({ row }) => (
        <TableCell stickyColumn>{row.region.fullName}</TableCell>
      ),
      sorterAsc: (rowA, rowB) =>
        rowA.region.fullName < rowB.region.fullName ? -1 : 1,
    },
    ...metrics.map((metric) =>
      createMetricColumn(metric, sortDirection, sortColumnId, onClickSort)
    ),
  ];

  const sortColumn = columns.find((col) => col.columnId === sortColumnId);
  const sortedRows =
    sortColumn && sortColumn.sorterAsc
      ? sortRows<Row>(rows, sortColumn.sorterAsc, sortDirection)
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
    columnId: metric.id,
    name: metric.name,
    renderHeader: ({ column }) => (
      <ColumnHeader
        label={column.name}
        sortDirection={sortDirection}
        isSortActive={sortColumnId === column.columnId}
        onClickSort={(dir) => onClickSort(dir, column.columnId)}
      />
    ),
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
