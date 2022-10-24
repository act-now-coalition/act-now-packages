import { Region, RegionDB } from "@actnowcoalition/regions";
import { Metric, MultiMetricDataStore } from "@actnowcoalition/metrics";
import { CompareTableProps } from "../CompareTable";

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
