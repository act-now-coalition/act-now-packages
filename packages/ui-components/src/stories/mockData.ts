import { appleStock } from "@visx/mock-data";
import { scaleLinear, scaleTime } from "@visx/scale";
import { assert } from "@actnowcoalition/assert";
import { Timeseries, TimeseriesPoint } from "@actnowcoalition/metrics";

// We format the points from appleStock to match TimeseriesPoint<number>
// so we can use them to initialize Timeseries.
const appleStockPoints = appleStock.map(
  (p: { date: string; close: number }): TimeseriesPoint<number> => ({
    date: new Date(p.date.substring(0, 10)),
    value: p.close,
  })
);

export const appleStockTimeseries = new Timeseries(appleStockPoints);

/**
 * Creates d3 scales that cover the date and value ranges of the
 * given timeseries. This function is intended to be used in stories
 * to make the setup more easy.
 */
export function createTimeseriesScales(
  timeseries: Timeseries<number>,
  width: number,
  height: number
) {
  assert(timeseries.hasData(), "Timeseries cannot be empty");
  const { minDate, maxDate, minValue, maxValue } = timeseries;

  const xScale = scaleTime({
    domain: [minDate, maxDate],
    range: [0, width],
  });

  const yScale = scaleLinear({
    domain: [minValue, maxValue],
    range: [height, 0],
  });

  return { xScale, yScale };
}
