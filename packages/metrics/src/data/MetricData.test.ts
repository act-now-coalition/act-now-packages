import { states } from "@actnowcoalition/regions";
import { Metric } from "../Metric";
import { Timeseries } from "../Timeseries";
import { MetricData } from "./MetricData";

const testRegion = states.findByRegionIdStrict("36");
const testMetric = new Metric({ id: "boolean_metric" });
const buildMetricData = (value: unknown) => {
  return new MetricData(
    testMetric,
    testRegion,
    value,
    Timeseries.fromJSON([{ date: "2022-08-01", value: value }])
  );
};

describe("MetricData", () => {
  test("assertStrings() succeeds on string or null data.", () => {
    expect(buildMetricData("string value").assertStrings()).toStrictEqual(
      buildMetricData("string value")
    );
    expect(buildMetricData(null).assertStrings()).toStrictEqual(
      buildMetricData(null)
    );
  });

  test("assertStrings() fails on non-string data.", () => {
    const notStrings = [
      undefined,
      true,
      { key: "value" },
      ["item"],
      Number.NaN,
    ];
    for (const value of notStrings) {
      expect(() => {
        buildMetricData(value).assertStrings();
      }).toThrow();
    }
  });

  test("convertToString() succeeds on valid data.", () => {
    expect(buildMetricData(12).convertToString()).toStrictEqual(
      buildMetricData("12")
    );
    expect(buildMetricData(undefined).convertToString()).toStrictEqual(
      buildMetricData("undefined")
    );
  });

  test("convertToString() succeeds on null data.", () => {
    expect(buildMetricData(null).convertToString()).toStrictEqual(
      buildMetricData(null)
    );
  });
});
