import React from "react";
import { MetricOverviewProps } from "./interfaces";
import MetricOverviewRegular from "./MetricOverviewRegular";
import MetricOverviewCompact from "./MetricOverviewCompact";

const MetricOverview: React.FC<MetricOverviewProps> = ({
  size = "regular",
  ...otherProps
}) => {
  return size === "regular" ? (
    <MetricOverviewRegular {...otherProps} />
  ) : (
    <MetricOverviewCompact {...otherProps} />
  );
};

export default MetricOverview;
