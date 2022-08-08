import { StaticValueDataProvider } from "./StaticValueDataProvider";
import { states } from "@actnowcoalition/regions";
import { Metric } from "../Metric/Metric";

describe("MultiRegionMultiMetricDataStore", () => {
  test("smoke test", async () => {
    const metric = new Metric({
      id: "cases_per_100k",
      dataReference: {
        providerId: "static-value",
        value: 42,
      },
    });
    const provider = new StaticValueDataProvider();
    const dataStore = await provider.fetchData(
      [states.findByRegionIdStrict("12")],
      [metric],
      true
    );
    dataStore.regionData(states.findByRegionIdStrict("12")).metricData(metric);
    dataStore.createSnapshot();
  });
});
