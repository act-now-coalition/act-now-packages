import React from "react";
import { Container } from "./MetricChart.style";
import { MetricChartProps } from "./interfaces";
import { LineChart } from "../LineChart";
import { AxisLeft, AxisBottom } from "../Axis";
import { scaleLinear, scaleTime } from "@visx/scale";

export const MetricChart: React.FC<MetricChartProps> = ({
  width,
  height,
  // marginTop = 10,
  // marginBottom = 30,
  // marginLeft = 70,
  // marginRight = 20,
  // barOpacity,
  // barOpacityHover,
  // dateRange,
  timeseries,
  xScale,
  yScale,
}) => {
  const padding = 20;

  const leftScale = scaleLinear({
    domain: [0, width],
    range: [height - 2 * padding, 0],
  });

  const bottomScale = scaleTime({
    domain: [new Date("2022-01-01"), new Date()],
    range: [0, width - 2 * padding],
  });

  // const bottomUnitsScale = scaleLinear({
  //   domain: [10, 0],
  //   range: [height - 2 * padding, 0],
  // });

  return (
    <Container>
      <svg width={width} height={height} style={{ border: "1px solid red" }}>
        <AxisBottom top={height - padding} left={padding} scale={bottomScale} />
        <AxisLeft left={padding} scale={leftScale} />
        <LineChart
          timeseries={timeseries}
          xScale={xScale}
          yScale={yScale}
          stroke="#2a9d8f"
        />
      </svg>
    </Container>
  );
};
