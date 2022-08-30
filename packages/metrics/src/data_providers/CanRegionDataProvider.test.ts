import { counties } from "@actnowcoalition/regions";
import { Metric } from "../Metric";
import { CanRegionDataProvider } from "./CanRegionDataProvider";

describe("CanRegionDataProvider", () => {
  test("CAN provider smoke-test", async () => {
    const metric = new Metric({
      id: "hospital-capacity",
      dataReference: {
        column: "actuals.hospitalBeds.capacity",
        providerId: "covid-act-now",
      },
    });
    const region = counties.findByRegionIdStrict("25017");
    const provider = new CanRegionDataProvider(
      "can-api-test",
      "81d0e97ecec0406abf12c80d6cd8ec93"
    );
    const metricData = await provider.fetchData([region], [metric], true);
    console.log(metricData.regionData(region).metricData(metric).currentValue);
  });
});
