import React from "react";

import { Group } from "@visx/group";
import { scaleBand, scaleLinear } from "@visx/scale";

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
  showLabels = true,
  currentValue,
}: LegendThresholdProps<T>) => {
  const indexList = items.map((item, itemIndex) => itemIndex);
  const scaleRect = scaleBand({ domain: indexList, range: [0, width] });
  const rectWidth = scaleRect.bandwidth();
  console.log("indexList", indexList);
  console.log("items", items);

  const scaleForCurrentValue = scaleLinear({
    domain: [0, 140],
    range: [0, width],
  });
  const currentValueLocation =
    currentValue && scaleForCurrentValue(currentValue);

  console.log("currentValue:", currentValue);
  console.log("currentValueLocation:", currentValueLocation);

  const labelTickHeight = 4;
  const tickLabelPadding = 2;

  const heightWithLabels =
    height + 20; /* An additional 20px accounts for the height of labels */
  const totalHeight = showLabels ? heightWithLabels : height;

  return (
    <svg width={width} height={totalHeight}>
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
      {/* <g style={{border: '1px solid red'}}> */}
      {currentValueLocation && (
        <Group
          key={`item-${currentValue}`}
          top={5}
          left={currentValueLocation}
          //   (scaleRect(getItemValue(item, index)) || 0) + bandWidth / 2 - 5
          // }
        >
          <IndicatorPolygon points="0 0, 10 0, 5 7.5" />
        </Group>
      )}
      {/* </g> */}
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
