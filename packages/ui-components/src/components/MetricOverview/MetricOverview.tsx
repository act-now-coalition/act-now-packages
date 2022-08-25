import React from "react";
import MetricOverviewRegular, {
  MetricOverviewRegularProps,
} from "./MetricOverviewRegular";
import MetricOverviewCompact, {
  MetricOverviewCompactProps,
} from "./MetricOverviewCompact";

export type MetricOverviewProps<T> =
  | MetricOverviewRegularProps<T>
  | MetricOverviewCompactProps<T>;

const MetricOverview = <T,>(props: MetricOverviewProps<T>) => {
  return props.size === "regular" ? (
    <MetricOverviewRegular {...props} />
  ) : (
    <MetricOverviewCompact {...props} />
  );
};

export default MetricOverview;
