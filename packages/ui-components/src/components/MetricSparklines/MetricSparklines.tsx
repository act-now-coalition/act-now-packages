import React from "react";

import { Skeleton } from "@mui/material";

import { Metric } from "@actnowcoalition/metrics";
import { Region } from "@actnowcoalition/regions";

import { useDataForMetrics } from "../../common/hooks";
import { ErrorBox } from "../ErrorBox";
import { useMetricCatalog } from "../MetricCatalogContext";
import { BaseSparkLineProps, SparkLine } from "../SparkLine";

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
  const width = optionalProps.width ?? 150;
  const height = optionalProps.height ?? 50;

  if (error) {
    return (
      // Because the sparklines are too small for much text, we will just render a blank box.
      <ErrorBox width={width} height={height}>
        {""}
      </ErrorBox>
    );
  } else if (!data) {
    // Render loading placeholder.
    return <Skeleton variant="rectangular" width={width} height={height} />;
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
