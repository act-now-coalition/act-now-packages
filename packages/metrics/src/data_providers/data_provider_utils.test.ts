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

describe("dataRowsToMetricData() with timeseries", () => {
  test("dataRowsToMetricData() yields expected data.", () => {
    const dataRows: Dictionary<DataRow[]> = groupBy(
      [
        { date: "2022-08-01", region: "36", cool_metric: 100 },
        { date: "2022-07-31", region: "36", cool_metric: 90 },
      ],
      (row) => row.region
    );
    const tsData = dataRowsToMetricData(
      dataRows,
      newYork,
      testMetric,
      /*includeTimeseries=*/ true,
      "date"
    );
    const noTsData = dataRowsToMetricData(
      dataRows,
      newYork,
      testMetric,
      /*includeTimeseries=*/ false,
      "date"
    );
    expect(tsData.currentValue).toBe(100);
    expect(tsData.timeseries.last?.value).toBe(100);
    expect(tsData.timeseries.last?.date).toStrictEqual(new Date("2022-08-01"));
    expect(tsData.timeseries.first?.value).toBe(90);
    expect(tsData.timeseries.first?.date).toStrictEqual(new Date("2022-07-31"));
    expect(noTsData.currentValue).toBe(100);
    expect(noTsData.hasTimeseries()).toBe(false);
  });

  test("dataRowsToMetricData() fails when there's no data for metric.", () => {
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
        /*dateKey=*/ "date"
      );
    }).toThrow();
    expect(() => {
      dataRowsToMetricData(
        dataRows,
        newYork,
        testMetric,
        /*includeTimeseries=*/ false,
        /*dateKey=*/ "date"
      );
    }).toThrow();
  });

  test("dataRowsToMetricData() fails when there's no data for region.", () => {
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
        /*dateKey=*/ "date"
      );
    }).toThrow();
    expect(() => {
      dataRowsToMetricData(
        dataRows,
        newYork,
        testMetric,
        /*includeTimeseries=*/ false,
        /*dateKey=*/ "date"
      );
    }).toThrow();
  });

  test("dataRowsToMetricData() succeeds when metric data is null.", async () => {
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
        /*dateKey=*/ "date"
      ).currentValue
    ).toBe(null);
    expect(
      dataRowsToMetricData(
        dataRows,
        newYork,
        testMetric,
        /*includeTimeseries=*/ false,
        /*dateKey=*/ "date"
      ).currentValue
    ).toBe(null);
  });
});

describe("dataRowsToMetricData() without timeseries", () => {
  test("dataRowsToMetricData() yields expected data.", () => {
    const dataRows: Dictionary<DataRow[]> = groupBy(
      [{ region: "36", cool_metric: 100 }],
      (row) => row.region
    );
    const data = dataRowsToMetricData(
      dataRows,
      newYork,
      testMetric,
      /*includeTimeseries=*/ false
    );
    expect(data.currentValue).toBe(100);
    expect(data.hasTimeseries()).toBe(false);
  });

  test("dataRowsToMetricData() fails when there's no data for metric.", () => {
    const dataRows: Dictionary<DataRow[]> = groupBy(
      [{ region: "36", another_metric: 100 }],
      (row) => row.region
    );
    expect(() => {
      dataRowsToMetricData(
        dataRows,
        newYork,
        testMetric,
        /*includeTimeseries=*/ false
      );
    }).toThrow();
  });

  test("dataRowsToMetricData() fails when there's no data for region.", () => {
    const dataRows: Dictionary<DataRow[]> = groupBy(
      [{ region: "12", cool_metric: 100 }],
      (row) => row.region
    );
    expect(() => {
      dataRowsToMetricData(
        dataRows,
        newYork,
        testMetric,
        /*includeTimeseries=*/ false
      );
    }).toThrow();
  });

  test("dataRowsToMetricData() succeeds when metric data is null", () => {
    const dataRows: Dictionary<DataRow[]> = groupBy(
      [{ region: "36", cool_metric: null }],
      (row) => row.region
    );
    expect(
      dataRowsToMetricData(
        dataRows,
        newYork,
        testMetric,
        /*includeTimeseries=*/ false
      ).currentValue
    ).toBe(null);
  });
});

describe("fetchCsv()", () => {
  test("fetchCsv() treats missing values as null", async () => {
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
