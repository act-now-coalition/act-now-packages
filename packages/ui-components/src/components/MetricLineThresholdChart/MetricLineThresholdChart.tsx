import React from "react";

import { Skeleton } from "@mui/material";
import { Group } from "@visx/group";
import { scaleLinear, scaleUtc } from "@visx/scale";
import max from "lodash/max";
import min from "lodash/min";

import { assert } from "@actnowcoalition/assert";
import { Metric } from "@actnowcoalition/metrics";
import { Region } from "@actnowcoalition/regions";

import { useData } from "../../common/hooks";
import { BaseChartProps } from "../../common/utils/charts";
import { AxesTimeseries } from "../AxesTimeseries";
import { ChartOverlayX, useHoveredDate } from "../ChartOverlayX";
import { ErrorBox } from "../ErrorBox";
import { GridRows } from "../Grid";
import { LineIntervalChart } from "../LineIntervalChart";
import { useMetricCatalog } from "../MetricCatalogContext";
import { MetricTooltip } from "../MetricTooltip";
import { PointMarker } from "../PointMarker";
import { calculateChartIntervals } from "./utils";

export interface MetricLineThresholdChartProps extends BaseChartProps {
  metric: Metric | string;
  region: Region;
}

/**
 * MetricLineThresholdChart renders a line chart where line segments are
 * colored according to the metric categories and thresholds.
 *
 * For example, if we have a metric with two categories: High (red) and Low
 * (green) separated by a threshold at the value 10, the line will be red when
 * above 10 and green below it.
 */
export const MetricLineThresholdChart = ({
  metric: metricOrId,
  region,
  width,
  height,
  marginTop = 10,
  marginBottom = 30,
  marginLeft = 70,
  marginRight = 20,
}: MetricLineThresholdChartProps) => {
  const metricCatalog = useMetricCatalog();
  const metric = metricCatalog.getMetric(metricOrId);

  const { data, error } = useData(region, metric, /*includeTimeseries=*/ true);
  const timeseries = data && data.timeseries.assertFiniteNumbers();

  const { hoveredPoint, onMouseMove, onMouseLeave } =
    useHoveredDate(timeseries);

  if (error) {
    return (
      <ErrorBox width={width} height={height}>
        Chart could not be loaded.
      </ErrorBox>
    );
  } else if (!timeseries?.hasData?.()) {
    return <Skeleton variant="rectangular" width={width} height={height} />;
  }

  const chartHeight = height - marginTop - marginBottom;
  const chartWidth = width - marginLeft - marginRight;

  const { minDate, maxDate, minValue, maxValue } = timeseries;

  const thresholds = metric.categoryThresholds;
  const categories = metric.categorySet?.categories;
  assert(
    thresholds?.length && categories,
    `MetricLineThresholdChart can only be used with metrics that have thresholds and categories. ${metric} does not.`
  );

  const intervals = calculateChartIntervals(
    categories,
    thresholds,
    minValue,
    maxValue
  );

  const xScale = scaleUtc({
    domain: [minDate, maxDate],
    range: [0, chartWidth],
  });

  // If available, use minValue from the metric definition.
  // Otherwise, use the lower bound of the lowest threshold.
  const minValueMetric = metric.minValue;
  const minValueIntervals = min(intervals.map(({ lower }) => lower));
  const minChartValue = minValueMetric ?? minValueIntervals;

  // If available, use maxValue from the metric definition.
  // Otherwise, use the higher bound of the highest threshold.
  const maxValueMetric = metric.maxValue;
  const maxValueIntervals = max(intervals.map(({ upper }) => upper));
  const maxChartValue = maxValueMetric ?? maxValueIntervals;

  const yScale = scaleLinear({
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    domain: [minChartValue!, maxChartValue!],
    range: [chartHeight, 0],
  });

  return (
    <svg width={width} height={height} style={{ display: "block" }}>
      <Group left={marginLeft} top={marginTop}>
        <AxesTimeseries
          height={chartHeight}
          xScale={xScale}
          yScale={yScale}
          axisLeftProps={{
            tickFormat: (value) => metric.formatValue(value),
            tickValues: thresholds,
          }}
        />
        <GridRows scale={yScale} width={chartWidth} tickValues={thresholds} />
        <LineIntervalChart
          timeseries={timeseries}
          xScale={xScale}
          yScale={yScale}
          intervals={intervals}
          topIntervalOffset={5}
        />
        {hoveredPoint && (
          <MetricTooltip
            metric={metric}
            region={region}
            point={hoveredPoint}
            open
          >
            <PointMarker
              x={xScale(hoveredPoint.date)}
              y={yScale(hoveredPoint.value)}
              fill={metric.getColor(hoveredPoint.value)}
            />
          </MetricTooltip>
        )}
        <ChartOverlayX
          width={chartWidth}
          height={chartHeight}
          xScale={xScale}
          offset={marginLeft}
          onMouseMove={onMouseMove}
          onMouseLeave={onMouseLeave}
        />
      </Group>
    </svg>
  );
};
