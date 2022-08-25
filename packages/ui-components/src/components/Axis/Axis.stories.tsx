import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { scaleLinear, scaleTime } from "@visx/scale";
import { AxisLeft, AxisBottom } from "./Axis.style";

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

const bottomUnitsScale = scaleLinear({
  domain: [10, 0],
  range: [height - 2 * padding, 0],
});

const formatUnits = (unit: number) => unit.toString();

const DefaultTemplateBottomAxis: ComponentStory<typeof AxisBottom> = (args) => (
  <svg width={width} height={height}>
    <AxisBottom {...args} left={padding} top={padding} />
  </svg>
);

export const DefaultBottomAxis = DefaultTemplateBottomAxis.bind({});
DefaultBottomAxis.args = {
  scale: bottomScale,
};

const TemplateBottomAxis: ComponentStory<typeof AxisBottom> = (args) => (
  <svg width={width} height={height}>
    <AxisBottom
      {...args}
      left={padding}
      top={padding}
      // Approximate (More info: https://airbnb.io/visx/docs/axis#Axis_numTicks)
      numTicks={10}
      tickFormat={formatUnits}
    />
  </svg>
);

export const BottomAxis = TemplateBottomAxis.bind({});
BottomAxis.args = {
  scale: bottomUnitsScale,
};

const DefaultTemplateLeftAxis: ComponentStory<typeof AxisLeft> = (args) => (
  <svg width={width} height={height}>
    <AxisLeft {...args} left={padding} top={padding} />
  </svg>
);

export const DefaultLeftAxis = DefaultTemplateLeftAxis.bind({});
DefaultLeftAxis.args = {
  scale: leftScale,
};

const TemplateLeftAxis: ComponentStory<typeof AxisLeft> = (args) => (
  <svg width={width} height={height}>
    <AxisLeft
      {...args}
      left={padding}
      top={padding}
      // Approximate (More info: https://airbnb.io/visx/docs/axis#Axis_numTicks)
      numTicks={10}
    />
  </svg>
);

export const LeftAxis = TemplateLeftAxis.bind({});
LeftAxis.args = {
  scale: leftScale,
};
