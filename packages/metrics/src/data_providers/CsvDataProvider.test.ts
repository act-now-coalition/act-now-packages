import { CsvDataProvider } from "./CsvDataProvider";
import { Metric } from "../Metric";
import { states } from "@actnowcoalition/regions";
import { MultiRegionMultiMetricDataStore } from "../data/MultiRegionMultiMetricDataStore";

const MOCK_DATA =
  "region,cool_metric,cooler-metric\n36,150,a string value\n12, 200, another string";
const MOCK_DATA_TIMESERIES = `region,date,cool_metric,cooler-metric
36,2022-08-01,100,a string value
36,2022-08-02,150,a string value
12,2022-08-01,200,another string
12,2022-08-02,200,another string`;

const TEST_REGION = states.findByRegionIdStrict("36");
const TEST_METRIC = new Metric({
  id: "cool_metric",
});

describe("CsvDataProvider", () => {
  test("smoke test", () => {
    const smokeTestProvider = async (
      data: string,
      includeTimeseries: boolean,
      dateCol?: string
    ) => {
      global.fetch = jest.fn(() =>
        Promise.resolve({
          text: () => Promise.resolve(data),
        } as unknown as Response)
      );
      const provider = new CsvDataProvider(
        "url-placeholder",
        "region",
        dateCol
      );
      const expectedDataStore = MultiRegionMultiMetricDataStore.fromSnapshot(
        {
          metadata: {
            createdDate: "2022-08-15",
            latestDate: "2022-08-02T00:00:00.000Z",
          },
          data: {
            "36": {
              cool_metric: {
                currentValue: 150,
                timeseriesPoints: [
                  {
                    date: "2022-08-01",
                    value: 100,
                  },
                  {
                    date: "2022-08-02",
                    value: 150,
                  },
                ],
              },
            },
          },
        },
        [TEST_REGION],
        [TEST_METRIC],
        includeTimeseries
      );
      expect(
        await provider.fetchData(
          [TEST_REGION],
          [TEST_METRIC],
          includeTimeseries
        )
      ).toStrictEqual(expectedDataStore);
    };

    smokeTestProvider(MOCK_DATA, false);
    smokeTestProvider(MOCK_DATA_TIMESERIES, true, "date");
  });
});
