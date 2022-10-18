import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { scaleTime, scaleLinear } from "@visx/scale";
import { AxisBottom, AxisBottomProps } from ".";
import { isOverTwoMonths, getNumTicks, formatDateTick } from "./utils";
import { AutoWidth } from "../AutoWidth";

export default {
  title: "Charts/Axis Bottom",
} as ComponentMeta<typeof AxisBottom>;

const height = 400;
const padding = 60;

const commonProps: Partial<AxisBottomProps> = {
  left: padding,
  top: padding,
};

const UnitsTemplate: ComponentStory<typeof AxisBottom> = (args) => {
  return (
    <svg width={args.width} height={height}>
      <AxisBottom
        {...args}
        {...commonProps}
        scale={scaleLinear({
          domain: args.scale.domain(),
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          range: [0, args.width! - 2 * padding],
        })}
      />
    </svg>
  );
};

const Units = UnitsTemplate.bind({});
export const UnitsExample = () => (
  <AutoWidth>
    <Units scale={scaleLinear({ domain: [0, 10] })} />
  </AutoWidth>
);

const TimeSeriesTemplate: ComponentStory<typeof AxisBottom> = (args) => {
  const [startDate, endDate] = args.scale.domain();
  return (
    <svg width={args.width} height={height}>
      <AxisBottom
        {...args}
        {...commonProps}
        scale={scaleTime({
          domain: [startDate, endDate],
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          range: [0, args.width! - 2 * padding],
        })}
        tickFormat={(date: Date) =>
          formatDateTick(date, isOverTwoMonths(startDate, endDate))
        }
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        numTicks={getNumTicks(args.width!)}
      />
    </svg>
  );
};

const TwoYears = TimeSeriesTemplate.bind({});
export const TwoYearsExample = () => (
  <AutoWidth>
    <TwoYears
      scale={scaleTime({
        domain: [new Date("2021-01-01"), new Date("2022-12-31")],
      })}
    />
  </AutoWidth>
);

const OneYear = TimeSeriesTemplate.bind({});
export const OneYearExample = () => (
  <AutoWidth>
    <OneYear
      scale={scaleTime({
        domain: [new Date("2021-01-01"), new Date("2021-12-31")],
      })}
    />
  </AutoWidth>
);

const SixMonths = TimeSeriesTemplate.bind({});
export const SixMonthsExample = () => (
  <AutoWidth>
    <SixMonths
      scale={scaleTime({
        domain: [new Date("2021-01-01"), new Date("2021-06-30")],
      })}
    />
  </AutoWidth>
);

const OneMonth = TimeSeriesTemplate.bind({});
export const OneMonthExample = () => (
  <AutoWidth>
    <OneMonth
      scale={scaleTime({
        domain: [new Date("2021-01-01"), new Date("2021-01-31")],
      })}
    />
  </AutoWidth>
);

const TenDays = TimeSeriesTemplate.bind({});
export const TenDaysExample = () => (
  <AutoWidth>
    <TenDays
      scale={scaleTime({
        domain: [new Date("2021-01-01"), new Date("2021-01-11")],
      })}
    />
  </AutoWidth>
);
