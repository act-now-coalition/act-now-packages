import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { scaleUtc, scaleLinear } from "@visx/scale";
import { AxisBottom, AxisBottomProps } from ".";
import { isOverTwoMonths, getNumTicks, formatDateTick } from "./utils";
import { AutoWidth } from "../AutoWidth";
import { Box } from "@mui/material";

export default {
  title: "Charts/Axis Bottom",
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

export const Units = Template.bind({});
Units.args = {
  scale: scaleLinear({ domain: [0, 10] }),
};

export const TwoYears = Template.bind({});
TwoYears.args = {
  scale: scaleUtc({
    domain: [new Date("2021-01-01"), new Date("2022-12-31")],
  }),
};

export const OneYear = Template.bind({});
OneYear.args = {
  scale: scaleUtc({
    domain: [new Date("2021-01-01"), new Date("2021-12-31")],
  }),
};

export const SixMonths = Template.bind({});
SixMonths.args = {
  scale: scaleUtc({
    domain: [new Date("2021-01-01"), new Date("2021-06-30")],
  }),
};

export const OneMonth = Template.bind({});
OneMonth.args = {
  scale: scaleUtc({
    domain: [new Date("2021-01-01"), new Date("2021-01-31")],
  }),
};

export const TenDays = Template.bind({});
TenDays.args = {
  scale: scaleUtc({
    domain: [new Date("2021-01-01"), new Date("2021-01-10")],
  }),
};
