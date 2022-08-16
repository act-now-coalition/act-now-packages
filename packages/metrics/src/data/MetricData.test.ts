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
  test("assertBoolean() succeeds on boolean or null data.", () => {
    expect(buildMetricData(true).assertBoolean()).toStrictEqual(
      buildMetricData(true)
    );
    expect(buildMetricData(null).assertBoolean()).toStrictEqual(
      buildMetricData(null)
    );
  });

  test("assertBoolean() fails on non-boolean data.", () => {
    expect(() => {
      buildMetricData("not boolean").assertBoolean();
    }).toThrow();
  });

  test("convertToBoolean() succeeds on near-boolean data.", () => {
    expect(buildMetricData("yes").convertToBoolean()).toStrictEqual(
      buildMetricData(true)
    );
  });

  test("convertToBoolean() fails on non-boolean data.", () => {
    expect(() => {
      buildMetricData("not boolean").convertToBoolean();
    }).toThrow();
  });
});
