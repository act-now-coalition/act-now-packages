import React from "react";
import { Group } from "@visx/group";
import { scaleBand } from "@visx/scale";
import { TickLabel, TickMark } from "./LegendThreshold.style";
import { LegendThresholdProps } from "./interfaces";
import { RectClipGroup } from "../RectClipGroup";

/**
 * `LegendThresholdHorizontal` represents a scale with thresholds that separate
 * a set of levels. By default, the labels between each level are shown.
 */

export const LegendThresholdHorizontal = <T,>({
  height = 20,
  width = 300,
  borderRadius = 10,
  items,
  getItemColor,
  getItemLabel,
  showLabels = true,
  ...otherSvgProps
}: LegendThresholdProps<T> &
  Omit<React.SVGProps<SVGSVGElement>, keyof LegendThresholdProps<T>>) => {
  const indexList = items.map((item, itemIndex) => itemIndex);
  const scaleRect = scaleBand({ domain: indexList, range: [0, width] });
  const rectWidth = scaleRect.bandwidth();

  const labelTickHeight = 4;
  const tickLabelPadding = 2;

  const heightWithLabels =
    height + 20; /* An additional 20px accounts for the height of labels */
  const totalHeight = showLabels ? heightWithLabels : height;

  return (
    <svg width={width} height={totalHeight} {...otherSvgProps}>
      <RectClipGroup
        width={width}
        height={height}
        rx={borderRadius}
        ry={borderRadius}
      >
        {items.map((item, itemIndex) => (
          <rect
            key={`item-${itemIndex}`}
            x={scaleRect(itemIndex) ?? 0}
            height={height}
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
              top={height}
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
