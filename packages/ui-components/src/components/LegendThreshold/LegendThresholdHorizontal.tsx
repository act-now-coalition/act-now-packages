import React from "react";
import { Group } from "@visx/group";
import { scaleBand } from "@visx/scale";
import { TickLabel, TickMark } from "./LegendThreshold.style";
import { CommonLegendThresholdProps } from "./interfaces";
import { RectClipGroup } from "../RectClipGroup";

export interface LegendThresholdHorizontalProps<T>
  extends CommonLegendThresholdProps<T> {
  /** Orientation of the bars */
  orientation: "horizontal";
  /** Width of the component */
  width?: number;
  /**
   * Height of the colored bars. When not adding the bars, make sure that
   * `barHeight` is set to the same value as `height`.
   */
  barHeight?: number;
}

/**
 * `LegendThresholdHorizontal` represents a scale with thresholds that separate
 * a set of levels. By default, the labels between each level are shown.
 */
export const LegendThresholdHorizontal = <T,>({
  height = 40,
  barHeight = 20,
  width = 300,
  borderRadius = 10,
  items,
  getItemColor,
  getItemLabel,
  showLabels = true,
  ...otherSvgProps
}: LegendThresholdHorizontalProps<T> &
  Omit<
    React.SVGProps<SVGSVGElement>,
    keyof LegendThresholdHorizontalProps<T>
  >) => {
  const indexList = items.map((item, itemIndex) => itemIndex);
  const scaleRect = scaleBand({ domain: indexList, range: [0, width] });
  const rectWidth = scaleRect.bandwidth();

  const labelTickHeight = 4;
  const tickLabelPadding = 2;

  return (
    <svg width={width} height={height} {...otherSvgProps}>
      <RectClipGroup
        width={width}
        height={showLabels ? barHeight : height}
        rx={borderRadius}
        ry={borderRadius}
      >
        {items.map((item, itemIndex) => (
          <rect
            key={`item-${itemIndex}`}
            x={scaleRect(itemIndex) ?? 0}
            height={barHeight}
            width={rectWidth}
            fill={getItemColor(item, itemIndex)}
          />
        ))}
      </RectClipGroup>
      {items.map(
        (item, itemIndex) =>
          showLabels &&
          itemIndex !== items.length - 1 && (
            <Group
              key={`item-${itemIndex}`}
              top={barHeight}
              left={(scaleRect(itemIndex) ?? 0) + rectWidth}
            >
              <TickMark y1={0} y2={labelTickHeight} />
              <TickLabel y={labelTickHeight + tickLabelPadding}>
                {getItemLabel && getItemLabel(item, itemIndex)}
              </TickLabel>
            </Group>
          )
      )}
    </svg>
  );
};
