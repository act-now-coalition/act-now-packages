import React from "react";
import { Group } from "@visx/group";
import { scaleBand } from "@visx/scale";
import uniqueId from "lodash/uniqueId";
import { TickLabel, TickMark } from "./LegendThreshold.style";

export interface LegendThresholdProps<T> {
  height?: number;
  barHeight?: number;
  width?: number;
  borderRadius?: number;
  items: T[];
  getItemColor: (item: T, itemIndex: number) => string;
  getItemEndLabel: (item: T, itemIndex: number) => string;
  showLabels?: boolean;
}

/**
 * `LegendThreshold` represents a scale with specific cut values that separate
 * a set of levels. By default, the component shows labels between each level.
 *
 * **Notes**
 *
 * - This component returns an SVG Group element to make it easier to integrate
 *   with other components inside an SVG element. Make sure to wrap it in an
 *   SVG element if using it as standalone component.
 * - The  `height` is the total height of the component (including labels),
 *   whereas `barHeight` is the height of the colored bars only. When not adding
 *   bars, make sure that `barHeight` is set to `height` (see Storybook for
 *   some examples).
 * - Only the labels between two levels are rendered. The last end label is
 *   not rendered.
 */
// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-constraint
const LegendThreshold = <T extends unknown>({
  height = 40,
  barHeight = 30,
  width = 80,
  borderRadius = 4,
  items,
  getItemColor,
  getItemEndLabel,
  showLabels = true,
}: LegendThresholdProps<T>) => {
  const indexList = items.map((item, itemIndex) => itemIndex);
  const scaleRect = scaleBand({ domain: indexList, range: [0, width] });
  const rectWidth = scaleRect.bandwidth();

  const clipPathId = uniqueId(`bars-clip-path-`);

  const labelTickHeight = 4;
  const tickLabelPadding = 2;

  return (
    <Group>
      <defs>
        <clipPath id={clipPathId}>
          <rect
            y={0}
            width={width}
            height={showLabels ? barHeight : height}
            rx={borderRadius}
            ry={borderRadius}
          />
        </clipPath>
      </defs>
      <Group>
        {items.map((item, itemIndex) => {
          const x = scaleRect(itemIndex) ?? 0;
          return (
            <Group key={`item-${itemIndex}`}>
              <rect
                x={x}
                height={barHeight}
                width={rectWidth}
                fill={getItemColor(item, itemIndex)}
                clipPath={`url(#${clipPathId})`}
              />
              {showLabels && itemIndex !== items.length - 1 && (
                <Group top={barHeight} left={x + rectWidth}>
                  <TickMark y1={0} y2={labelTickHeight} />
                  <TickLabel y={labelTickHeight + tickLabelPadding}>
                    {getItemEndLabel(item, itemIndex)}
                  </TickLabel>
                </Group>
              )}
            </Group>
          );
        })}
      </Group>
    </Group>
  );
};

export default LegendThreshold;
