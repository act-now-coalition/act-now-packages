import { appleStock } from "@visx/mock-data";
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
