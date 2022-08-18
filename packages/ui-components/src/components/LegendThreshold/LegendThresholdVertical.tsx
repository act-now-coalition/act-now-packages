import React from "react";
import { Group } from "@visx/group";
import { scaleBand } from "@visx/scale";
import uniqueId from "lodash/uniqueId";
import { CommonLegendThresholdProps } from "./interfaces";
import Typography from "@mui/material/Typography";

export interface LegendThresholdVerticalProps<T>
  extends CommonLegendThresholdProps<T> {
  /** Orientation of the bars */
  orientation: "vertical";
  getItemLabel?: (item: T, itemIndex: number) => string;
  getItemSublabel?: (item: T, itemIndex: number) => string | undefined;
}

/**
 * `LegendThresholdVertical` represents a scale with thresholds that separate
 * a set of levels. By default, the labels between each level are shown.
 */
const LegendThresholdVertical = <T,>({
  height = 280,
  width = 20,
  borderRadius,
  items,
  showLabels = false,
  getItemColor,
  getItemLabel,
  getItemSublabel,
  ...otherSvgProps
}: LegendThresholdVerticalProps<T>) => {
  const indexList = items.map((item, itemIndex) => itemIndex);
  const scaleRect = scaleBand({ domain: indexList, range: [0, height] });
  const barHeight = scaleRect.bandwidth();
  const barWidth = width;
  const viewportWidth = showLabels ? 160 : width;
  /**
   * The label group should fill up the rest of the view port,
   * accommodating the bar width and the 16px spacing between the bar and label group.
   */
  const labelWidth = viewportWidth - (barWidth + 16);
  const clipPathId = uniqueId(`bars-clip-path-`);
  return (
    <svg width={viewportWidth} height={height} {...otherSvgProps}>
      <defs>
        <clipPath id={clipPathId}>
          {/* View port for the bar */}
          <rect
            x={0}
            y={0}
            width={barWidth}
            height={height}
            rx={borderRadius}
            ry={borderRadius}
          />
          {/* View port for the label group */}
          {showLabels && (
            <rect x={barWidth} y={0} width={labelWidth} height={height} />
          )}
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
                width={barWidth}
                fill={getItemColor(item, itemIndex)}
                clipPath={`url(#${clipPathId})`}
              />
            </Group>
          );
        })}
      </Group>
      {showLabels && (
        <Group>
          {items.map((item, itemIndex) => {
            const y = scaleRect(itemIndex) ?? 0;
            return (
              <Group key={`item-${itemIndex}`}>
                {getItemLabel && (
                  <foreignObject
                    x={barWidth + 16}
                    y={y + 4}
                    width={labelWidth}
                    height={24}
                  >
                    <Typography
                      variant="paragraphSmall"
                      fontWeight={700}
                      color="black"
                    >
                      {getItemLabel(item, itemIndex)}
                    </Typography>
                  </foreignObject>
                )}
                {getItemSublabel && (
                  <foreignObject
                    x={barWidth + 16}
                    y={y + 24}
                    width={labelWidth}
                    height={24}
                  >
                    <Typography variant="paragraphSmall">
                      {getItemSublabel(item, itemIndex)}
                    </Typography>
                  </foreignObject>
                )}
              </Group>
            );
          })}
        </Group>
      )}
    </svg>
  );
};

export default LegendThresholdVertical;
