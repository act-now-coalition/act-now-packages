import React, { Fragment } from "react";
import { MetricLevel } from "@actnowcoalition/metrics";
import { assert } from "@actnowcoalition/assert";
import { LineChart, LineChartProps } from "../LineChart";
import { RectClipGroup } from "../RectClipGroup";

export interface ChartLevel {
  /** Data units, starting point on the interval */
  from: number;
  /** Data units, ending point on the interval */
  to: number;
  /** Metric level */
  level: MetricLevel;
}

export interface LineChartLevelsProps extends LineChartProps {
  chartLevels: ChartLevel[];
}

export const LineChartLevels: React.FC<LineChartLevelsProps> = ({
  xScale,
  yScale,
  chartLevels,
  ...otherLineChartProps
}) => {
  const [xMin, xMax] = extent(xScale.range());
  const width = Math.abs(xMax - xMin);

  return (
    <Fragment>
      {chartLevels.map(({ from, to, level }) => {
        const yFrom = yScale(from);
        const yTo = yScale(to);
        const [yMin, yMax] = extent([yFrom, yTo]);
        const height = Math.abs(yMax - yMin);

        return (
          <RectClipGroup
            key={`chart-level-${level.id}`}
            x={xMin}
            y={yMin}
            width={width}
            height={height}
          >
            <LineChart
              {...otherLineChartProps}
              xScale={xScale}
              yScale={yScale}
              stroke={level.color}
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
