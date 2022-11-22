import { Metric } from "../Metric";
import { states } from "@actnowcoalition/regions";
import {
  DataRow,
  dataRowsToMetricData,
  dataRowToMetricData,
  generateCsv,
  parseCsv,
} from "./data_provider_utils";
import groupBy from "lodash/groupBy";
// eslint-disable-next-line lodash/import-scope
import { Dictionary } from "lodash";

const newYork = states.findByRegionIdStrict("36");
const testMetric = new Metric({
  id: "cool_metric",
  dataReference: { providerId: "csv-provider", column: "cool_metric" },
});

describe("dataRowsToMetricData()", () => {
  test("dataRowsToMetricData() yields expected data.", () => {
    const column = testMetric.dataReference?.column as string;
    const dataRows: Dictionary<DataRow[]> = groupBy(
      [
        { date: "2022-08-01", region: "36", cool_metric: 100 },
        { date: "2022-07-31", region: "36", cool_metric: 90 },
        { date: "2022-07-30", region: "36" }, // Ensure that missing data is handled correctly when strict === false.
      ],
      (row) => row.region
    );
    const data = dataRowsToMetricData(
      dataRows,
      newYork,
      testMetric,
      column,
      "date"
    );
    expect(data.currentValue).toBe(100);
    expect(data.timeseries.length).toBe(2);
    expect(data.timeseries.lastValue).toBe(100);
    expect(data.timeseries.maxDate).toStrictEqual(new Date("2022-08-01"));
    expect(data.timeseries.firstValue).toBe(90);
    expect(data.timeseries.minDate).toStrictEqual(new Date("2022-07-31"));
  });

  test("dataRowsToMetricData() fails when there's no data for metric and strict === true.", () => {
    const column = testMetric.dataReference?.column as string;
    const dataRows: Dictionary<DataRow[]> = groupBy(
      [{ date: "2022-08-01", region: "36", another_metric: 100 }],
      (row) => row.region
    );
    expect(() => {
      dataRowsToMetricData(
        dataRows,
        newYork,
        testMetric,
        column,
        /*dateKey=*/ "date",
        /*strict=*/ true
      );
    }).toThrow();
  });

  test("dataRowsToMetricData() returns null data when there's no data for region.", () => {
    const column = testMetric.dataReference?.column as string;
    const dataRows: Dictionary<DataRow[]> = groupBy(
      [{ date: "2022-08-01", region: "12", cool_metric: 100 }],
      (row) => row.region
    );
    const data = dataRowsToMetricData(
      dataRows,
      newYork,
      testMetric,
      column,
      /*dateKey=*/ "date"
    );
    expect(data.currentValue).toBe(null);
  });

  test("dataRowsToMetricData() succeeds when metric data is null.", async () => {
    const column = testMetric.dataReference?.column as string;
    const dataRows: Dictionary<DataRow[]> = groupBy(
      [{ date: "2022-08-01", region: "36", cool_metric: null }],
      (row) => row.region
    );
    expect(
      dataRowsToMetricData(
        dataRows,
        newYork,
        testMetric,
        column,
        /*dateKey=*/ "date"
      ).currentValue
    ).toBe(null);
  });
});

describe("dataRowToMetricData()", () => {
  test("dataRowToMetricData() yields expected data.", () => {
    const column = testMetric.dataReference?.column as string;
    const dataRows: Dictionary<DataRow[]> = groupBy(
      [{ region: "36", cool_metric: 100 }],
      (row) => row.region
    );
    const data = dataRowToMetricData(dataRows, newYork, testMetric, column);
    expect(data.currentValue).toBe(100);
    expect(data.hasTimeseries()).toBe(false);
  });

  test("dataRowToMetricData() fails when there's no data for metric.", () => {
    const column = testMetric.dataReference?.column as string;
    const dataRows: Dictionary<DataRow[]> = groupBy(
      [{ region: "36", another_metric: 100 }],
      (row) => row.region
    );
    expect(() => {
      dataRowToMetricData(dataRows, newYork, testMetric, column);
    }).toThrow();
  });

  test("dataRowToMetricData() returns null data when there's no data for region.", () => {
    const column = testMetric.dataReference?.column as string;
    const dataRows: Dictionary<DataRow[]> = groupBy(
      [{ region: "12", cool_metric: 100 }],
      (row) => row.region
    );
    const data = dataRowToMetricData(dataRows, newYork, testMetric, column);
    expect(data.currentValue).toBe(null);
  });

  test("dataRowToMetricData() succeeds when metric data is null", () => {
    const column = testMetric.dataReference?.column as string;
    const dataRows: Dictionary<DataRow[]> = groupBy(
      [{ region: "36", cool_metric: null }],
      (row) => row.region
    );
    expect(
      dataRowToMetricData(dataRows, newYork, testMetric, column).currentValue
    ).toBe(null);
  });
});

describe("parseCsv() and generateCsv()", () => {
  const testCsv = `col1,col2,"col""with""quotes"
text,"text,with,comma","text""with""quotes"
0,2,-2
true,false,`;

  const parsedCsv = [
    {
      col1: "text",
      col2: "text,with,comma",
      'col"with"quotes': 'text"with"quotes',
    },
    {
      col1: 0,
      col2: 2,
      'col"with"quotes': -2,
    },
    {
      col1: "true",
      col2: "false",
      'col"with"quotes': null,
    },
  ];

  test("parseCsv() parses CSV file", () => {
    expect(parseCsv(testCsv)).toStrictEqual(parsedCsv);
  });

  test("parseCsv() treats specified string columns as 'raw'", () => {
    const colsToKeepRaw = ["col2"];
    const expected = [
      parsedCsv[0],
      // "2" won't be parsed as a number because we're specifying for it to be
      // kept as a raw string.
      { ...parsedCsv[1], col2: "2" },
      parsedCsv[2],
    ];
    expect(parseCsv(testCsv, colsToKeepRaw)).toStrictEqual(expected);
  });

  test("generateCsv() generates CSV file", () => {
    expect(generateCsv(parsedCsv)).toStrictEqual(testCsv);
  });
});
