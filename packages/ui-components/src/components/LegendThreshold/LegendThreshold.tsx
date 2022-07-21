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
  getItemValue: (item: T, itemIndex: number) => number;
  getItemColor: (item: T, itemIndex: number) => string;
  getItemLabel: (item: T, itemIndex: number) => string;
  showLabels?: boolean;
}

/**
 * `LegendThreshold` represents a scale with specific cut values that separate
 * a set of levels. This component shows the labels between each level by
 * default. This component return a SVG group, so it won't render by itself,
 * it must be wrapped in a SVG element.
 */
// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-constraint
const LegendThreshold = <T extends unknown>({
  height = 40,
  barHeight = 30,
  width = 80,
  borderRadius = 4,
  items,
  getItemValue,
  getItemColor,
  getItemLabel,
  showLabels = true,
}: LegendThresholdProps<T>) => {
  const values = items.map(getItemValue);
  const scaleRect = scaleBand({ domain: values, range: [0, width] });
  const rectWidth = scaleRect.bandwidth();

  const clipPathId = uniqueId(`rounded-borders-`);

  // Labels
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
          const x = scaleRect(getItemValue(item, itemIndex)) ?? 0;
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
                    {getItemLabel(item, itemIndex)}
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
