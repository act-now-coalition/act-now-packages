import React, { useState } from "react";
import {
  ColumnDefinition,
  CompareTable,
  SortDirection,
  sortRows,
} from "../CompareTable";
import { useMetricCatalog } from "../MetricCatalogContext";
import { useDataForRegionsAndMetrics } from "../../common/hooks";
import { Row, MetricCompareTableProps } from "./interfaces";
import { createMetricColumn, createLocationColumn } from "./utils";

export const MetricCompareTable: React.FC<MetricCompareTableProps> = ({
  regions,
  metrics: metricOrIds,
  ...otherCompareTableProps
}) => {
  // TODO: It might be better to define and set a context to control the
  // state of the table if we need to control it from a parent component.
  const [sortDirection, setSortDirection] = useState(SortDirection.DESC);
  const [sortColumnId, setSortColumnId] = useState("location");

  const onClickSort = (direction: SortDirection, columnId: string) => {
    setSortDirection(direction);
    setSortColumnId(columnId);
  };

  const metricCatalog = useMetricCatalog();
  const metrics = metricOrIds.map((m) => metricCatalog.getMetric(m));

  const { data, error } = useDataForRegionsAndMetrics(regions, metrics);

  if (!data || error) {
    return null;
  }

  const rows: Row[] = data.all.map((multiMetricDataStore) => ({
    rowId: multiMetricDataStore.region.regionId,
    region: multiMetricDataStore.region,
    multiMetricDataStore,
  }));

  const columns: ColumnDefinition<Row>[] = [
    createLocationColumn(sortDirection, sortColumnId, onClickSort),
    ...metrics.map((metric) =>
      createMetricColumn(metric, sortDirection, sortColumnId, onClickSort)
    ),
  ];

  const sortColumn = columns.find((col) => col.columnId === sortColumnId);
  const sortedRows = sortRows<Row>(rows, sortDirection, sortColumn?.sorterAsc);

  return (
    <CompareTable
      rows={sortedRows}
      columns={columns}
      {...otherCompareTableProps}
    />
  );
};
