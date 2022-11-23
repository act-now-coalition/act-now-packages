import { ChartOverlayX, useHoveredDate } from "../ChartOverlayX";
import { scaleLinear, scaleUtc } from "@visx/scale";

import { AxesTimeseries } from "../AxesTimeseries";
import { BaseChartProps } from "../../common/utils/charts";
import { GridRows } from "../Grid";
import { Group } from "@visx/group";
import { LineIntervalChart } from "../LineIntervalChart";
import { Metric } from "@actnowcoalition/metrics";
import { MetricTooltip } from "../MetricTooltip";
import { PointMarker } from "../PointMarker";
import React from "react";
import { Region } from "@actnowcoalition/regions";
import { assert } from "@actnowcoalition/assert";
import { calculateChartIntervals } from "./utils";
import max from "lodash/max";
import min from "lodash/min";
import { useData } from "../../common/hooks";
import { useMetricCatalog } from "../MetricCatalogContext";

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

  const { data } = useData(region, metric, /*includeTimeseries=*/ true);
  const timeseries = data && data.timeseries.assertFiniteNumbers();

  const { hoveredPoint, onMouseMove, onMouseLeave } =
    useHoveredDate(timeseries);

  if (!timeseries?.hasData?.()) {
    return null;
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

  const minChartValue = min(intervals.map(({ lower }) => lower)) ?? minValue;
  const maxChartValue = max(intervals.map(({ upper }) => upper)) ?? maxValue;

  const yScale = scaleLinear({
    domain: [minChartValue, maxChartValue],
    range: [chartHeight, 0],
  });

  return (
    <svg width={width} height={height}>
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
