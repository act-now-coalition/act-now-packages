import { Region } from "@actnowcoalition/regions";
import { assert } from "console";
import { Metric } from "../Metric/Metric";
import { Timeseries } from "../Timeseries";
import { MetricData } from "./MetricData";
import { MetricDataProvider } from "./MetricDataProvider";
import { MultiMetricDataStore } from "./MultiMetricDataStore";
import { MultiRegionMultiMetricDataStore } from "./MultiRegionMultiMetricDataStore";

/**
 * Simple data provider that provides a static value.
 */
export class StaticValueDataProvider extends MetricDataProvider {
  constructor() {
    super("static-value");
  }

  async fetchData(
    regions: Region[],
    metrics: Metric[],
    includeTimeseries: boolean
  ): Promise<MultiRegionMultiMetricDataStore<unknown>> {
    const data: { [regionId: string]: MultiMetricDataStore } = {};
    for (const region of regions) {
      const regionData: { [metricId: string]: MetricData } = {};
      for (const metric of metrics) {
        const value = metric.dataReference?.value;
        assert(
          value !== undefined,
          `${metric} is missing a "value" in its "static-data" data reference.`
        );

        const timeseries = !includeTimeseries
          ? undefined
          : new Timeseries([
              {
                date: new Date("2022-01-02"),
                value,
              },
            ]);
        regionData[metric.id] = new MetricData(
          metric,
          region,
          value,
          timeseries
        );
      }
      data[region.regionId] = new MultiMetricDataStore(region, regionData);
    }

    return new MultiRegionMultiMetricDataStore(data);
  }
}
