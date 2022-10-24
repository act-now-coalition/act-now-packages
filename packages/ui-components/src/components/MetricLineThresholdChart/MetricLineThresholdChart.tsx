import React from "react";
import { scaleLinear, scaleTime } from "@visx/scale";
import { Group } from "@visx/group";

import { assert } from "@actnowcoalition/assert";
import { Region } from "@actnowcoalition/regions";
import { Metric } from "@actnowcoalition/metrics";

import { useData } from "../../common/hooks";
import { AxesTimeseries } from "../AxesTimeseries";
import { GridRows } from "../Grid";
import { ChartOverlayX, useHoveredDate } from "../ChartOverlayX";
import { LineChart } from "../LineChart";
import { useMetricCatalog } from "../MetricCatalogContext";
import { MetricTooltip } from "../MetricTooltip";
import { BaseChartProps } from "../MetricLineChart";
import { RectClipGroup } from "../RectClipGroup";
import { calculateChartIntervals } from "./utils";
import { PointMarker } from "../PointMarker";

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

  const { minDate, maxDate, maxValue } = timeseries;

  const dateScale = scaleTime({
    domain: [minDate, maxDate],
    range: [0, chartWidth],
  });

  const yScale = scaleLinear({
    domain: [0, maxValue],
    range: [chartHeight, 0],
  });

  const thresholds = metric.categoryThresholds;
  const categories = metric.categorySet?.categories;
  assert(
    thresholds?.length && categories,
    `MetricLineThresholdChart can only be used with metrics that have thresholds and categories. ${metric} does not.`
  );

  const intervals = calculateChartIntervals(
    categories,
    thresholds,
    /*minValue=*/ 0,
    maxValue
  );

  return (
    <svg width={width} height={height}>
      <Group left={marginLeft} top={marginTop}>
        <AxesTimeseries
          height={chartHeight}
          dateScale={dateScale}
          yScale={yScale}
          axisLeftProps={{
            tickFormat: (value) => metric.formatValue(value),
            tickValues: thresholds,
          }}
        />

        <GridRows scale={yScale} width={chartWidth} tickValues={thresholds} />
        {intervals.map((interval) => {
          const yFrom = yScale(interval.lower);
          const yTo = yScale(interval.upper);
          const clipHeight = Math.abs(yFrom - yTo);
          return (
            <RectClipGroup
              key={`rect-clip-${interval.category.id}`}
              y={Math.min(yFrom, yTo)}
              width={chartWidth}
              height={clipHeight}
            >
              <LineChart
                timeseries={timeseries}
                xScale={dateScale}
                yScale={yScale}
                stroke={interval.category.color}
              />
            </RectClipGroup>
          );
        })}
        {hoveredPoint && (
          <MetricTooltip
            metric={metric}
            region={region}
            point={hoveredPoint}
            open
          >
            <PointMarker
              x={dateScale(hoveredPoint.date)}
              y={yScale(hoveredPoint.value)}
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
