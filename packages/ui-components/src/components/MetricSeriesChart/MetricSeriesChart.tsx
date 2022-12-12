import React from "react";

import { Skeleton, useTheme } from "@mui/material";
import { Group } from "@visx/group";
import { scaleLinear, scaleUtc } from "@visx/scale";
import isNumber from "lodash/isNumber";
import max from "lodash/max";
import min from "lodash/min";
import sortBy from "lodash/sortBy";
import uniq from "lodash/uniq";

import { assert } from "@actnowcoalition/assert";
import { DateRange, Timeseries } from "@actnowcoalition/metrics";

import { useDataForRegionsAndMetrics } from "../../common/hooks";
import { BaseChartProps } from "../../common/utils/charts";
import { AxesTimeseries } from "../AxesTimeseries";
import { ChartOverlayXY, useHoveredPoint } from "../ChartOverlayXY";
import { ErrorBox } from "../ErrorBox";
import { useMetricCatalog } from "../MetricCatalogContext";
import { MetricTooltip } from "../MetricTooltip";
import { PointMarker } from "../PointMarker";
import { RectClipGroup } from "../RectClipGroup";
import { Series, SeriesChart, SeriesType } from "../SeriesChart";
import { SeriesLabel } from "./MetricSeriesChart.style";

export interface MetricSeriesChartProps extends BaseChartProps {
  /** List of series to be rendered */
  series: Series[];
  /** Minimum value for the y-axis. It defaults to 0. */
  minValue?: number;
  /**
   * Show labels for each series. The labels will be shown on the right side
   * of the chart, close to the last value of each series.
   */
  showLabels?: boolean;
  /** Date range used to filter the series */
  dateRange?: DateRange;
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
  minValue = 0,
  showLabels = true,
  dateRange,
}: MetricSeriesChartProps) => {
  const metricCatalog = useMetricCatalog();
  const theme = useTheme();
  const defaultTextColor = theme.palette.text.primary;

  // Deduplicate the regions and metrics if necessary
  const regions = uniq(series.map(({ region }) => region));
  const metrics = uniq(
    series.map(({ metric }) => metricCatalog.getMetric(metric))
  );

  assert(
    metrics.length > 0,
    `The series should have at least one valid metric`
  );

  const { data, error } = useDataForRegionsAndMetrics(
    regions,
    metrics,
    /*includeTimeseries=*/ true
  );

  const timeseriesList =
    data &&
    series.map(({ region, metric }) => {
      const fullTimeseries = data
        .metricData(region, metric)
        .timeseries.assertFiniteNumbers();

      return dateRange
        ? fullTimeseries.filterToDateRange(dateRange)
        : fullTimeseries;
    });

  const { pointInfo, onMouseMove, onMouseLeave } =
    useHoveredPoint(timeseriesList);

  if (error) {
    return (
      <ErrorBox width={width} height={height}>
        Chart could not be loaded.
      </ErrorBox>
    );
  } else if (!data || !timeseriesList) {
    return <Skeleton variant="rectangular" width={width} height={height} />;
  }

  const seriesList = series
    .filter(({ metric, region }) => data.hasMetricData(region, metric))
    .map((seriesItem, seriesIndex) => ({
      series: seriesItem,
      timeseries: timeseriesList[seriesIndex],
    }))
    .filter(({ timeseries }) => timeseries.hasData());

  const [minDate, maxDate] = getDateRange(timeseriesList);
  const [minDataValue, maxValue] = getValueRange(timeseriesList);

  // Note: We use minValue if provided. If not, we default to start from zero,
  // which is best in most cases, unless minDataValue is negative, in which
  // case we use that value instead.
  const minYValue = isNumber(minValue) ? minValue : Math.min(0, minDataValue);

  const chartWidth = width - marginLeft - marginRight;
  const chartHeight = height - marginTop - marginBottom;

  const xScale = scaleUtc({
    domain: [minDate, maxDate],
    range: [0, chartWidth],
  });

  const yScale = scaleLinear({
    domain: [minYValue, maxValue],
    range: [chartHeight, 0],
  });

  const initialLabelPositions = seriesList
    .filter((item) => item.series.label)
    .map(({ series, timeseries }): LabelInfo => {
      // NOTE: We already filtered out timeseries without data and items
      // without labels, this is for the benefit of TS.
      assert(series.label, `The series should have a label`);
      assert(timeseries.hasData(), `The timeseries should have data`);

      return {
        y: yScale(timeseries.lastValue),
        label: series.label,
        fill: getSeriesColor(series, defaultTextColor),
      };
    });

  // TODO (Pablo): Can we obtain the line height in pixels from the theme?
  const labelPositions = calculateLabelPositions(
    initialLabelPositions,
    /*labelLineHeight=*/ 14
  );

  // All the series in the chart should have compatible units, so it makes
  // sense to use any of them to format the values on the y-axis.
  const yAxisFormat = (value: number) => metrics[0].formatValue(value, "---");

  return (
    <svg width={width} height={height} style={{ display: "block" }}>
      <Group top={marginTop} left={marginLeft}>
        <AxesTimeseries
          yScale={yScale}
          xScale={xScale}
          height={chartHeight}
          axisLeftProps={{ tickFormat: yAxisFormat }}
        />
        <RectClipGroup width={chartWidth} height={chartHeight}>
          {seriesList.map((item, itemIndex) => (
            <SeriesChart
              key={`series-${itemIndex}`}
              series={item.series}
              timeseries={item.timeseries}
              xScale={xScale}
              yScale={yScale}
            />
          ))}
        </RectClipGroup>
        {showLabels && (
          <Group>
            {labelPositions.map((item, itemIndex) => (
              <SeriesLabel
                key={`label-${item.label}-${itemIndex}`}
                x={chartWidth + 5}
                y={item.y}
                fill={item.fill}
              >
                {item.label}
              </SeriesLabel>
            ))}
          </Group>
        )}
        {pointInfo?.point && isNumber(pointInfo?.timeseriesIndex) && (
          <MetricTooltip
            metric={series[pointInfo.timeseriesIndex].metric}
            region={series[pointInfo.timeseriesIndex].region}
            point={pointInfo.point}
            open
          >
            <PointMarker
              x={xScale(pointInfo.point.date)}
              y={yScale(pointInfo.point.value)}
              fill={getSeriesColor(
                series[pointInfo.timeseriesIndex],
                defaultTextColor
              )}
            />
          </MetricTooltip>
        )}
        <ChartOverlayXY
          timeseriesList={timeseriesList}
          width={chartWidth}
          height={chartHeight}
          xScale={xScale}
          yScale={yScale}
          onMouseMove={onMouseMove}
          onMouseOut={onMouseLeave}
        />
      </Group>
    </svg>
  );
};

