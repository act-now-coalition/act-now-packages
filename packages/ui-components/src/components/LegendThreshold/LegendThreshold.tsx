import React from "react";
import { Group } from "@visx/group";
import { scaleBand } from "@visx/scale";
import uniqueId from "lodash/uniqueId";
import { TickLabel, TickMark } from "./LegendThreshold.style";

export interface LegendThresholdProps<T> {
  /** Height of the component, including the colored bars and labels. */
  height?: number;
  /**
   * Height of the colored bars. When not adding the bars, make sure that
   * `barHeight` is set to the same value as `height`.
   */
  barHeight?: number;
  /** Width of the component */
  width?: number;
  /** Border radius of the colored bars */
  borderRadius?: number;
  /** List of items representing the labels */
  items: T[];
  /** Function that returns the color of each level */
  getItemColor: (item: T, itemIndex: number) => string;
  /**
   * Note that only the labels between two levels are rendered. The last
   * end label won't be shown.
   */
  getItemEndLabel: (item: T, itemIndex: number) => string;
  /**
   * Whether to show the labels or not (true by default). Make sure to set
   * `barHeight` to `height` when not including the labels.
   */
  showLabels?: boolean;
}

/**
 * `LegendThreshold` represents a scale with thresholds that separate
 * a set of levels. By default, the labels between each level are shown.
 */
const LegendThreshold = <T,>({
  height = 40,
  barHeight = 30,
  width = 80,
  borderRadius = 4,
  items,
  getItemColor,
  getItemEndLabel,
  showLabels = true,
  ...otherSvgProps
}: LegendThresholdProps<T> &
  Omit<React.SVGProps<SVGSVGElement>, keyof LegendThresholdProps<T>>) => {
  const indexList = items.map((item, itemIndex) => itemIndex);
  const scaleRect = scaleBand({ domain: indexList, range: [0, width] });
  const rectWidth = scaleRect.bandwidth();

  const clipPathId = uniqueId(`bars-clip-path-`);

  const labelTickHeight = 4;
  const tickLabelPadding = 2;

  return (
    <svg width={width} height={height} {...otherSvgProps}>
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
    </svg>
  );
};

export default LegendThreshold;