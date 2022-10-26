import React from "react";
import { Group } from "@visx/group";
import { ScaleTime, ScaleLinear } from "d3-scale";
import uniq from "lodash/uniq";
import min from "lodash/min";
import max from "lodash/max";
import { scaleLinear, scaleTime } from "@visx/scale";
import { LinePathProps } from "@visx/shape/lib/shapes/LinePath";

import { Metric, Timeseries, TimeseriesPoint } from "@actnowcoalition/metrics";
import { Region } from "@actnowcoalition/regions";

import { AxesTimeseries } from "../AxesTimeseries";
import { BaseChartProps } from "../MetricLineChart/interfaces";
import { useDataForRegionsAndMetrics } from "../../common/hooks";
import { assert } from "@actnowcoalition/assert";
import { LineChart } from "../LineChart";
import { BarChart } from "../BarChart";
import { LineThresholdChart } from "../MetricLineThresholdChart/LineThresholdChart";
import { RectClipGroup } from "../RectClipGroup";

export enum SeriesType {
  LINE = "LINE",
  LINE_THRESHOLDS = "LINE_THRESHOLDS",
  BAR = "BAR",
}

export interface SeriesBase {
  metric: Metric;
  region: Region;
}

export interface SeriesLine extends SeriesBase {
  type: SeriesType.LINE;
  lineProps?: React.SVGProps<SVGPathElement> &
    LinePathProps<TimeseriesPoint<number>>;
}

export interface SeriesLineThresholds extends SeriesBase {
  type: SeriesType.LINE_THRESHOLDS;
}

export interface SeriesBar extends SeriesBase {
  type: SeriesType.BAR;
}

export type Series = SeriesLine | SeriesLineThresholds | SeriesBar;

export interface MetricSeriesChartProps extends BaseChartProps {
  series: Series[];
}

export const MetricSeriesChart = ({
  width,
  height,
  marginTop = 10,
  marginBottom = 40,
  marginLeft = 70,
  marginRight = 20,
  series,
}: MetricSeriesChartProps) => {
  const regions = uniq(series.map((s) => s.region));
  const metrics = uniq(series.map((s) => s.metric));

  const { data } = useDataForRegionsAndMetrics(
    regions,
    metrics,
    /*includeTimeseries=*/ true
  );

  if (!data) {
    return <svg width={width} height={height} />;
  }

  const chartItemList = series
    .filter((series) => data.hasMetricData(series.region, series.metric))
    .map((series) => ({
      series,
      timeseries: data
        .metricData(series.region, series.metric)
        .timeseries.assertFiniteNumbers(),
    }))
    .filter((item) => item.timeseries.hasData());

  const minValue = min(chartItemList.map((item) => item.timeseries.minValue));
  const maxValue = max(chartItemList.map((item) => item.timeseries.maxValue));
  const minDate = min(chartItemList.map((item) => item.timeseries.minDate));
  const maxDate = max(chartItemList.map((item) => item.timeseries.maxDate));

  assert(typeof minValue === "number", `minValue should be number`);
  assert(typeof maxValue === "number", `maxValue should be number`);
  assert(minDate instanceof Date, `minDate should be number`);
  assert(maxDate instanceof Date, `maxDate should be number`);

  const chartWidth = width - marginLeft - marginRight;
  const chartHeight = height - marginTop - marginBottom;

  const dateScale = scaleTime({
    domain: [minDate, maxDate],
    range: [0, chartWidth],
  });

  const yScale = scaleLinear({
    domain: [minValue, maxValue],
    range: [chartHeight, 0],
  });

  return (
    <svg width={width} height={height} style={{ border: "solid 1px #ddd" }}>
      <Group left={marginLeft} top={marginTop}>
        <AxesTimeseries
          dateScale={dateScale}
          yScale={yScale}
          height={chartHeight}
        />
        <RectClipGroup y={-10} width={chartWidth} height={chartHeight + 10}>
          {chartItemList.map((item, itemIndex) => (
            <SeriesChart
              series={item.series}
              key={`item-${itemIndex}`}
              timeseries={item.timeseries}
              dateScale={dateScale}
              yScale={yScale}
              width={chartWidth}
            />
          ))}
        </RectClipGroup>
      </Group>
    </svg>
  );
};

export interface SeriesChartProps {
  series: Series;
  timeseries: Timeseries<number>;
  dateScale: ScaleTime<number, number>;
  yScale: ScaleLinear<number, number>;
  width: number;
}

const SeriesChart = ({
  series,
  timeseries,
  dateScale,
  yScale,
  width,
}: SeriesChartProps) => {
  switch (series.type) {
    case SeriesType.LINE:
      return (
        <LineChart
          timeseries={timeseries}
          xScale={dateScale}
          yScale={yScale}
          {...(series.lineProps ?? {})}
        />
      );
    case SeriesType.LINE_THRESHOLDS:
      return (
        <LineThresholdChart
          metric={series.metric}
          timeseries={timeseries}
          dateScale={dateScale}
          yScale={yScale}
          width={width}
        />
      );
    case SeriesType.BAR:
      return (
        <BarChart
          timeseries={timeseries}
          xScale={dateScale}
          yScale={yScale}
          barWidth={0.5}
          fill="#ddd"
        />
      );
    default:
      return <></>;
  }
};
