import { Timeseries } from "./Timeseries";

/**
 * Generates a timeseries using a sine wave with random magnitude and phase.
 */
export function mockTimeseries(
  dataLength: number,
  minValue: number,
  maxValue: number,
  startDate: Date,
  endDate: Date
) {
  const range = maxValue - minValue;
  const midpoint = minValue + range / 2;
  const magnitude = (range * Math.random()) / 2;
  const phase = Math.random() * Math.PI * 2;
  const radiansPerDay = (Math.PI * 2) / dataLength;

  const values: number[] = [];
  for (let i = 0; i < dataLength; i++) {
    values[i] =
      midpoint + Math.sin(radiansPerDay * i + phase) * magnitude + minValue;
  }

  return Timeseries.fromDateRange(startDate, endDate, (date, i) => values[i]);
}
