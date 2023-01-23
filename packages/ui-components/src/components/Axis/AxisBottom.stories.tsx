import React from "react";

import { Box, Typography } from "@mui/material";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Group } from "@visx/group";
import { scaleLinear, scaleUtc } from "@visx/scale";

import {
  TimeUnit,
  getTimeUnitLabel,
  subtractTime,
} from "@actnowcoalition/time-utils";

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

function createTimePeriodItem(date: Date, amount: number, unit: TimeUnit) {
  return {
    startDate: subtractTime(date, amount, unit),
    endDate: date,
    label: `${amount} ${getTimeUnitLabel(amount, unit)}`,
  };
}

const date = new Date("2023-01-15");
const timePeriods = [
  createTimePeriodItem(date, 10, TimeUnit.YEARS),
  createTimePeriodItem(date, 6, TimeUnit.YEARS),
  createTimePeriodItem(date, 4, TimeUnit.YEARS),
  createTimePeriodItem(date, 2, TimeUnit.YEARS),
  createTimePeriodItem(date, 18, TimeUnit.MONTHS),
  createTimePeriodItem(date, 12, TimeUnit.MONTHS),
  createTimePeriodItem(date, 8, TimeUnit.MONTHS),
  createTimePeriodItem(date, 6, TimeUnit.MONTHS),
  createTimePeriodItem(date, 3, TimeUnit.MONTHS),
  createTimePeriodItem(date, 2, TimeUnit.MONTHS),
  createTimePeriodItem(date, 1, TimeUnit.MONTHS),
  createTimePeriodItem(date, 2, TimeUnit.WEEKS),
  createTimePeriodItem(date, 1, TimeUnit.WEEKS),
];

const TimeAxis = ({
  width,
  startDate,
  endDate,
  label,
}: {
  width: number;
  startDate: Date;
  endDate: Date;
  label: string;
}) => {
  const padding = 20;
  const timeScale = scaleUtc({
    domain: [startDate, endDate],
    range: [padding, width - 2 * padding],
  });
  return (
    <div>
      <Typography variant="overline" component="div">
        {label}
      </Typography>
      <svg width={width} height={60} style={{ border: "solid 1px blue" }}>
        <Group top={padding}>
          <AxisBottom scale={timeScale} />
        </Group>
      </svg>
    </div>
  );
};

const AxisSample = ({ width }: { width: number }) => (
  <>
    {timePeriods.map(({ startDate, endDate, label }, i) => (
      <TimeAxis
        key={`key-${i}`}
        label={label}
        width={width}
        startDate={startDate}
        endDate={endDate}
      />
    ))}
  </>
);

export const Long = () => <AxisSample width={900} />;
export const Medium = () => <AxisSample width={600} />;
export const Small = () => <AxisSample width={400} />;
export const ExtraSmall = () => <AxisSample width={300} />;
