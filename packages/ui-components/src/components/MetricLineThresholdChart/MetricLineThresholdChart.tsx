import React from "react";
import { scaleLinear, scaleTime } from "@visx/scale";
import { Group } from "@visx/group";

import { assert } from "@actnowcoalition/assert";
import { Region } from "@actnowcoalition/regions";
import { Metric, Timeseries } from "@actnowcoalition/metrics";

import { useData } from "../../common/hooks";
import { AxesTimeseries } from "../Axes";
import { GridRows } from "../Grid";
import { ChartOverlayX, useHoveredDate } from "../ChartOverlayX";
import { LineChart } from "../LineChart";
import { useMetricCatalog } from "../MetricCatalogContext";
import { MetricTooltip } from "../MetricTooltip";
import { BaseChartProps, CircleMarker } from "../MetricLineChart";
import { RectClipGroup } from "../RectClipGroup";
import { calculateChartIntervals } from "./utils";

export interface MetricLineThresholdChartProps extends BaseChartProps {
  metric: Metric | string;
  region: Region;
}

/**
 * MetricLineThresholdChart renders a line chart where line segments are
 * colored according to the metric level and threshold.
 *
 * For example, if we have a metric with levels two levels: High (red) and
 * Low (green) separated by a threshold at the value 10, the line will
 * be red above when above 10 and green below it.
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

  const { data } = useData(region, metric, true);

  const { hoveredPoint, onMouseMove, onMouseLeave } = useHoveredDate<number>(
    data?.timeseries as Timeseries<number>
  );

  if (!data) {
    return null;
  }

  const timeseries = data.timeseries.assertFiniteNumbers();

  if (!timeseries.hasData()) {
    return null;
  }

  const chartHeight = height - marginTop - marginBottom;
  const chartWidth = width - marginLeft - marginRight;

  const { minDate, maxDate, maxValue } = timeseries;

  const dateScale = scaleTime({
    domain: [minDate, maxDate],
    range: [0, chartWidth],
  });

  const yScale = scaleLinear({
    domain: [0, maxValue],
    range: [chartHeight, 0],
  });

  assert(
    metric.thresholds?.length && metric.levelSet?.levels,
    `MetricLineThresholdChart can only be used with metrics that have thresholds and levels ${metric}`
  );

  const intervals = calculateChartIntervals(
    metric.levelSet.levels,
    metric.thresholds,
    0,
    maxValue
  );

  return (
    <svg width={width} height={height}>
      <Group left={marginLeft} top={marginTop}>
        <AxesTimeseries
          height={chartHeight}
          dateScale={dateScale}
          yScale={yScale}
          axisLeftProps={{ tickFormat: (value) => metric.formatValue(value) }}
        />
        <GridRows
          scale={yScale}
          width={chartWidth}
          tickValues={metric.thresholds}
        />
        {intervals.map((interval) => {
          const yFrom = yScale(interval.lowerBound);
          const yTo = yScale(interval.upperBound);
          const clipHeight = Math.abs(yFrom - yTo);
          return (
            <RectClipGroup
              key={`rect-clip-${interval.level.id}`}
              y={Math.min(yFrom, yTo)}
              width={chartWidth}
              height={clipHeight}
            >
              <LineChart
                timeseries={data.timeseries as Timeseries<number>}
                xScale={dateScale}
                yScale={yScale}
                stroke={interval.level.color}
              />
            </RectClipGroup>
          );
        })}
        {hoveredPoint && (
          <MetricTooltip
            metric={metric}
            region={region}
            point={hoveredPoint}
            placement="top"
            disableInteractive
            open
          >
            <CircleMarker
              cx={dateScale(hoveredPoint.date)}
              cy={yScale(hoveredPoint.value)}
              r={6}
              fill={metric.getColor(hoveredPoint.value)}
            />
          </MetricTooltip>
        )}
        <ChartOverlayX
          width={chartWidth}
          height={chartHeight}
          xScale={dateScale}
          offset={marginLeft}
          onMouseMove={onMouseMove}
          onMouseLeave={onMouseLeave}
        />
      </Group>
    </svg>
  );
};
