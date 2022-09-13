import { generateRanges } from "./utils";

describe("generateRanges", () => {
  const levelLow = { id: "low", color: "green" };
  const levelMedium = { id: "medium", color: "yellow" };
  const levelHigh = { id: "high", color: "red" };

  test("returns the correct levels for one threshold", () => {
    const ranges = generateRanges([10], 0, 20, [levelLow, levelHigh]);
    expect(ranges).toEqual([
      { fromValue: 0, toValue: 10, level: levelLow },
      { fromValue: 10, toValue: 20, level: levelHigh },
    ]);
  });

  test("returns the correct levels for ascending thresholds", () => {
    const ranges = generateRanges([10, 20], 0, 40, [
      levelLow,
      levelMedium,
      levelHigh,
    ]);
    expect(ranges).toEqual([
      { fromValue: 0, toValue: 10, level: levelLow },
      { fromValue: 10, toValue: 20, level: levelMedium },
      { fromValue: 20, toValue: 40, level: levelHigh },
    ]);
  });

  test("returns the correct levels for descending thresholds", () => {
    const ranges = generateRanges([20, 10], 0, 40, [
      levelHigh,
      levelMedium,
      levelLow,
    ]);
    expect(ranges).toEqual([
      { fromValue: 40, toValue: 20, level: levelHigh },
      { fromValue: 20, toValue: 10, level: levelMedium },
      { fromValue: 10, toValue: 0, level: levelLow },
    ]);
  });
});
