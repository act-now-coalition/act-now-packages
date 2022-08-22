import { Metric } from "../Metric";
import { states } from "@actnowcoalition/regions";
import { DataRow, dataRowsToMetricData } from "./data_provider_utils";
import { fetchCsv } from "./CsvDataProvider";
import { Dictionary, groupBy } from "lodash";

const newYork = states.findByRegionIdStrict("36");
const testMetric = new Metric({
  id: "cool_metric",
  dataReference: { providerId: "csv-provider", column: "cool_metric" },
});

describe("dataRowsToMetricData()", () => {
  test("dataRowsToMetricData() fails when metric data column is missing.", async () => {
    const dataRows: Dictionary<DataRow[]> = groupBy(
      [{ date: "2022-08-01", region: "36", another_metric: 100 }],
      (row) => row.region
    );
    expect(() => {
      dataRowsToMetricData(
        dataRows,
        newYork,
        testMetric,
        /*includeTimeseries*/ true,
        "date"
      );
    }).toThrow();
    expect(() => {
      dataRowsToMetricData(
        dataRows,
        newYork,
        testMetric,
        /*includeTimeseries*/ false,
        "date"
      );
    }).toThrow();
  });

  test("dataRowsToMetricData() fails when region data is missing.", async () => {
    const dataRows: Dictionary<DataRow[]> = groupBy(
      [{ date: "2022-08-01", region: "12", cool_metric: 100 }],
      (row) => row.region
    );
    expect(() => {
      dataRowsToMetricData(
        dataRows,
        newYork,
        testMetric,
        /*includeTimeseries*/ true,
        "date"
      );
    }).toThrow();
    expect(() => {
      dataRowsToMetricData(
        dataRows,
        newYork,
        testMetric,
        /*includeTimeseries*/ false,
        "date"
      );
    }).toThrow();
  });

  test("dataRowsToMetricData() succeeds when region data is null.", async () => {
    const dataRows: Dictionary<DataRow[]> = groupBy(
      [{ date: "2022-08-01", region: "36", cool_metric: null }],
      (row) => row.region
    );
    expect(
      dataRowsToMetricData(
        dataRows,
        newYork,
        testMetric,
        /*includeTimeseries*/ true,
        "date"
      ).currentValue
    ).toBe(null);
    expect(
      dataRowsToMetricData(
        dataRows,
        newYork,
        testMetric,
        /*includeTimeseries*/ false,
        "date"
      ).currentValue
    ).toBe(null);
  });
});

describe("fetchCsv()", () => {
  const mockFetch = async (data: string) => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        text: () => Promise.resolve(data),
      } as unknown as Response)
    );
  };

  test("fetchCsv() return null when no cell data is provided", async () => {
    mockFetch(`region,date,cool_metric\n36,2022-08-02,`);
    const payload = await fetchCsv("url-placeholder");
    expect(payload[0].cool_metric).toBe(null);
  });

  test("fetchCsv() keeps strings intact", async () => {
    mockFetch(
      `region,date,cool_metric\n36,2022-08-02,a value that has spaces.`
    );
    const payload = await fetchCsv("url-placeholder");
    expect(payload[0].cool_metric).toBe("a value that has spaces.");
  });

  test("fetchCsv() parses booleans", async () => {
    const mockFetchBoolean = async (value: string | boolean) => {
      mockFetch(`region,date,cool_metric\n36,2022-08-02,${value}`);
      const payload = await fetchCsv("url-placeholder");
      return payload[0].cool_metric;
    };
    expect(await mockFetchBoolean(`"true"`)).toBe(true);
    expect(await mockFetchBoolean(true)).toBe(true);
  });
});