/**
 * Returns the date range that covers the provided timeseries.
 *
 * @param timeseriesList List of timeseries.
 * @returns [minDate, maxDate]
 */
function getDateRange(timeseriesList: Timeseries<unknown>[]): [Date, Date] {
  const minDate = min(timeseriesList.map(({ minDate }) => minDate));
  const maxDate = max(timeseriesList.map(({ maxDate }) => maxDate));

  assert(
    minDate instanceof Date && maxDate instanceof Date,
    "At least one of the provided timeseries shouldn't be empty"
  );

  return [minDate, maxDate];
}

/**
 * Returns the range of values that covers the provided timeseries.
 *
 * @param timeseriesList List of timeseries.
 * @returns [minValue, maxValue]
 */
function getValueRange(timeseriesList: Timeseries<number>[]): [number, number] {
  const minValue = min(timeseriesList.map(({ minValue }) => minValue));
  const maxValue = max(timeseriesList.map(({ maxValue }) => maxValue));

  assert(
    typeof minValue === "number" && typeof maxValue === "number",
    "At least one of the provided timeseries shouldn't be empty"
  );

  return [minValue, maxValue];
}

function getSeriesColor(series: Series, defaultColor: string): string {
  if (series.type === SeriesType.LINE) {
    return series?.lineProps?.stroke ?? defaultColor;
  } else {
    return defaultColor;
  }
}

interface LabelInfo {
  y: number;
  label: string;
  fill: string;
}

/**
 * Adjust the y coordinate of the labels to prevent them from overlapping.
 */
function calculateLabelPositions(
  items: LabelInfo[],
  labelLineHeight: number
): LabelInfo[] {
  // Sort the items by SVG y-coordinate, in ascending order.
  const sortedItems = sortBy(items, (item) => item.y);

  return sortedItems.reduce((adjusted: LabelInfo[], item: LabelInfo) => {
    const dy = labelLineHeight;

    // Take the maximum y-coordinate from the items that are already
    // adjusted, and compare it with the y-coordinate of the current
    // item. If the items will overlap, we adjust the position of the
    // current item.
    const maxY = max(adjusted.map((p) => p.y)) ?? Number.NEGATIVE_INFINITY;
    const adjustedY = maxY + dy > item.y ? maxY + dy : item.y;
    return [...adjusted, { ...item, y: adjustedY }];
  }, []);
}
