import { Category } from "@actnowcoalition/metrics";
import { calculateChartIntervals } from "./utils";

const LOW = { id: "low", color: "green" };
const MEDIUM = { id: "medium", color: "orange" };
const HIGH = { id: "high", color: "red" };

describe("calculateChartIntervals", () => {
  describe("one threshold", () => {
    const categories: Category[] = [LOW, HIGH];

    test("minValue < T < maxValue", () => {
      const intervals = calculateChartIntervals(categories, [10], 5, 25);
      expect(intervals).toEqual([
        { lower: 5, upper: 10, category: LOW },
        { lower: 10, upper: 25, category: HIGH },
      ]);
    });

    test("minValue < maxValue < T", () => {
      const intervals = calculateChartIntervals(categories, [10], 0, 5);
      expect(intervals).toEqual([{ lower: 0, upper: 10, category: LOW }]);
    });

    test("T < minValue < maxValue", () => {
      const intervals = calculateChartIntervals(categories, [10], 15, 25);
      expect(intervals).toEqual([{ lower: 10, upper: 25, category: HIGH }]);
    });
  });

  describe("multiple thresholds", () => {
    const categories = [LOW, MEDIUM, HIGH];
    test("minValue < T1 < T2 < maxValue", () => {
      const intervals = calculateChartIntervals(categories, [10, 20], 5, 25);
      expect(intervals).toEqual([
        { lower: 5, upper: 10, category: LOW },
        { lower: 10, upper: 20, category: MEDIUM },
        { lower: 20, upper: 25, category: HIGH },
      ]);
    });

    test("T1 < minValue < T2 < maxValue", () => {
      const intervals = calculateChartIntervals(categories, [10, 20], 15, 25);
      expect(intervals).toEqual([
        { lower: 8, upper: 10, category: LOW },
        { lower: 10, upper: 20, category: MEDIUM },
        { lower: 20, upper: 25, category: HIGH },
      ]);
    });

    test("minValue < T1 < maxValue < T2", () => {
      const intervals = calculateChartIntervals(categories, [10, 20], 5, 15);
      expect(intervals).toEqual([
        { lower: 5, upper: 10, category: LOW },
        { lower: 10, upper: 20, category: MEDIUM },
        { lower: 20, upper: 22, category: HIGH },
      ]);
    });

    test("T1 < minValue < maxValue < T2", () => {
      const intervals = calculateChartIntervals(categories, [10, 20], 14, 18);
      expect(intervals).toEqual([
        { lower: 8, upper: 10, category: LOW },
        { lower: 10, upper: 20, category: MEDIUM },
        { lower: 20, upper: 22, category: HIGH },
      ]);
    });
  });

  describe("multiple thresholds (descending)", () => {
    const categories = [LOW, MEDIUM, HIGH];
    test("minValue < T1 < T2 < maxValue", () => {
      const intervals = calculateChartIntervals(categories, [20, 10], 5, 25);
      expect(intervals).toEqual([
        { lower: 20, upper: 25, category: LOW },
        { lower: 10, upper: 20, category: MEDIUM },
        { lower: 5, upper: 10, category: HIGH },
      ]);
    });

    test("T1 < minValue < T2 < maxValue ", () => {
      const intervals = calculateChartIntervals(categories, [20, 10], 15, 25);
      expect(intervals).toEqual([
        { lower: 20, upper: 25, category: LOW },
        { lower: 10, upper: 20, category: MEDIUM },
        { lower: 8, upper: 10, category: HIGH },
      ]);
    });

    test("minValue < T1 < maxValue < T2 ", () => {
      const intervals = calculateChartIntervals(categories, [20, 10], 5, 15);
      expect(intervals).toEqual([
        { lower: 20, upper: 22, category: LOW },
        { lower: 10, upper: 20, category: MEDIUM },
        { lower: 5, upper: 10, category: HIGH },
      ]);
    });

    test("T1 < minValue < maxValue < T2 ", () => {
      const intervals = calculateChartIntervals(categories, [20, 10], 14, 18);
      expect(intervals).toEqual([
        { lower: 20, upper: 22, category: LOW },
        { lower: 10, upper: 20, category: MEDIUM },
        { lower: 8, upper: 10, category: HIGH },
      ]);
    });
  });
});
