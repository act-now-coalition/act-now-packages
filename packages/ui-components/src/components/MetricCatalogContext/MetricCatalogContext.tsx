import { MetricCatalog } from "@actnowcoalition/metrics";
import React, { createContext, useContext } from "react";

const defaultMetricCatalog = new MetricCatalog([], []);

const MetricCatalogContext = createContext<MetricCatalog>(defaultMetricCatalog);

/**
 * The `MetricCatalogProvider` component and `useMetricCatalog` hook provide
 * convenient  access to the app-level `metricCatalog` instance. It relies on
 * React context, so make sure that `MetricCatalogProvider` is a parent of
 * the component that calls `useMetricCatalog`.
 *
 * The best way to do this in Next.js applications is to wrap the page
 * component in _app.tsx.
 *
 * @example
 * ```tsx
 * // _app.tsx
 * import { metricCatalog } from "src/common/metrics"
 *
 * // ...
 * <ThemeProvider theme={theme}>
 *   <MetricCatalogProvider metricCatalog={metricCatalog}>
 *     <Component {...pageProps} />
 *   </MetricCatalog>
 * </ThemeProvider>
 * ```
 *
 * Any component that wants to use the metric catalog will usually need to have
 * one or more metrics (or metric IDs) and regions as props, and then use the
 * `useMetricCatalog` hook to fetch the data.
 *
 * @example
 * ```tsx
 * interface MetricAwareProps {
 *   region: Region;
 *   metrics: Metric[];
 * };
 *
 * const MetricAware: React.FC<MetricAwareProps> = ({ region, metrics }) => {
 *    const metricCatalog = useMetricCatalog();
 *    const { data, error } = metricCatalog.useDataForMetrics(region, metrics);
 *   // ...render component
 * ```
 *
 * @param metricCatalog The MetricCatalog instance that we want to make available.
 * @param children The component tree that we want to have access to the metric catalog.
 * @returns React.ContextProvider with the given metricCatalog
 */
export const MetricCatalogProvider: React.FC<{
  metricCatalog: MetricCatalog;
  children: React.ReactNode;
}> = ({ metricCatalog, children }) => (
  <MetricCatalogContext.Provider value={metricCatalog}>
    {children}
  </MetricCatalogContext.Provider>
);

/**
 * Hook to access the app-level MetricCatalog. See MetricCatalogProvider for
 * usage examples.
 *
 * @returns MetricCatalog instance.
 */
export function useMetricCatalog() {
  return useContext(MetricCatalogContext);
}
