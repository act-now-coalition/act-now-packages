import { CsvDataProvider } from "./CsvDataProvider";
import { Metric } from "../Metric";
import { Region, states } from "@actnowcoalition/regions";
import { formatUTCDateTime, DateFormat } from "@actnowcoalition/time-utils";

const MOCK_DATA = `region,cool_metric\n36,150\n12,`;
const MOCK_TIMESERIES = `region,date,cool_metric\n36,2022-08-02,150\n12,2022-08-02,`;
const NEW_YORK = states.findByRegionIdStrict("36");
const FLORIDA = states.findByRegionIdStrict("12");
const TEST_METRIC = new Metric({ id: "cool_metric" });
const TODAY_ISO_DATE = formatUTCDateTime(new Date(), DateFormat.YYYY_MM_DD);

describe("CsvDataProvider", () => {
  test("fetchData() returns expected data.", async () => {
    const mockFetch = async (
      data: string,
      includeTimeseries: boolean,
      dateCol?: string,
      region: Region = NEW_YORK
    ) => {
      global.fetch = jest.fn(() =>
        Promise.resolve({
          text: () => Promise.resolve(data),
        } as unknown as Response)
      );
      const provider = new CsvDataProvider({
        url: "url-placeholder",
        regionColumn: "region",
        dateColumn: dateCol,
      });
      return (
        await provider.fetchData([region], [TEST_METRIC], includeTimeseries)
      )
        .regionData(region)
        .metricData(TEST_METRIC);
    };

    expect(
      (await mockFetch(MOCK_DATA, /*includeTimeseries=*/ false)).currentValue
    ).toBe(150);
    expect(
      (await mockFetch(MOCK_DATA, /*includeTimeseries=*/ false)).hasTimeseries()
    ).toBe(false);
    expect(
      (
        await mockFetch(
          MOCK_DATA,
          /*includeTimeseries=*/ false,
          undefined,
          FLORIDA
        )
      ).currentValue
    ).toBe(null);
    expect(
      (
        await mockFetch(MOCK_DATA, /*includeTimeseries=*/ true)
      ).timeseries.toJSON()
    ).toStrictEqual([{ date: TODAY_ISO_DATE, value: 150 }]);
    expect(
      (
        await mockFetch(
          MOCK_DATA,
          /*includeTimeseries=*/ true,
          undefined,
          FLORIDA
        )
      ).timeseries
        .removeNils()
        .hasData()
    ).toBe(false);
    expect(
      (
        await mockFetch(MOCK_TIMESERIES, /*includeTimeseries=*/ false, "date")
      ).hasTimeseries()
    ).toBe(false);
    expect(
      (await mockFetch(MOCK_TIMESERIES, /*includeTimeseries=*/ false, "date"))
        .currentValue
    ).toBe(150);
    expect(
      (
        await mockFetch(
          MOCK_TIMESERIES,
          /*includeTimeseries=*/ false,
          undefined,
          FLORIDA
        )
      ).currentValue
    ).toBe(null);
    expect(
      (
        await mockFetch(MOCK_TIMESERIES, /*includeTimeseries=*/ true, "date")
      ).timeseries.toJSON()
    ).toStrictEqual([{ date: "2022-08-02", value: 150 }]);
    expect(
      (
        await mockFetch(
          MOCK_TIMESERIES,
          /*includeTimeseries=*/ true,
          "date",
          FLORIDA
        )
      ).timeseries
        .removeNils()
        .hasData()
    ).toBe(false);
  });
});
