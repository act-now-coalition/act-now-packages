import React, { useState } from "react";
import {
  ColumnDefinition,
  CompareTable,
  SortDirection,
  sortRows,
  CompareTableProps,
} from "../CompareTable";
import { useMetricCatalog } from "../MetricCatalogContext";
import { useDataForRegionsAndMetrics } from "../../common/hooks";
import { createMetricColumn, createLocationColumn } from "./utils";
import { Region, RegionDB } from "@actnowcoalition/regions";
import { Metric, MultiMetricDataStore } from "@actnowcoalition/metrics";

export interface Row {
  /** Unique ID for the row. */
  rowId: string;
  /** Region corresponding to this row. */
  region: Region;
  /** multiMetricDataStore instance to make metric data accessible to every cell */
  multiMetricDataStore: MultiMetricDataStore;
}

export interface MetricCompareTableProps
  extends Omit<CompareTableProps<Row>, "rows" | "columns"> {
  /** Region DB instance to use  */
  regionDB: RegionDB;
  /** List of regions (first column)  */
  regions: Region[];
  /** List of metrics or metricID - order of the columns will match */
  metrics: (Metric | string)[];
}

export const MetricCompareTable: React.FC<MetricCompareTableProps> = ({
  regionDB,
  regions,
  metrics: metricOrIds,
  ...otherCompareTableProps
}) => {
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
