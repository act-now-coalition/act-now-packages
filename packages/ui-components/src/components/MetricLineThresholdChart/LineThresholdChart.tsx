import React from "react";
import { ScaleTime, ScaleLinear } from "d3-scale";

import { assert } from "@actnowcoalition/assert";
import { Metric, Timeseries } from "@actnowcoalition/metrics";

import { LineChart } from "../LineChart";
import { RectClipGroup } from "../RectClipGroup";
import { calculateChartIntervals } from "./utils";

export interface LineThresholdChartProps {
  metric: Metric;
  timeseries: Timeseries<number>;
  dateScale: ScaleTime<number, number>;
  yScale: ScaleLinear<number, number>;
  width: number;
}

export const LineThresholdChart = ({
  metric,
  timeseries,
  yScale,
  dateScale,
  width,
}: LineThresholdChartProps) => {
  if (!timeseries?.hasData?.()) {
    return null;
  }

  const { maxValue } = timeseries;
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
    <>
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
    </>
  );
};
