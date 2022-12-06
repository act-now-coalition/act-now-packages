import React from "react";

import { Group } from "@visx/group";
import { scaleBand } from "@visx/scale";
import find from "lodash/find";

import { AutoWidth } from "../AutoWidth";
import { RectClipGroup } from "../RectClipGroup";
import { LegendThresholdProps } from "./LegendThreshold";
import { IndicatorPolygon, TickLabel, TickMark } from "./LegendThreshold.style";

/**
 * `LegendThresholdHorizontal` represents a scale with thresholds that separate
 * a set of categories. By default, the labels between each category are shown.
 */

export const LegendThresholdHorizontalInner = <T,>({
  height = 20,
  width = 300,
  borderRadius = 10,
  items,
  getItemColor,
  getItemLabel,
  getItemShowIndicator,
  showLabels = true,
}: LegendThresholdProps<T>) => {
  const indexList = items.map((item, itemIndex) => itemIndex);
  const scaleRect = scaleBand({ domain: indexList, range: [0, width] });
  const rectWidth = scaleRect.bandwidth();

  const labelTickHeight = 4;
  const tickLabelPadding = 2;

  const showIndicator =
    getItemShowIndicator &&
    find(items, (item, index) => getItemShowIndicator(item, index));

  const heightForIndicator = showIndicator
    ? 10 /* Additional 10px accounts for height of indicator */
    : 0;
  const heightForLabels = showLabels
    ? 20 /* Additional 20px accounts for height of labels */
    : 0;
  const totalHeight = height + heightForLabels + heightForIndicator;

  return (
    <svg width={width} height={totalHeight}>
      {/* Indicator */}
      {getItemShowIndicator &&
        items.map((item: T, itemIndex) => {
          return (
            getItemShowIndicator(item, itemIndex) && (
              <Group
                key={`indicator-item-${itemIndex}`}
                top={0}
                left={(scaleRect(itemIndex) || 0) + rectWidth / 2 - 5}
              >
                <IndicatorPolygon points="0 0, 10 0, 5 7.5" />
              </Group>
            )
          );
        })}

      {/* Rectangles */}
      <Group top={heightForIndicator}>
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

        {/* Labels */}
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
      </Group>
    </svg>
  );
};

export const LegendThresholdHorizontal = <T,>({
  ...props
}: LegendThresholdProps<T>) => {
  return (
    <AutoWidth>
      <LegendThresholdHorizontalInner {...props} />
    </AutoWidth>
  );
};
