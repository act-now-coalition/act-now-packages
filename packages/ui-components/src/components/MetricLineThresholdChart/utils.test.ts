import { MetricLevel } from "@actnowcoalition/metrics";
import { calculateChartIntervals } from "./utils";

const LEVEL_LOW = { id: "low", color: "green" };
const LEVEL_MEDIUM = { id: "medium", color: "orange" };
const LEVEL_HIGH = { id: "high", color: "red" };

describe("calculateChartIntervals", () => {
  describe("one threshold", () => {
    const levels: MetricLevel[] = [LEVEL_LOW, LEVEL_HIGH];

    test("minValue < T < maxValue", () => {
      const intervals = calculateChartIntervals(levels, [10], 5, 25);
      expect(intervals).toEqual([
        { lower: 5, upper: 10, level: LEVEL_LOW },
        { lower: 10, upper: 25, level: LEVEL_HIGH },
      ]);
    });

    test("minValue < maxValue < T", () => {
      const intervals = calculateChartIntervals(levels, [10], 0, 5);
      expect(intervals).toEqual([{ lower: 0, upper: 10, level: LEVEL_LOW }]);
    });

    test("T < minValue < maxValue", () => {
      const intervals = calculateChartIntervals(levels, [10], 15, 25);
      expect(intervals).toEqual([{ lower: 10, upper: 25, level: LEVEL_HIGH }]);
    });
  });

  describe("multiple thresholds", () => {
    const levels = [LEVEL_LOW, LEVEL_MEDIUM, LEVEL_HIGH];
    test("minValue < T1 < T2 < maxValue", () => {
      const intervals = calculateChartIntervals(levels, [10, 20], 5, 25);
      expect(intervals).toEqual([
        { lower: 5, upper: 10, level: LEVEL_LOW },
        { lower: 10, upper: 20, level: LEVEL_MEDIUM },
        { lower: 20, upper: 25, level: LEVEL_HIGH },
      ]);
    });

    test("T1 < minValue < T2 < maxValue", () => {
      const intervals = calculateChartIntervals(levels, [10, 20], 15, 25);
      expect(intervals).toEqual([
        { lower: 10, upper: 20, level: LEVEL_MEDIUM },
        { lower: 20, upper: 25, level: LEVEL_HIGH },
      ]);
    });

    test("minValue < T1 < maxValue < T2", () => {
      const intervals = calculateChartIntervals(levels, [10, 20], 5, 15);
      expect(intervals).toEqual([
        { lower: 5, upper: 10, level: LEVEL_LOW },
        { lower: 10, upper: 20, level: LEVEL_MEDIUM },
      ]);
    });

    test("T1 < minValue < maxValue < T2", () => {
      const intervals = calculateChartIntervals(levels, [10, 20], 14, 18);
      expect(intervals).toEqual([
        { lower: 10, upper: 20, level: LEVEL_MEDIUM },
      ]);
    });
  });

  describe("multiple thresholds (descending)", () => {
    const levels = [LEVEL_LOW, LEVEL_MEDIUM, LEVEL_HIGH];
    test("minValue < T1 < T2 < maxValue", () => {
      const intervals = calculateChartIntervals(levels, [20, 10], 5, 25);
      expect(intervals).toEqual([
        { lower: 20, upper: 25, level: LEVEL_LOW },
        { lower: 10, upper: 20, level: LEVEL_MEDIUM },
        { lower: 5, upper: 10, level: LEVEL_HIGH },
      ]);
    });

    test("T1 < minValue < T2 < maxValue ", () => {
      const intervals = calculateChartIntervals(levels, [20, 10], 15, 25);
      expect(intervals).toEqual([
        { lower: 20, upper: 25, level: LEVEL_LOW },
        { lower: 10, upper: 20, level: LEVEL_MEDIUM },
      ]);
    });

    test("minValue < T1 < maxValue < T2 ", () => {
      const intervals = calculateChartIntervals(levels, [20, 10], 5, 15);
      expect(intervals).toEqual([
        { lower: 10, upper: 20, level: LEVEL_MEDIUM },
        { lower: 5, upper: 10, level: LEVEL_HIGH },
      ]);
    });

    test("T1 < minValue < maxValue < T2 ", () => {
      const intervals = calculateChartIntervals(levels, [20, 10], 14, 18);
      expect(intervals).toEqual([
        { lower: 10, upper: 20, level: LEVEL_MEDIUM },
      ]);
    });
  });
});