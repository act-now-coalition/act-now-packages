import React from "react";

import { Box } from "@mui/material";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { scaleLinear, scaleUtc } from "@visx/scale";

import { AxisBottom, AxisBottomProps } from ".";
import { AutoWidth } from "../AutoWidth";
import { formatDateTick, getNumTicks, isOverTwoMonths } from "./utils";

export default {
  title: "Components/AxisBottom",
} as ComponentMeta<typeof AxisBottom>;

const height = 400;
const padding = 60;

const ChartBottomAxis = ({ ...args }: AxisBottomProps) => {
  const [start, end] = args.scale.domain();
  const isTimeSeries = start instanceof Date;
  return (
    <>
      {args.width && (
        <svg width={args.width} height={height}>
          <AxisBottom
            {...args}
            left={padding}
            top={padding}
            scale={
              isTimeSeries
                ? scaleUtc({
                    domain: [start, end],
                    range: [0, args.width - 2 * padding],
                  })
                : scaleLinear({
                    domain: [start, end],
                    range: [0, args.width - 2 * padding],
                  })
            }
            tickFormat={
              isTimeSeries
                ? (date: Date) =>
                    formatDateTick(date, isOverTwoMonths(start, end))
                : undefined
            }
            numTicks={getNumTicks(args.width)}
          />
        </svg>
      )}
    </>
  );
};

/* A responsive template, in order to test responsiveness of numTicks and tickFormat */
const Template: ComponentStory<typeof AxisBottom> = (args) => (
  <Box>
    <AutoWidth>
      <ChartBottomAxis {...args} />
    </AutoWidth>
  </Box>
);

export const Numbers = Template.bind({});
Numbers.args = {
  scale: scaleLinear({ domain: [0, 10] }),
};

export const Time2Years = Template.bind({});
Time2Years.args = {
  scale: scaleUtc({
    domain: [new Date("2021-01-01"), new Date("2022-12-31")],
  }),
};

export const Time1Year = Template.bind({});
Time1Year.args = {
  scale: scaleUtc({
    domain: [new Date("2021-01-01"), new Date("2021-12-31")],
  }),
};

export const Time6Months = Template.bind({});
Time6Months.args = {
  scale: scaleUtc({
    domain: [new Date("2021-01-01"), new Date("2021-06-30")],
  }),
};

export const Time1Month = Template.bind({});
Time1Month.args = {
  scale: scaleUtc({
    domain: [new Date("2021-01-01"), new Date("2021-01-31")],
  }),
};

export const Time10Days = Template.bind({});
Time10Days.args = {
  scale: scaleUtc({
    domain: [new Date("2021-01-01"), new Date("2021-01-10")],
  }),
};
