import { Region } from "@actnowcoalition/regions";
import { Metric, MultiMetricDataStore } from "@actnowcoalition/metrics";
import { CompareTableProps } from "../CompareTable";
import React from "react";

export interface Row {
  /** Unique ID for the row. */
  rowId: string;
  /** Region corresponding to this row. */
  region: Region;
  /** multiMetricDataStore instance to make metric data accessible to every cell */
  multiMetricDataStore: MultiMetricDataStore;
}

export type RegionLinkComponentProp = React.JSXElementConstructor<{
  region: Region;
  children: React.ReactNode;
}>;

export interface MetricCompareTableProps
  extends Omit<CompareTableProps<Row>, "rows" | "columns"> {
  /** List of regions (first column)  */
  regions: Region[];
  /** List of metrics or metricID - order of the columns will match */
  metrics: (Metric | string)[];
  /**  The link component needs an href prop */
  RegionLinkComponent?: RegionLinkComponentProp;
}
