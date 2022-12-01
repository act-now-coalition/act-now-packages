import React, { useState } from "react";

import { ComponentMeta } from "@storybook/react";
import { Group } from "@visx/group";
import { scaleUtc } from "@visx/scale";

import { DateFormat, formatUTCDateTime } from "@actnowcoalition/time-utils";

import { ChartOverlayX } from ".";
import { AxisBottom } from "../Axis";

export default {
  title: "Components/ChartOverlayX",
  component: ChartOverlayX,
} as ComponentMeta<typeof ChartOverlayX>;

const width = 600;
const height = 400;
const padding = 40;
const innerWidth = width - 2 * padding;
const innerHeight = height - 2 * padding;

const xScale = scaleUtc({
  domain: [new Date("2022-01-01"), new Date("2022-06-30")],
  range: [0, innerWidth],
});

export const Example = () => {
  const [date, setDate] = useState<Date | null>(null);

  const onMouseLeave = () => setDate(null);
  const onMouseMove = ({ date }: { date: Date }) => setDate(date);

  return (
    <svg width={width} height={height} style={{ border: "solid 1px #ddd" }}>
      <Group left={padding} top={padding}>
        <AxisBottom top={innerHeight} scale={xScale} />
        <rect width={innerWidth} height={innerHeight} fill="#e3f2fd" />
        {date && (
          <Group left={xScale(date)}>
            <line
              y1={0}
              y2={innerHeight}
              stroke="#ccc"
              strokeWidth="1"
              pointerEvents="none"
            />
            <text y={height / 2} textAnchor="middle">
              {formatUTCDateTime(date, DateFormat.YYYY_MM_DD)}
            </text>
          </Group>
        )}
        <ChartOverlayX
          xScale={xScale}
          width={innerWidth}
          height={innerHeight}
          onMouseMove={onMouseMove}
          onMouseLeave={onMouseLeave}
          offset={padding}
        />
      </Group>
    </svg>
  );
};
