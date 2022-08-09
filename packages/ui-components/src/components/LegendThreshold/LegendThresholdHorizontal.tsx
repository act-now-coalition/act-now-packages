import React from "react";
import { Group } from "@visx/group";
import { scaleBand } from "@visx/scale";
import uniqueId from "lodash/uniqueId";
import { TickLabel, TickMark } from "./LegendThreshold.style";
import { LegendThresholdProps } from ".";

/**
 * `LegendThreshold` represents a scale with thresholds that separate
 * a set of levels. By default, the labels between each level are shown.
 */
const LegendThresholdHorizontal = <T,>({
  height = 40,
  barHeight = 30,
  width = 80,
  borderRadius,
  items,
  getItemColor,
  getItemEndLabel,
  showLabels,
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

export default LegendThresholdHorizontal;
