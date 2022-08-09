import { StaticValueDataProvider } from "./StaticValueDataProvider";
import { states } from "@actnowcoalition/regions";
import { Metric } from "../Metric/Metric";
import { MultiRegionMultiMetricDataStore } from "./MultiRegionMultiMetricDataStore";

describe("MultiRegionMultiMetricDataStore", () => {
  const region = states.findByRegionIdStrict("12");
  const metric = new Metric({
    id: "cases_per_100k",
    dataReference: {
      providerId: "static-value",
      value: 42,
    },
  });
  const provider = new StaticValueDataProvider();

  test("toSnapshot() and fromSnapshot() have correct forms.", async () => {
    const dataStore = await provider.fetchData(
      [region],
      [metric],
      /*useSnapshot=*/ true
    );
    const expectedSnapshot = {
      metadata: {
        createdDate: new Date().toISOString().split("T")[0],
        latestDate: "2022-01-02T00:00:00.000Z",
      },
      data: {
        "12": {
          cases_per_100k: {
            currentValue: 42,
            timeseriesPoints: [
              {
                date: "2022-01-02",
                value: 42,
              },
            ],
          },
        },
      },
    };
    expect(
      MultiRegionMultiMetricDataStore.fromSnapshot(
        expectedSnapshot,
        [region],
        [metric]
      )
    ).toEqual(dataStore);
    expect(dataStore.toSnapshot()).toEqual(expectedSnapshot);
  });
});
