import { counties } from "@actnowcoalition/regions";
import { Metric } from "../Metric";
import { CanRegionDataProvider } from "./CanRegionDataProvider";

describe("CanRegionDataProvider", () => {
  test("fromApiUrl", async () => {
    const metric = new Metric({
      id: "hospital-capacity",
      dataReference: {
        column: "actuals.hospitalBeds.capacity",
        providerId: "covid-act-now",
      },
    });
    const region = counties.findByRegionIdStrict("25017");
    const provider = new CanRegionDataProvider({
      providerId: "middlesex-county-ma-can",
      url: "https://api.covidactnow.org/v2/county/25017.timeseries.json?apiKey=81d0e97ecec0406abf12c80d6cd8ec93",
      region: region,
    });
    const metricData = await provider.fetchData([region], [metric], true);
    metricData.regionData(region).metricData(metric).timeseries.removeNils()
      .last;
  });
});
