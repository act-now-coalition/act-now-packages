import React from "react";
import { Skeleton } from "@mui/material";
import { Group } from "@visx/group";
import { scaleLinear, scaleTime } from "@visx/scale";
import uniq from "lodash/uniq";
import min from "lodash/min";
import max from "lodash/max";

import { assert } from "@actnowcoalition/assert";
import { Timeseries } from "@actnowcoalition/metrics";

import { useDataForRegionsAndMetrics } from "../../common/hooks";
import { AxesTimeseries } from "../AxesTimeseries";
import { BaseChartProps } from "../MetricLineChart";
import { Series } from "./interfaces";
import { SeriesChart } from "./SeriesChart";

/**
 *
 */
export interface MetricSeriesChartProps extends BaseChartProps {
  /** */
  series: Series[];
}

/**
 * Chart that represent multiple (region, metric) combinations in the same
 * chart. The timeseries will normally share the date span and the units
 * on the y-axis, they should be comparable. Examples.
 *
 * The axis will be calculated from the data. The appearance of each series
 * depends on its type and other properties passed when creating the series.
 *
 * @returns SVG element with the chart.
 */
export const MetricSeriesChart = ({
  series,
  width,
  height,
  marginTop = 10,
  marginBottom = 40,
  marginLeft = 70,
  marginRight = 20,
}: MetricSeriesChartProps) => {
  // Deduplicate the regions and metrics if necessary
  const regions = uniq(series.map(({ region }) => region));
  const metrics = uniq(series.map(({ metric }) => metric));

  const { data } = useDataForRegionsAndMetrics(
    regions,
    metrics,
    /*includeTimeseries=*/ true
  );

  if (!data) {
    return <Skeleton variant="rectangular" width={width} height={height} />;
  }

  const seriesList = series
    .filter(({ metric, region }) => data.hasMetricData(region, metric))
    .map((seriesItem) => ({
      series: seriesItem,
      timeseries: data
        .metricData(seriesItem.region, seriesItem.metric)
        .timeseries.assertFiniteNumbers(),
    }))
    .filter(({ timeseries }) => timeseries.hasData());

  const timeseriesList = seriesList.map(({ timeseries }) => timeseries);

  const [minDate, maxDate] = getDateRange(timeseriesList);
  const [minValue, maxValue] = getValueRange(timeseriesList);

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
      <Group top={marginTop} left={marginLeft}>
        <AxesTimeseries
          yScale={yScale}
          dateScale={dateScale}
          height={chartHeight}
        />
        {seriesList.map((item, itemIndex) => (
          <SeriesChart
            key={`series-${itemIndex}`}
            series={item.series}
            timeseries={item.timeseries}
            dateScale={dateScale}
            yScale={yScale}
          />
        ))}
      </Group>
    </svg>
  );
};

function getDateRange(timeseriesList: Timeseries<unknown>[]): [Date, Date] {
  const minDate = min(timeseriesList.map(({ minDate }) => minDate));
  const maxDate = max(timeseriesList.map(({ maxDate }) => maxDate));

  assert(
    minDate instanceof Date && maxDate instanceof Date,
    "minDate and maxDate should be date"
  );

  return [minDate, maxDate];
}
function getValueRange(timeseriesList: Timeseries<number>[]): [number, number] {
  const minValue = min(timeseriesList.map(({ minValue }) => minValue));
  const maxValue = max(timeseriesList.map(({ maxValue }) => maxValue));

  assert(
    typeof minValue === "number" && typeof maxValue === "number",
    "min and max value"
  );

  return [minValue, maxValue];
}
