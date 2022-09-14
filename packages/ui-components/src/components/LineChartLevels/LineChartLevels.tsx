import React, { Fragment } from "react";
import { MetricLevel } from "@actnowcoalition/metrics";
import { assert } from "@actnowcoalition/assert";
import { LineChart, LineChartProps } from "../LineChart";
import { RectClipGroup } from "../RectClipGroup";

/**
 *
 */
export interface ChartInterval {
  /** */
  lowerBound: number;
  /** */
  upperBound: number;
  /**  */
  level: MetricLevel;
}

export interface LineChartLevelsProps extends LineChartProps {
  intervals: ChartInterval[];
}

/**
 * Renders a line chart colored according to the y v
 * in the `intervals` parameter.
 *
 * @example
 * ```tsx
 * const intervals = [
 *   { from: 0, to: 100, level: { color: 'green', id: 'low' } },
 *   { from: 100, to: 200, level: { color: 'red', id: 'high' }}
 * ];
 *
 * <svg width={width} height={height}>
 *   <LineChartLevels
 *     timeseries={timeseries}
 *     xScale={xScale}
 *     yScale={yScale}
 *     intervals={intervals}
 * </svg>
 * ```
 *
 *
 * @param param0
 * @returns
 */
export const LineChartLevels: React.FC<LineChartLevelsProps> = ({
  xScale,
  yScale,
  intervals,
  ...otherLineChartProps
}) => {
  const [xMin, xMax] = extent(xScale.range());
  const width = Math.abs(xMax - xMin);

  return (
    <Fragment>
      {intervals.map((interval) => {
        const yFrom = yScale(interval.lowerBound);
        const yTo = yScale(interval.upperBound);
        const [yMin, yMax] = extent([yFrom, yTo]);
        const height = Math.abs(yMax - yMin);

        return (
          <RectClipGroup
            key={`chart-level-${interval.level.id}`}
            x={xMin}
            y={yMin}
            width={width}
            height={height}
          >
            <LineChart
              {...otherLineChartProps}
              xScale={xScale}
              yScale={yScale}
              stroke={interval.level.color}
            />
          </RectClipGroup>
        );
      })}
    </Fragment>
  );
};

// Returns the [min, max] of the array of values. The input array cannot be
// empty.
function extent(items: number[]): [number, number] {
  assert(items.length > 0, `The input array can't be empty`);
  const minValue = items.reduce((acc, item) => Math.min(acc, item), items[0]);
  const maxValue = items.reduce((acc, item) => Math.max(acc, item), items[0]);
  return [minValue, maxValue];
}
