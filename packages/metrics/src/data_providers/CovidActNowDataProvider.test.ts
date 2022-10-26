import { counties, nations, metros, states } from "@actnowcoalition/regions";
import { MetricCatalog } from "../MetricCatalog";
import { CovidActNowDataProvider } from "./CovidActNowDataProvider";

const testCounty = counties.findByRegionIdStrict("25017"); // Middlesex County, MA.
const testNation = nations.findByRegionIdStrict("USA"); // USA.
const testState = states.findByRegionIdStrict("25"); // Massachusetts.
const testMetro = metros.findByRegionIdStrict("10420"); // Akron, OH.

const PROVIDER_ID = "covid-act-now-api";

enum MetricId {
  HOSPITAL_BEDS = "Current Hospital Bed Capacity",
  POPULATION = "Population",
  WEEKLY_ADMISSIONS = "Weekly Admissions per 100k",
}

const testMetrics = [
  {
    id: MetricId.HOSPITAL_BEDS,
    dataReference: {
      providerId: PROVIDER_ID,
      column: "actuals.hospitalBeds.capacity",
    },
  },
  {
    id: MetricId.POPULATION,
    dataReference: {
      providerId: PROVIDER_ID,
      column: "population",
    },
  },
  {
    id: MetricId.WEEKLY_ADMISSIONS,
    dataReference: {
      providerId: PROVIDER_ID,
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

const testCacheData = {
  "25017-true": testApiResponse,
  "25-true": testApiResponse,
  "10420-true": testApiResponse,
  "USA-true": testApiResponse,
  "25017-false": testApiResponse,
  "25-false": testApiResponse,
  "10420-false": testApiResponse,
  "USA-false": testApiResponse,
};

const dataProviders = [
  new CovidActNowDataProvider(
    PROVIDER_ID,
    /*apiKey=*/ "placeholder", // These tests won't need to make any actual network calls.
    testCacheData
  ),
];
const catalog = new MetricCatalog(testMetrics, dataProviders);

describe("CovidActNowDataProvider", () => {
  test("fetches data without timeseries", async () => {
    const data = await catalog.fetchDataForRegionsAndMetrics(
      [testCounty, testNation, testState, testMetro],
      [MetricId.HOSPITAL_BEDS, MetricId.WEEKLY_ADMISSIONS, MetricId.POPULATION],
      /*includeTimeseries=*/ false
    );

    for (const region of [testCounty, testNation, testState, testMetro]) {
      const d = data.regionData(region);
      expect(d.metricData(MetricId.HOSPITAL_BEDS).currentValue).toBe(100);
      expect(d.metricData(MetricId.HOSPITAL_BEDS).hasTimeseries()).toBe(false);
      expect(d.metricData(MetricId.WEEKLY_ADMISSIONS).currentValue).toBe(10);
      expect(d.metricData(MetricId.WEEKLY_ADMISSIONS).hasTimeseries()).toBe(
        false
      );
      expect(d.metricData(MetricId.POPULATION).currentValue).toBe(200);
    }
  });

  test("fetches data with timeseries", async () => {
    const data = await catalog.fetchDataForRegionsAndMetrics(
      [testCounty, testNation, testState, testMetro],
      [MetricId.HOSPITAL_BEDS, MetricId.WEEKLY_ADMISSIONS],
      /*includeTimeseries=*/ true
    );

    for (const region of [testCounty, testNation, testState, testMetro]) {
      const d = data.regionData(region);
      expect(d.metricData(MetricId.HOSPITAL_BEDS).currentValue).toBe(100);
      expect(d.metricData(MetricId.HOSPITAL_BEDS).timeseries.firstValue).toBe(
        100
      );
      expect(d.metricData(MetricId.WEEKLY_ADMISSIONS).currentValue).toBe(10);
      expect(
        d.metricData(MetricId.WEEKLY_ADMISSIONS).timeseries.firstValue
      ).toBe(10);
    }
  });
});
