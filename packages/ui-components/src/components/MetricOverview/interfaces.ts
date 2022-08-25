import { MetricData, DataOrError } from "@actnowcoalition/metrics";
export interface CommonMetricOverviewProps<T> {
  dataOrError: DataOrError<MetricData<T>>;
}
