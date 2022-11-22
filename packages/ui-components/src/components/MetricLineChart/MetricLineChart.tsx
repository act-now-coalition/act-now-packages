import React from "react";
import { scaleLinear, scaleUtc } from "@visx/scale";
import { Group } from "@visx/group";
import { useData } from "../../common/hooks";
import { AxesTimeseries } from "../AxesTimeseries";
import { ChartOverlayX, useHoveredDate } from "../ChartOverlayX";
import { LineChart } from "../LineChart";
import { useMetricCatalog } from "../MetricCatalogContext";
import { MetricTooltip } from "../MetricTooltip";
import { PointMarker } from "../PointMarker";
import { BaseChartProps } from "../../common/utils/charts";
import { Metric } from "@actnowcoalition/metrics";
import { Region } from "@actnowcoalition/regions";

export interface MetricLineChartProps extends BaseChartProps {
  metric: Metric | string;
  region: Region;
}

export const MetricLineChart = ({
  metric: metricOrId,
  region,
  width,
  height,
  marginTop = 10,
  marginBottom = 30,
  marginLeft = 70,
  marginRight = 20,
}: MetricLineChartProps) => {
  const metricCatalog = useMetricCatalog();
  const metric = metricCatalog.getMetric(metricOrId);

  const { data } = useData(region, metric, /*includeTimeseries=*/ true);
  const timeseries = data && data?.timeseries.assertFiniteNumbers();

  const { hoveredPoint, onMouseMove, onMouseLeave } =
    useHoveredDate(timeseries);

  if (!data || !timeseries?.hasData()) {
    return null;
  }

  const chartHeight = height - marginTop - marginBottom;
  const chartWidth = width - marginLeft - marginRight;

  const { minDate, maxDate, maxValue } = timeseries;

  const xScale = scaleUtc({
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
          xScale={xScale}
          yScale={yScale}
          axisLeftProps={{
            tickFormat: (value: number) => metric.formatValue(value),
          }}
        />
        <LineChart timeseries={timeseries} xScale={xScale} yScale={yScale} />
        {hoveredPoint && (
          <MetricTooltip
            metric={metric}
            region={region}
            point={hoveredPoint}
            open
          >
            <PointMarker
              x={xScale(hoveredPoint.date)}
              y={yScale(hoveredPoint.value)}
            />
          </MetricTooltip>
        )}
        <ChartOverlayX
          width={chartWidth}
          height={chartHeight}
          xScale={xScale}
          offset={marginLeft}
          onMouseMove={onMouseMove}
          onMouseLeave={onMouseLeave}
        />
      </Group>
    </svg>
  );
};
