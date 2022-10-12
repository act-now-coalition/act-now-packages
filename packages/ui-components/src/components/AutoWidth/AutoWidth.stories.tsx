import React from "react";
import { Grid } from "@mui/material";
import { states } from "@actnowcoalition/regions";
import { ComponentMeta } from "@storybook/react";
import { MetricId } from "../../stories/mockMetricCatalog";
import { MetricSparklines } from "../MetricSparklines";
import { AutoWidth } from ".";

export default {
  title: "Components/AutoWidth",
  component: AutoWidth,
} as ComponentMeta<typeof AutoWidth>;

const Chart = ({ width, color }: { width?: number; color: string }) => (
  <div
    style={{
      width,
      height: 60,
      backgroundColor: color,
      display: "grid",
      placeItems: "center",
    }}
  >
    <div>{`width = ${width}px`}</div>
  </div>
);

export const DefaultExample = () => (
  <div style={{ width: 450, border: "solid 1px black" }}>
    <AutoWidth>
      <Chart color="#fff9c4" />
    </AutoWidth>
  </div>
);

export const ExampleSized = () => (
  <div style={{ width: 450, border: "solid 1px black" }}>
    <AutoWidth>
      <Chart color="#fff9c4" width={120} />
    </AutoWidth>
  </div>
);

export const ExampleGrid = () => (
  <Grid container spacing={2}>
    <Grid item xs={4}></Grid>
    <Grid item xs={4}></Grid>
    <Grid item xs>
      <AutoWidth>
        <Chart color="#ffecb3" />
      </AutoWidth>
    </Grid>
  </Grid>
);

const region = states.findByRegionIdStrict("12");

export const ExampleSparklines = () => (
  <Grid container spacing={2}>
    <Grid item xs={4}>
      <AutoWidth>
        <MetricSparklines
          height={90}
          region={region}
          metricBarChart={MetricId.MOCK_CASES}
          metricLineChart={MetricId.MOCK_CASES}
          numDays={30}
        />
      </AutoWidth>
    </Grid>
    <Grid item xs={4}>
      <AutoWidth>
        <MetricSparklines
          height={90}
          region={region}
          metricBarChart={MetricId.MOCK_CASES}
          metricLineChart={MetricId.MOCK_CASES}
          numDays={30}
        />
      </AutoWidth>
    </Grid>
    <Grid item xs>
      <AutoWidth>
        <MetricSparklines
          height={90}
          region={region}
          metricBarChart={MetricId.MOCK_CASES}
          metricLineChart={MetricId.MOCK_CASES}
          numDays={30}
        />
      </AutoWidth>
    </Grid>
  </Grid>
);
