import React, { Fragment } from "react";
import min from "lodash/min";
import max from "lodash/max";
import isNumber from "lodash/isNumber";
import { MetricLevel } from "@actnowcoalition/metrics";
import { assert } from "@actnowcoalition/assert";
import { LineChart, LineChartProps } from "../LineChart";
import { RectClipGroup } from "../RectClipGroup";

export interface LineChartLevelsProps extends LineChartProps {
  /** */
  thresholds: number[];
  /** */
  levels: MetricLevel[];
}

export const LineChartLevels: React.FC<LineChartLevelsProps> = ({
  thresholds,
  levels,
  yScale,
  xScale,
  ...otherLineChartProps
}) => {
  assert(thresholds.length === levels.length - 1, ``);

  // construct rectangles
  // assume scale, thresholds and levels are in order
  // [minY, ...thresholds, maxY]
  const yRange = yScale.range();
  const yMin = min(yRange);
  const yMax = max(yRange);

  assert(isNumber(yMin), ``);
  assert(isNumber(yMax), ``);

  const edges = [yMin, ...thresholds.map(yScale).reverse(), yMax];

  const items = levels.map((level, levelIndex) => {
    return {
      level,
      from: edges[levelIndex],
      to: edges[levelIndex + 1],
    };
  });

  const [xMin, xMax] = xScale.range();
  const width = xMax - xMin;

  console.log({ items, a: yScale.domain() });

  return (
    <>
      {items.map((item) => (
        <Fragment key={item.level.id}>
          <RectClipGroup
            width={width}
            x={xMin}
            y={item.from}
            height={item.to - item.from}
            fill={item.level.color}
            fillOpacity={0.3}
          >
            <rect
              width={width}
              x={xMin}
              y={item.from}
              height={item.to - item.from}
              fill={item.level.color}
              fillOpacity={0.2}
            />
            <LineChart
              {...otherLineChartProps}
              xScale={xScale}
              yScale={yScale}
              stroke={item.level.color}
            />
          </RectClipGroup>
        </Fragment>
      ))}
    </>
  );
};
