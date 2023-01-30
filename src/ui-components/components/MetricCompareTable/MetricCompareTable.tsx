import React, { useState } from "react";

import { Skeleton } from "@mui/material";

import { Metric } from "../../../metrics";
import { Region, RegionDB } from "../../../regions";
import { useDataForRegionsAndMetrics } from "../../common/hooks";
import {
  ColumnDefinition,
  CompareTable,
  CompareTableProps,
  SortDirection,
  TableSortState,
  sortTableRows,
} from "../CompareTable";
import { ComponentLoaded } from "../ComponentLoaded";
import { ErrorBox } from "../ErrorBox";
import { useMetricCatalog } from "../MetricCatalogContext";
import { Row, createLocationColumn, createMetricColumn } from "./utils";

export interface MetricCompareTableProps
  extends Omit<CompareTableProps<Row>, "rows" | "columns"> {
  /**
   * Region DB instance to use.
   */
  regionDB: RegionDB;
  /**
   * Array of regions (rendered as the first column).
   */
  regions: Region[];
  /**
   * Array of metrics or metricID's to render as columns.
   * The order of the columns will match the order of the array.
   */
  metrics: (Metric | string)[];
  /**
   * ID of the initial sorted column.
   * @default 'location' (the first column)
   */
  sortColumnId?: string;
  /**
   * Initial sort direction.
   * @default SortDirection.ASC
   */
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
    return <Skeleton variant="rectangular" width="100%" height="100%" />;
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
    <>
      <CompareTable
        rows={sortedRows}
        columns={columns}
        {...otherCompareTableProps}
      />
      {data && <ComponentLoaded />}
    </>
  );
};
