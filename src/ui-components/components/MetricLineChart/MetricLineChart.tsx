import React from "react";

import { Skeleton } from "@mui/material";
import { Group } from "@visx/group";
import { scaleLinear, scaleUtc } from "@visx/scale";

import { Metric } from "../../../metrics";
import { Region } from "../../../regions";
import { useData } from "../../common/hooks";
import { BaseChartProps, getChartRange } from "../../common/utils/charts";
import { AxesTimeseries } from "../AxesTimeseries";
import { ChartOverlayX, useHoveredDate } from "../ChartOverlayX";
import { ComponentLoaded } from "../ComponentLoaded";
import { ErrorBox } from "../ErrorBox";
import { LineChart } from "../LineChart";
import { useMetricCatalog } from "../MetricCatalogContext";
import { MetricChartTooltip } from "../MetricChartTooltip";
import { PointMarker } from "../PointMarker";

export interface MetricLineChartProps extends BaseChartProps {
  /**
   * Metric represented by the line chart.
   */
  metric: Metric | string;
  /**
   * Region represented by the line chart.
   */
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

  const { data, error } = useData(region, metric, /*includeTimeseries=*/ true);
  const timeseries = data && data?.timeseries.assertFiniteNumbers();

  const { hoveredPoint, onMouseMove, onMouseLeave } =
    useHoveredDate(timeseries);

  if (error) {
    return (
      <ErrorBox width={width} height={height}>
        Chart could not be loaded.
      </ErrorBox>
    );
  } else if (!data || !timeseries?.hasData()) {
    return <Skeleton variant="rectangular" width={width} height={height} />;
  }

  const chartHeight = height - marginTop - marginBottom;
  const chartWidth = width - marginLeft - marginRight;

  const { minDate, maxDate } = timeseries;
  const [minValue, maxValue] = getChartRange(metric, timeseries);

  const xScale = scaleUtc({
    domain: [minDate, maxDate],
    range: [0, chartWidth],
  });

  const yScale = scaleLinear({
    domain: [minValue, maxValue],
    range: [chartHeight, 0],
  });

  return (
    <>
      <svg width={width} height={height} style={{ display: "block" }}>
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
            <MetricChartTooltip
              metric={metric}
              region={region}
              point={hoveredPoint}
              open
            >
              <PointMarker
                x={xScale(hoveredPoint.date)}
                y={yScale(hoveredPoint.value)}
              />
            </MetricChartTooltip>
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
      {data && timeseries.hasData() && <ComponentLoaded />}
    </>
  );
};
