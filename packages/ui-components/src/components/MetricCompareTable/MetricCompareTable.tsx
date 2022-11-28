import React from "react";
import { Region, RegionDB } from "@actnowcoalition/regions";
import { Metric } from "@actnowcoalition/metrics";
import { SortDirection } from "../../common/utils/compare";
import { useDataForRegionsAndMetrics } from "../../common/hooks";
import {
  ColumnDefinition,
  CompareTable,
  sortRows,
  CompareTableProps,
  useTableStateManager,
} from "../CompareTable";
import { useMetricCatalog } from "../MetricCatalogContext";
import { createMetricColumn, createLocationColumn, Row } from "./utils";

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
  const { sortDirection, sortColumnId, setSorting } = useTableStateManager({
    sortDirection: SortDirection.DESC,
    sortColumnId: "location",
  });

  const onClickSort = (direction: SortDirection, columnId: string) => {
    setSorting(direction, columnId);
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
