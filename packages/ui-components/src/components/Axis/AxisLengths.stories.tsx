import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { scaleTime } from "@visx/scale";
import {
  formatDateTime,
  DateFormat,
  getTimeDiff,
  TimeUnit,
} from "@actnowcoalition/time-utils";
import { AxisBottom } from ".";

export default {
  title: "Charts/Axis Lengths",
} as ComponentMeta<typeof AxisBottom>;

const width = 1000;
const height = 400;
const padding = 60;

function getNumTicks(width: number): number {
  if (width < 300) {
    return 3;
  } else if (width < 600) {
    return 5;
  } else if (width < 900) {
    return 7;
  }
  return 10;
}

function getDateFormat(dateRange: number): DateFormat {
  return dateRange < 365 ? DateFormat.MMM_D : DateFormat.MMM_YY;
}

const bottomScale = scaleTime({
  domain: [new Date("2021-01-01"), new Date("2022-12-31")],
  range: [0, width - 2 * padding],
});

const DefaultTemplateBottomAxis: ComponentStory<typeof AxisBottom> = (args) => {
  const [minDate, maxDate] = args.scale.domain();
  const dateRange = getTimeDiff(maxDate, minDate, TimeUnit.DAYS);
  const dateFormat = getDateFormat(dateRange);
  return (
    <svg width={width} height={height}>
      <AxisBottom
        {...args}
        left={padding}
        top={padding}
        tickFormat={(date: Date) => formatDateTime(date, dateFormat)}
        numTicks={getNumTicks(width)}
      />
    </svg>
  );
};

export const DefaultBottomAxis = DefaultTemplateBottomAxis.bind({});
DefaultBottomAxis.args = {
  scale: bottomScale,
};
