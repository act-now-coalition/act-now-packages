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
                />
                {showLabels && itemIndex !== items.length - 1 && (
                  <Group top={barHeight} left={x + rectWidth}>
                    <TickMark y1={0} y2={labelTickHeight} />
                    <TickLabel y={labelTickHeight + tickLabelPadding}>
                      {getItemLabel && getItemLabel(item, itemIndex)}
                    </TickLabel>
                  </Group>
                )}
              </Group>
            );
          })}
        </Group>
      </RectClipGroup>
    </svg>
  );
};
