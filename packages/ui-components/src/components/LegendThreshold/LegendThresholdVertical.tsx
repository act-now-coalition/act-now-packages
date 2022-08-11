import React from "react";
import { Group } from "@visx/group";
import { scaleBand } from "@visx/scale";
import uniqueId from "lodash/uniqueId";
import { CommonLegendThresholdProps } from "./interfaces";

export interface LegendThresholdVerticalProps<T>
  extends CommonLegendThresholdProps<T> {
  /**
   * Note that only the labels between two levels are rendered. The last
   * end label won't be shown.
   */
  getItemEndLabel?: (item: T, itemIndex: number) => string;
}

/**
 * `LegendThresholdVertical` represents a scale with thresholds that separate
 * a set of levels. By default, the labels between each level are shown.
 */
const LegendThresholdVertical = <T,>({
  height = 300,
  width = 20,
  borderRadius,
  items,
  getItemColor,
  ...otherSvgProps
}: LegendThresholdVerticalProps<T> &
  Omit<
    React.SVGProps<SVGSVGElement>,
    keyof LegendThresholdVerticalProps<T>
  >) => {
  const indexList = items.map((item, itemIndex) => itemIndex);
  const scaleRect = scaleBand({ domain: indexList, range: [0, height] });
  const barHeight = scaleRect.bandwidth();

  const clipPathId = uniqueId(`bars-clip-path-`);

  return (
    <svg width={width} height={height} {...otherSvgProps}>
      <defs>
        <clipPath id={clipPathId}>
          <rect
            x={0}
            y={0}
            width={width}
            height={height}
            rx={borderRadius}
            ry={borderRadius}
          />
        </clipPath>
      </defs>
      <Group>
        {items.map((item, itemIndex) => {
          const y = scaleRect(itemIndex) ?? 0;
          return (
            <Group key={`item-${itemIndex}`}>
              <rect
                x={0}
                y={y}
                height={barHeight}
                width={width}
                fill={getItemColor(item, itemIndex)}
                clipPath={`url(#${clipPathId})`}
              />
            </Group>
          );
        })}
      </Group>
    </svg>
  );
};

export default LegendThresholdVertical;
