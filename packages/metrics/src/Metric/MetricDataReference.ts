/**
 * References where the data for a particular metric can be retrieved from.
 *
 * When adding a new source for metric data you will implement a {@link
 * MetricDataProvider} that can do the actual fetching of data and then when you
 * define your metrics you'll create `MetricDataReference`s that reference that
 * provider and identify the specific data being referenced (e.g. a csv column
 * or API path).
 *
 * TODO: Example.
 */
export interface MetricDataReference {
  /**
   * The id of a registered {@link MetricDataProvider} that will be used to
   * fetch data for this metric (e.g. "main-metrics-csv" or "city-data-api").
   */
  providerId: string;

  /**
   * Arbitrary additional properties that identify the specific data being
   * referenced (e.g. a csv column or API path). The {@link MetricDataProvider}
   * registered to handle this `dataProviderId` must know how to handle these
   * properties.
   */
  [key: string]: unknown;
}
