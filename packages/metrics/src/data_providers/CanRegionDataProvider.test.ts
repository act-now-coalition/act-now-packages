import { counties, nations, metros, states } from "@actnowcoalition/regions";
import { MetricCatalog } from "../MetricCatalog";
import { CanRegionDataProvider } from "./CanRegionDataProvider";

const testCounty = counties.findByRegionIdStrict("25017"); // Middlesex County, MA.
const testNation = nations.findByRegionIdStrict("USA"); // USA.
const testState = states.findByRegionIdStrict("25"); // Massachusetts.
const testMetro = metros.findByRegionIdStrict("10420"); // Akron, OH.

enum MetricId {
  HOSPITAL_BEDS = "Current Hospital Bed Capacity",
  POPULATION = "Population",
  WEEKLY_ADMISSIONS = "Weekly Admissions per 100k",
}

const testMetrics = [
  {
    id: MetricId.HOSPITAL_BEDS,
    dataReference: {
      providerId: "can-region",
      column: "actuals.hospitalBeds.capacity",
    },
  },
  {
    id: MetricId.POPULATION,
    dataReference: {
      providerId: "can-region",
      column: "population",
    },
  },
  {
    id: MetricId.WEEKLY_ADMISSIONS,
    dataReference: {
      providerId: "can-region",
      column: "metrics.weeklyCovidAdmissionsPer100k",
    },
  },
];

const testApiResponse = {
  population: 200,
  actuals: { hospitalBeds: { capacity: 100 } },
  actualsTimeseries: [{ date: "2022-08-01", hospitalBeds: { capacity: 100 } }],
  metrics: { weeklyCovidAdmissionsPer100k: 10 },
  metricsTimeseries: [{ date: "2022-08-01", weeklyCovidAdmissionsPer100k: 10 }],
};
const testData = {
  "25017": testApiResponse,
  "25": testApiResponse,
  "10420": testApiResponse,
  USA: testApiResponse,
};

const dataProviders = [
  new CanRegionDataProvider(
    /*providerId=*/ "can-region",
    /*apiKey=*/ undefined,
    testData
  ),
];
const catalog = new MetricCatalog(testMetrics, dataProviders);

describe("CanRegionDataProvider", () => {
  test("fetches data without timeseries", async () => {
    const data = await catalog.fetchDataForMetricsAndRegions(
      [testCounty, testNation, testState, testMetro],
      [MetricId.HOSPITAL_BEDS, MetricId.WEEKLY_ADMISSIONS, MetricId.POPULATION],
      /*includeTimeseries=*/ false
    );
    const countyData = data.regionData(testCounty);
    const nationData = data.regionData(testNation);
    const stateData = data.regionData(testState);
    const metroData = data.regionData(testMetro);

    for (const data of [countyData, nationData, stateData, metroData]) {
      expect(data.metricData(MetricId.HOSPITAL_BEDS).currentValue).toBe(100);
      expect(data.metricData(MetricId.HOSPITAL_BEDS).hasTimeseries()).toBe(
        false
      );
      expect(data.metricData(MetricId.WEEKLY_ADMISSIONS).currentValue).toBe(10);
      expect(data.metricData(MetricId.WEEKLY_ADMISSIONS).hasTimeseries()).toBe(
        false
      );
      expect(data.metricData(MetricId.POPULATION).currentValue).toBe(200);
    }
  });

  test("fetches data with timeseries", async () => {
    const data = await catalog.fetchDataForMetricsAndRegions(
      [testCounty, testNation, testState, testMetro],
      [MetricId.HOSPITAL_BEDS, MetricId.WEEKLY_ADMISSIONS],
      /*includeTimeseries=*/ true
    );
    const countyData = data.regionData(testCounty);
    const nationData = data.regionData(testNation);
    const stateData = data.regionData(testState);
    const metroData = data.regionData(testMetro);

    for (const data of [countyData, nationData, stateData, metroData]) {
      expect(data.metricData(MetricId.HOSPITAL_BEDS).currentValue).toBe(100);
      expect(
        data.metricData(MetricId.HOSPITAL_BEDS).timeseries.first?.value
      ).toBe(100);
      expect(data.metricData(MetricId.WEEKLY_ADMISSIONS).currentValue).toBe(10);
      expect(
        data.metricData(MetricId.WEEKLY_ADMISSIONS).timeseries.first?.value
      ).toBe(10);
    }
  });

  test("fetch fails if includeTimeseries is specified for a metric that has no timeseries data.", async () => {
    expect(async () => {
      await catalog.fetchDataForMetricsAndRegions(
        [testCounty, testNation, testState, testMetro],
        [MetricId.POPULATION],
        /*includeTimeseries=*/ true
      );
    }).rejects.toThrow();
  });
});
