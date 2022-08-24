import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { scaleLinear, scaleTime } from "@visx/scale";
import {
  AxisLeft,
  AxisBottom,
  bottomTickLabelProps,
  leftTickLabelProps,
} from "./Axis.style";
import { theme } from "../../styles";
import { formatDateTime, DateFormat } from "@actnowcoalition/time-utils";

export default {
  title: "Charts/Axis",
  component: AxisLeft,
} as ComponentMeta<typeof AxisLeft>;

const width = 600;
const height = 400;
const padding = 60;

const leftScale = scaleLinear({
  domain: [0, 500],
  range: [height - 2 * padding, 0],
});

const bottomScale = scaleTime({
  domain: [new Date("2022-01-01"), new Date("2022-06-01")],
  range: [0, width - 2 * padding],
});

const formatDate = (date: Date) => formatDateTime(date, DateFormat.MMM);

const TemplateBottomAxis: ComponentStory<typeof AxisBottom> = (args) => (
  <svg width={width} height={height}>
    <AxisBottom
      {...args}
      left={padding}
      top={padding}
      // Approximate (More info: https://airbnb.io/visx/docs/axis#Axis_numTicks)
      numTicks={5}
      tickLength={4}
      tickStroke={theme.palette.border.default}
      tickFormat={formatDate}
      tickLabelProps={bottomTickLabelProps}
      stroke={theme.palette.border.default}
    />
  </svg>
);

export const BottomAxis = TemplateBottomAxis.bind({});
BottomAxis.args = {
  scale: bottomScale,
};

const TemplateLeftAxis: ComponentStory<typeof AxisLeft> = (args) => (
  <svg width={width} height={height}>
    <AxisLeft
      {...args}
      left={padding}
      top={padding}
      // Approximate (More info: https://airbnb.io/visx/docs/axis#Axis_numTicks)
      numTicks={5}
      hideTicks
      tickLabelProps={leftTickLabelProps}
      stroke={theme.palette.border.default}
    />
  </svg>
);

export const LeftAxis = TemplateLeftAxis.bind({});
LeftAxis.args = {
  scale: leftScale,
};
