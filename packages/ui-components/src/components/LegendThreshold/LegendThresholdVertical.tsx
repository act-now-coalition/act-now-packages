import React from "react";
import { Group } from "@visx/group";
import { scaleBand } from "@visx/scale";
import uniqueId from "lodash/uniqueId";
import { CommonLegendThresholdProps } from "./interfaces";
import palette from "../../styles/theme/palette";
import { typographyConstants } from "../../styles/theme/typography";

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
  showLabels,
  getItemColor,
  getItemLabel,
  getItemSublabel,
  ...otherSvgProps
}: LegendThresholdVerticalProps<T>) => {
  const indexList = items.map((item, itemIndex) => itemIndex);
  const scaleRect = scaleBand({ domain: indexList, range: [0, height] });
  const barHeight = scaleRect.bandwidth();
  const labelWidth = 160 - (width + 16);

  const clipPathId = uniqueId(`bars-clip-path-`);

  return (
    <svg width={160} height={280} {...otherSvgProps}>
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
          <rect x={width} y={0} width={labelWidth} height={height} />
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
      <Group>
        {showLabels &&
          items.map((item, itemIndex) => {
            const y = scaleRect(itemIndex) ?? 0;
            return (
              <Group key={`item-${itemIndex}`}>
                {getItemLabel && (
                  <text
                    x={width + 16}
                    y={y + 22}
                    fontWeight={typographyConstants.fontWeightBold}
                  >
                    {getItemLabel(item, itemIndex)}
                  </text>
                )}
                {getItemSublabel && (
                  <text
                    x={width + 16}
                    y={y + 42}
                    color={palette.text.secondary}
                  >
                    {getItemSublabel(item, itemIndex)}
                  </text>
                )}
              </Group>
            );
          })}
      </Group>
    </svg>
  );
};

export default LegendThresholdVertical;
