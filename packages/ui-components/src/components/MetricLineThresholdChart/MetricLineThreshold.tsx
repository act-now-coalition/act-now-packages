import React from "react";
import { ScaleTime, ScaleLinear } from "d3-scale";
import { Group } from "@visx/group";
import { assert } from "@actnowcoalition/assert";
import { Metric, Timeseries } from "@actnowcoalition/metrics";

import { LineChart } from "../LineChart";
import { RectClipGroup } from "../RectClipGroup";
import { calculateChartIntervals } from "./utils";

export interface MetricLineThreshold {
  metric: Metric;
  timeseries: Timeseries<number>;
  dateScale: ScaleTime<number, number>;
  yScale: ScaleLinear<number, number>;
}

/**
 * Renders a line representing the given timeseries, coloring segments of the
 * line according to the thresholds and categories of the metric.
 *
 * @returns An SVG Group element containing the line.
 */
export const MetricLineThreshold = ({
  metric,
  timeseries,
  yScale,
  dateScale,
}: MetricLineThreshold) => {
  if (!timeseries?.hasData?.()) {
    return null;
  }

  const { minValue, maxValue } = timeseries;
  const thresholds = metric.categoryThresholds;
  const categories = metric.categorySet?.categories;
  assert(
    thresholds?.length && categories,
    `MetricLineThresholdChart can only be used with metrics that have thresholds and categories. ${metric} does not.`
  );

  const [minX, maxX] = dateScale.range();
  const width = Math.abs(maxX - minX);

  const intervals = calculateChartIntervals(
    categories,
    thresholds,
    minValue,
    maxValue
  );

  return (
    <Group>
      {intervals.map((interval) => {
        const yFrom = yScale(interval.lower);
        const yTo = yScale(interval.upper);
        const clipHeight = Math.abs(yFrom - yTo);
        return (
          <RectClipGroup
            key={`rect-clip-${interval.category.id}`}
            y={Math.min(yFrom, yTo)}
            width={width}
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
    </Group>
  );
};
