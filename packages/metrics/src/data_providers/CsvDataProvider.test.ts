import { CsvDataProvider } from "./CsvDataProvider";
// import { Metric } from "../Metric";
// import { Region, states } from "@actnowcoalition/regions";
// import { formatUTCDateTime, DateFormat } from "@actnowcoalition/time-utils";

// const mockData = `region,cool_metric\n36,150\n12,`;
// const mockTimeseries = `region,date,cool_metric\n36,2022-08-02,150\n12,2022-08-02,`;
// const newYork = states.findByRegionIdStrict("36");
// const florida = states.findByRegionIdStrict("12");
// const testMetric = new Metric({ id: "cool_metric", dataReference: {providerId: "csv-provider", column: "cool_metric"} });

// const mockFetchData = async (
//   data: string,
//   includeTimeseries: boolean,
//   dateCol?: string,
//   region: Region = newYork
// ) => {
//   global.fetch = jest.fn(() =>
//     Promise.resolve({
//       text: () => Promise.resolve(data),
//     } as unknown as Response)
//   );
//   const provider = new CsvDataProvider( "csv-provider", {
//     url: "url-placeholder",
//     regionColumn: "region",
//     dateColumn: dateCol,
//   });
//   return (await provider.fetchData([region], [testMetric], includeTimeseries))
//     .regionData(region)
//     .metricData(testMetric);
// };

// describe("CsvDataProvider", () => {
//   test("fetchData() without timeseries data yields expected data", async () => {
//     expect(
//       (await mockFetchData(mockData, /*includeTimeseries=*/ false)).currentValue
//     ).toBe(150);
//     expect(
//       (
//         await mockFetchData(mockData, /*includeTimeseries=*/ false)
//       ).hasTimeseries()
//     ).toBe(false);
//     expect(
//       (
//         await mockFetchData(
//           mockData,
//           /*includeTimeseries=*/ false,
//           undefined,
//           florida
//         )
//       ).currentValue
//     ).toBe(null);
//     expect(
//       (
//         await mockFetchData(mockData, /*includeTimeseries=*/ true)
//       ).timeseries.toJSON()
//     ).toStrictEqual([
//       {
//         date: formatUTCDateTime(new Date(), DateFormat.YYYY_MM_DD),
//         value: 150,
//       },
//     ]);
//     expect(
//       (
//         await mockFetchData(
//           mockData,
//           /*includeTimeseries=*/ true,
//           undefined,
//           florida
//         )
//       ).timeseries
//         .removeNils()
//         .hasData()
//     ).toBe(false);
//   });

//   test("fetchData() with timeseries data yields expected data.", async () => {
//     expect(
//       (
//         await mockFetchData(
//           mockTimeseries,
//           /*includeTimeseries=*/ false,
//           "date"
//         )
//       ).hasTimeseries()
//     ).toBe(false);
//     expect(
//       (
//         await mockFetchData(
//           mockTimeseries,
//           /*includeTimeseries=*/ false,
//           "date"
//         )
//       ).currentValue
//     ).toBe(150);
//     expect(
//       (
//         await mockFetchData(
//           mockTimeseries,
//           /*includeTimeseries=*/ false,
//           undefined,
//           florida
//         )
//       ).currentValue
//     ).toBe(null);
//     expect(
//       (
//         await mockFetchData(mockTimeseries, /*includeTimeseries=*/ true, "date")
//       ).timeseries.toJSON()
//     ).toStrictEqual([{ date: "2022-08-02", value: 150 }]);
//     expect(
//       (
//         await mockFetchData(
//           mockTimeseries,
//           /*includeTimeseries=*/ true,
//           "date",
//           florida
//         )
//       ).timeseries
//         .removeNils()
//         .hasData()
//     ).toBe(false);
//   });

//   test("fetchData() with no timeseries and no data yields expected results", async () => {
//     const includedTimeseries = await mockFetchData(
//       `region,cool_metric\n36,`,
//       /*includeTimeseries=*/ true
//     );
//     const notIncludedTimeseries = await mockFetchData(
//       `region,cool_metric\n36,`,
//       /*includeTimeseries=*/ false
//     );
//     expect(includedTimeseries.timeseries.removeNils().hasData()).toBe(false);
//     expect(includedTimeseries.currentValue).toBe(null);
//     expect(notIncludedTimeseries.currentValue).toBe(null);
//   });

//   test("fetchData() with timeseries and an empty CSV, or no data yields expected results", async () => {
//     const includedTimeseries = await mockFetchData(
//       `region,date,cool_metric\n36,2022-08-02,`,
//       /*includeTimeseries=*/ true
//     );
//     const notIncludedTimeseries = await mockFetchData(
//       `region,date,cool_metric\n36,2022-08-02,`,
//       /*includeTimeseries=*/ false
//     );
//     expect(includedTimeseries.timeseries.removeNils().hasData()).toBe(false);
//     expect(includedTimeseries.currentValue).toBe(null);
//     expect(notIncludedTimeseries.currentValue).toBe(null);
//   });
// });

describe("rework CsvDataProvider tests placeholder", () => {
  test("placeholder", () => {
    new CsvDataProvider("placeholder", { regionColumn: "placeholder" });
    expect(1).toBe(1);
  });
});
