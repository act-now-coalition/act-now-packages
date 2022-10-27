import React from "react";
import { Group } from "@visx/group";
import uniq from "lodash/uniq";
import min from "lodash/min";
import max from "lodash/max";
import { scaleLinear, scaleTime } from "@visx/scale";
import { assert } from "@actnowcoalition/assert";

import { AxesTimeseries } from "../AxesTimeseries";
import { useDataForRegionsAndMetrics } from "../../common/hooks";
import { RectClipGroup } from "../RectClipGroup";
import { BaseChartProps } from "../MetricLineChart/interfaces";
import { Series } from "./interfaces";
import { SeriesChart } from "./SeriesChart";

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
            />
          ))}
        </RectClipGroup>
      </Group>
    </svg>
  );
};
