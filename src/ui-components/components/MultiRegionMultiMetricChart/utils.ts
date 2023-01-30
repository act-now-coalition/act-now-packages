import { DateRange, Metric } from "../../../metrics";
import { Region } from "../../../regions";
import { TimeUnit, getTimeUnitLabel, subtractTime } from "../../../time-utils";
import { schemeCategory10 } from "../../common/utils/charts";
import { Series, SeriesType } from "../SeriesChart";

export function getMetricSeries(metric: Metric, regions: Region[]): Series[] {
  return regions.map((region, index) => ({
    metric,
    region,
    type: SeriesType.LINE,
    label: region.shortName,
    lineProps: {
      stroke: schemeCategory10[index % schemeCategory10.length],
    },
  }));
}

export interface TimePeriod {
  /** Label to show in the dropdown */
  label: string;
  /**
   * Date range to filter the series by. If undefined, it doesn't
   * filter the timeseries.
   * */
  dateRange?: DateRange;
}

export function getDefaultTimePeriods(): TimePeriod[] {
  return [
    timePeriodOption(60, TimeUnit.DAYS),
    timePeriodOption(180, TimeUnit.DAYS),
  ];
}

/**
 * Creates a custom time period option for the MultiRegionMultiMetricChart
 * component.
 *
 * @param amount - Number of units of time.
 * @param unit - Unit of time.
 */
export function timePeriodOption(amount: number, unit: TimeUnit): TimePeriod {
  return {
    label: `${amount} ${getTimeUnitLabel(amount, unit)}`,
    dateRange: { startAt: subtractTime(new Date(), amount, unit) },
  };
}
