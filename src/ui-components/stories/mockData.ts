import { appleStock, cityTemperature } from "@visx/mock-data";
import { scaleLinear, scaleUtc } from "@visx/scale";

import { Timeseries, TimeseriesPoint } from "../../metrics";
import { validate } from "../../validate";

// We generate random decimal points in TimeseriesPoint<number>
// format so we can use them to initialize Timeseries.
const randomPointsBetweenZeroAndOne = appleStock.map(
  (p: { date: string; close: number }): TimeseriesPoint<number> => ({
    date: new Date(p.date.substring(0, 10)),
    value: Math.random(),
  })
);

export const randomPointsBetweenZeroAndOneTimeseries = new Timeseries(
  randomPointsBetweenZeroAndOne
).filterToDateRange({
  startAt: new Date("2012-01-01"),
  endAt: new Date("2012-01-31"),
});

// We format the points from appleStock to match TimeseriesPoint<number>
// so we can use them to initialize Timeseries.
const appleStockPoints = appleStock.map(
  (p: { date: string; close: number }): TimeseriesPoint<number> => ({
    date: new Date(p.date.substring(0, 10)),
    value: p.close,
  })
);

export const appleStockTimeseries = new Timeseries(appleStockPoints);

function toCelsius(fahrenheit: number): number {
  return (fahrenheit - 32) * (5 / 9);
}

// We format the points from cityTemperature to match TimeseriesPoint<number>
// so we can use them to initialize Timeseries.
const nycTemperature = cityTemperature.map(
  (p: { date: string; "New York": string }): TimeseriesPoint<number> => ({
    date: new Date(p.date),
    value: toCelsius(parseFloat(p["New York"])),
  })
);

export const nycTemperatureTimeseries = new Timeseries(nycTemperature);

/**
 * Creates d3 scales that cover the date and value ranges of the
 * given timeseries. This function is intended to be used in stories
 * to simplify their setup.
 */
export function createTimeseriesScales(
  timeseries: Timeseries<number>,
  width: number,
  height: number
) {
  validate(timeseries.hasData(), "Timeseries cannot be empty");
  const { minDate, maxDate, minValue, maxValue } = timeseries;

  const xScale = scaleUtc({
    domain: [minDate, maxDate],
    range: [0, width],
  });

  const yScale = scaleLinear({
    domain: [minValue, maxValue],
    range: [height, 0],
  });

  return { xScale, yScale };
}
