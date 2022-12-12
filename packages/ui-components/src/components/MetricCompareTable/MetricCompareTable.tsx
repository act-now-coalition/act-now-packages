import React, { useState } from "react";

import { Metric } from "@actnowcoalition/metrics";
import { Region, RegionDB } from "@actnowcoalition/regions";

import { useDataForRegionsAndMetrics } from "../../common/hooks";
import {
  ColumnDefinition,
  CompareTable,
  CompareTableProps,
  SortDirection,
  TableSortState,
  sortTableRows,
} from "../CompareTable";
import { ErrorBox } from "../ErrorBox";
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
  /** Initial sorting column. By default, it will use the location column. */
  sortColumnId?: string;
  /** Initial sort direction. Ascending by default. */
  sortDirection?: SortDirection;
}

export const MetricCompareTable = ({
  regionDB,
  regions,
  metrics: metricOrIds,
  sortColumnId: initialSortColumnId,
  sortDirection: initialSortDirection,
  ...otherCompareTableProps
}: MetricCompareTableProps) => {
  const initialState = {
    sortColumnId: initialSortColumnId ?? "location",
    sortDirection: initialSortDirection ?? SortDirection.ASC,
  };

  const [sortState, setSortState] = useState<TableSortState>(initialState);
  const { sortColumnId, sortDirection } = sortState;

  const onClickSort = (direction: SortDirection, columnId: string) => {
    setSortState({ sortDirection: direction, sortColumnId: columnId });
  };

  const metricCatalog = useMetricCatalog();
  const metrics = metricOrIds.map((m) => metricCatalog.getMetric(m));

  const { data, error } = useDataForRegionsAndMetrics(
    regions,
    metrics,
    /*includeTimeseries=*/ false
  );

  if (error) {
    return <ErrorBox>Table could not be loaded.</ErrorBox>;
  } else if (!data) {
    // TODO(#473): Better loading state.
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

  const sortedRows = sortTableRows<Row>(rows, columns, sortState);

  return (
    <CompareTable
      rows={sortedRows}
      columns={columns}
      {...otherCompareTableProps}
    />
  );
};
