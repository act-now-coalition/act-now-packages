import React from "react";
import { ScaleBand, ScaleLinear } from "d3-scale";

import { Timeseries } from "@actnowcoalition/metrics";

interface BarChartOwnProps {
  timeseries: Timeseries<number>;
  xScale: ScaleBand<Date>;
  yScale: ScaleLinear<number, number>;
}

type BarChartProps = BarChartOwnProps & React.SVGProps<SVGRectElement>;

const BarChart: React.FC<BarChartProps> = ({
  timeseries,
  xScale,
  yScale,
  ...rectProps
}) => {
  const [minHeight, maxHeight] = yScale.range();
  const barWidth = xScale.bandwidth();

  return (
    <>
      {timeseries.points.map((p, i) => {
        const barHeight = yScale(p.value);
        return (
          <rect
            key={`bar-${i}`}
            x={xScale(p.date)}
            y={maxHeight - minHeight - barHeight}
            width={barWidth}
            height={barHeight}
            fill="#000"
            {...rectProps}
          />
        );
      })}
    </>
  );
};

export default BarChart;
