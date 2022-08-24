import React from "react";
import MetricOverviewRegular, {
  MetricOverviewRegularProps,
} from "./MetricOverviewRegular";
import MetricOverviewCompact, {
  MetricOverviewCompactProps,
} from "./MetricOverviewCompact";

export type MetricOverviewProps =
  | MetricOverviewRegularProps
  | MetricOverviewCompactProps;

const MetricOverview: React.FC<MetricOverviewProps> = (props) => {
  return props.size === "regular" ? (
    <MetricOverviewRegular {...props} />
  ) : (
    <MetricOverviewCompact {...props} />
  );
};

export default MetricOverview;
