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
        /*includeTimeseries=*/ true,
        "date"
      );
    }).toThrow();
    expect(() => {
      dataRowsToMetricData(
        dataRows,
        newYork,
        testMetric,
        /*includeTimeseries=*/ false,
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
        /*includeTimeseries=*/ true,
        "date"
      );
    }).toThrow();
    expect(() => {
      dataRowsToMetricData(
        dataRows,
        newYork,
        testMetric,
        /*includeTimeseries=*/ false,
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
        /*includeTimeseries=*/ true,
        "date"
      ).currentValue
    ).toBe(null);
    expect(
      dataRowsToMetricData(
        dataRows,
        newYork,
        testMetric,
        /*includeTimeseries=*/ false,
        "date"
      ).currentValue
    ).toBe(null);
  });
});

describe("fetchCsv()", () => {
  test("fetchCsv() return null when no cell data is provided", async () => {
    const csv = `region,date,cool_metric
    36,2022-08-02,`;
    const payload = await fetchCsv(/*url=*/ undefined, /*csvData=*/ csv);
    expect(payload[0].cool_metric).toBe(null);
  });

  test("fetchCsv() handles CSV values with strings.", async () => {
    const csv = `region,date,cool_metric
    36,2022-08-02,a value that has spaces.`;
    const payload = await fetchCsv(/*url=*/ undefined, /*csvData=*/ csv);
    expect(payload[0].cool_metric).toBe("a value that has spaces.");
  });

  test("fetchCsv() parses booleans", async () => {
    const fetchBoolean = async (value: string | boolean) => {
      const csv = `region,date,cool_metric
      36,2022-08-02,${value}`;
      const payload = await fetchCsv(/*url=*/ undefined, /*csvData=*/ csv);
      return payload[0].cool_metric;
    };
    expect(await fetchBoolean(`"true"`)).toBe(true);
    expect(await fetchBoolean(true)).toBe(true);
  });

  test("fetchCsv() fails if neither url or csvData are provided.", () => {
    expect(async () => {
      await fetchCsv(/*url=*/ undefined, /*csvData=*/ undefined);
    }).rejects.toThrow();
  });
});
