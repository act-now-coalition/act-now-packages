import { Metric } from "@actnowcoalition/metrics";
import { Region, RegionDB } from "@actnowcoalition/regions";
import React, { useState } from "react";

import { useDataForRegionsAndMetrics } from "../../common/hooks";
import {
  ColumnDefinition,
  CompareTable,
  CompareTableProps,
  SortDirection,
  sortRows,
} from "../CompareTable";
import { useMetricCatalog } from "../MetricCatalogContext";
import { Row, createLocationColumn, createMetricColumn } from "./utils";

export interface MetricCompareTableProps
  extends Omit<CompareTableProps<Row>, "rows" | "columns"> {
  /** Region DB instance to use  */
  regionDB: RegionDB;
  /** List of regions (first column)  */
  regions: Region[];
  /** List of metrics or metricID - order of the columns will match */
  metrics: (Metric | string)[];
}

export const MetricCompareTable = ({
  regionDB,
  regions,
  metrics: metricOrIds,
  ...otherCompareTableProps
}: MetricCompareTableProps) => {
  // TODO(Pablo): It might be better to define and set a context to control the
  // state of the table if we need to control it from a parent component.
  const [sortDirection, setSortDirection] = useState(SortDirection.DESC);
  const [sortColumnId, setSortColumnId] = useState("location");

  const onClickSort = (direction: SortDirection, columnId: string) => {
    setSortDirection(direction);
    setSortColumnId(columnId);
  };

  const metricCatalog = useMetricCatalog();
  const metrics = metricOrIds.map((m) => metricCatalog.getMetric(m));

  const { data, error } = useDataForRegionsAndMetrics(
    regions,
    metrics,
    /*includeTimeseries=*/ false
  );

  if (!data || error) {
    return null;
  }

  const rows: Row[] = data.all.map((multiMetricDataStore) => ({
    rowId: multiMetricDataStore.region.regionId,
    region: multiMetricDataStore.region,
    multiMetricDataStore,
  }));

  const columns: ColumnDefinition<Row>[] = [
    createLocationColumn(regionDB, sortDirection, sortColumnId, onClickSort),
    ...metrics.map((metric) =>
      createMetricColumn(
        regionDB,
        metric,
        sortDirection,
        sortColumnId,
        onClickSort
      )
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
