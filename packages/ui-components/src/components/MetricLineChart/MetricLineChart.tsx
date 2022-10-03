import React, { useState } from "react";
import { scaleLinear, scaleTime } from "@visx/scale";
import { Group } from "@visx/group";
import { TimeseriesPoint } from "@actnowcoalition/metrics";
import { useData } from "../../common/hooks";
import { AxesTimeseries } from "../Axes";
import { ChartOverlayX, ChartOverlayXProps } from "../ChartOverlayX";
import { LineChart } from "../LineChart";
import { useMetricCatalog } from "../MetricCatalogContext";
import { MetricTooltip } from "../MetricTooltip";
import { CircleMarker } from "./MetricLineChart.styles";
import { MetricLineChartProps } from "./interfaces";

export const MetricLineChart: React.FC<MetricLineChartProps> = ({
  metric: metricOrId,
  region,
  width,
  height,
  marginTop = 10,
  marginBottom = 30,
  marginLeft = 70,
  marginRight = 20,
}) => {
  const metricCatalog = useMetricCatalog();
  const metric = metricCatalog.getMetric(metricOrId);
  const { data } = useData(region, metric, true);

  const [hoveredPoint, setHoveredPoint] =
    useState<TimeseriesPoint<number> | null>(null);

  const onMouseLeave = () => {
    setHoveredPoint(null);
  };
  const onMouseMove: ChartOverlayXProps["onMouseMove"] = ({ date }) => {
    const point = timeseries.findNearestDate(date);
    if (point) {
      setHoveredPoint(point);
    }
  };

  if (!data) {
    return null;
  }

  const timeseries = data.timeseries.assertFiniteNumbers();

  if (!timeseries.hasData()) {
    return null;
  }

  const chartHeight = height - marginTop - marginBottom;
  const chartWidth = width - marginLeft - marginRight;

  const { minDate, maxDate, maxValue } = timeseries;

  const dateScale = scaleTime({
    domain: [minDate, maxDate],
    range: [0, chartWidth],
  });

  const yScale = scaleLinear({
    domain: [0, maxValue],
    range: [chartHeight, 0],
  });

  return (
    <svg width={width} height={height}>
      <Group left={marginLeft} top={marginTop}>
        <AxesTimeseries
          height={chartHeight}
          dateScale={dateScale}
          yScale={yScale}
          axisLeftProps={{ tickFormat: (value) => metric.formatValue(value) }}
        />
        <LineChart timeseries={timeseries} xScale={dateScale} yScale={yScale} />
        {hoveredPoint && (
          <MetricTooltip
            metric={metric}
            region={region}
            point={hoveredPoint}
            placement="top"
            disableInteractive
            open
          >
            <CircleMarker
              cx={dateScale(hoveredPoint.date)}
              cy={yScale(hoveredPoint.value)}
              r={6}
              fill="black"
            />
          </MetricTooltip>
        )}
        <ChartOverlayX
          width={chartWidth}
          height={chartHeight}
          xScale={dateScale}
          offset={marginLeft}
          onMouseMove={onMouseMove}
          onMouseLeave={onMouseLeave}
        />
      </Group>
    </svg>
  );
};
