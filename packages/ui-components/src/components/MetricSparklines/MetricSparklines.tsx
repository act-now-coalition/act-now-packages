import { BaseSparkLineProps, SparkLine } from "../SparkLine";

import { Metric } from "@actnowcoalition/metrics";
import React from "react";
import { Region } from "@actnowcoalition/regions";
import { Skeleton } from "@mui/material";
import { useDataForMetrics } from "../../common/hooks";
import { useMetricCatalog } from "../MetricCatalogContext";

export interface MetricSparklinesProps extends BaseSparkLineProps {
  /** Region to generate sparkline for. */
  region: Region;
  /** Metric to use for line element of sparkline. */
  metricLineChart: Metric | string;
  /** Metric to use for bar elements of sparkline. */
  metricBarChart: Metric | string;
  /** Earliest date to be displayed. If not specified, earliest data point will be displayed. */
  dateFrom?: Date;
  /** Latest date to be displayed. If not specified, latest data point will be displayed.  */
  dateTo?: Date;
}

export const MetricSparklines = ({
  region,
  metricLineChart,
  metricBarChart,
  dateFrom,
  dateTo,
  ...optionalProps
}: MetricSparklinesProps) => {
  const metricCatalog = useMetricCatalog();
  metricLineChart = metricCatalog.getMetric(metricLineChart);
  metricBarChart = metricCatalog.getMetric(metricBarChart);

  const { data, error } = useDataForMetrics(
    region,
    [metricLineChart, metricBarChart],
    /*includeTimeseries=*/ true
  );

  if (error) {
    throw error;
  } else if (!data) {
    // Render loading placeholder.
    return (
      <Skeleton
        variant="rectangular"
        width={optionalProps.width ?? 150}
        height={optionalProps.height ?? 50}
      />
    );
  } else {
    // Render Sparkline.
    const timeseriesLineChart = data
      .metricData(metricLineChart)
      ?.timeseries.assertFiniteNumbers()
      .filterToDateRange({ startAt: dateFrom, endAt: dateTo });
    const timeseriesBarChart = data
      .metricData(metricBarChart)
      ?.timeseries.assertFiniteNumbers()
      .filterToDateRange({ startAt: dateFrom, endAt: dateTo });

    return (
      <SparkLine
        timeseriesLineChart={timeseriesLineChart}
        timeseriesBarChart={timeseriesBarChart}
        {...optionalProps}
      />
    );
  }
};
