import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { scaleTime } from "@visx/scale";
import { formatDateTime } from "@actnowcoalition/time-utils";
import { AxisBottom, AxisBottomProps } from ".";
import { getDateFormat, getNumTicks } from "./utils";

export default {
  title: "Charts/Axis Lengths",
} as ComponentMeta<typeof AxisBottom>;

const wideWidth = 900;
const mediumWidth = 600;
const smallWidth = 280;

const height = 400;
const padding = 60;

const commonProps: Partial<AxisBottomProps> = {
  left: padding,
  top: padding,
};

const WideScreenTemplate: ComponentStory<typeof AxisBottom> = (args) => {
  return (
    <svg width={wideWidth} height={height}>
      <AxisBottom
        {...args}
        {...commonProps}
        tickFormat={(date: Date) =>
          formatDateTime(date, getDateFormat(args.scale.domain()))
        }
        numTicks={getNumTicks(wideWidth)}
      />
    </svg>
  );
};

const MediumScreenTemplate: ComponentStory<typeof AxisBottom> = (args) => {
  return (
    <svg width={mediumWidth} height={height}>
      <AxisBottom
        {...args}
        {...commonProps}
        tickFormat={(date: Date) =>
          formatDateTime(date, getDateFormat(args.scale.domain()))
        }
        numTicks={getNumTicks(mediumWidth)}
      />
    </svg>
  );
};

const SmallScreenTemplate: ComponentStory<typeof AxisBottom> = (args) => {
  return (
    <svg width={smallWidth} height={height}>
      <AxisBottom
        {...args}
        {...commonProps}
        tickFormat={(date: Date) =>
          formatDateTime(date, getDateFormat(args.scale.domain()))
        }
        numTicks={getNumTicks(smallWidth)}
      />
    </svg>
  );
};

export const WideScreenWithTwoYears = WideScreenTemplate.bind({});
WideScreenWithTwoYears.args = {
  scale: scaleTime({
    domain: [new Date("2021-01-01"), new Date("2022-12-31")],
    range: [0, wideWidth - 2 * padding],
  }),
};

export const WideScreenWithOneYear = WideScreenTemplate.bind({});
WideScreenWithOneYear.args = {
  scale: scaleTime({
    domain: [new Date("2021-01-01"), new Date("2021-12-31")],
    range: [0, wideWidth - 2 * padding],
  }),
};

export const MediumScreenWithSixMonths = MediumScreenTemplate.bind({});
MediumScreenWithSixMonths.args = {
  scale: scaleTime({
    domain: [new Date("2021-01-01"), new Date("2021-06-30")],
    range: [0, mediumWidth - 2 * padding],
  }),
};

export const MediumScreenWithOneMonth = MediumScreenTemplate.bind({});
MediumScreenWithOneMonth.args = {
  scale: scaleTime({
    domain: [new Date("2021-01-01"), new Date("2021-01-31")],
    range: [0, mediumWidth - 2 * padding],
  }),
};

export const SmallScreenWithTwoWeeks = SmallScreenTemplate.bind({});
SmallScreenWithTwoWeeks.args = {
  scale: scaleTime({
    domain: [new Date("2021-01-01"), new Date("2021-01-15")],
    range: [0, smallWidth - 2 * padding],
  }),
};

export const SmallScreenWithOneWeek = SmallScreenTemplate.bind({});
SmallScreenWithOneWeek.args = {
  scale: scaleTime({
    domain: [new Date("2021-01-01"), new Date("2021-01-08")],
    range: [0, smallWidth - 2 * padding],
  }),
};
