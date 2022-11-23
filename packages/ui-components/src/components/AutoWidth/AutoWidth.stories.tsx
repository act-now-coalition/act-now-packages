import { Box, Grid, colors } from "@mui/material";

import { AutoWidth } from "./";
import { ComponentMeta } from "@storybook/react";
import { MetricId } from "../../stories/mockMetricCatalog";
import { MetricSparklines } from "../MetricSparklines";
import React from "react";
import { states } from "@actnowcoalition/regions";
import { styled } from "../../styles";

export default {
  title: "Components/AutoWidth",
  component: AutoWidth,
} as ComponentMeta<typeof AutoWidth>;

const height = 60;
const chartColor = colors.purple[100];
const borderColor = colors.blue[700];

const StyledGridItem = styled(Grid)`
  border: dashed 1px ${borderColor};
`;

const StyledDiv = styled("div")`
  border: dashed 1px ${borderColor};
  width: 450px;
`;

const StyledBox = styled(Box)`
  display: grid;
  place-items: center;
  border: solid 1px ${colors.purple[300]};
`;

/**
 * The AutoWidth component can be used to wrap any child elements that have
 * an optional width property. In this case, we use a mock chart component
 * just to demonstrate the concept and to show the width value.
 */
const MockChart = ({ width, color }: { width?: number; color: string }) => (
  <StyledBox sx={{ width, height, backgroundColor: color }}>
    <div>{`width = ${width}px`}</div>
  </StyledBox>
);

/**
 * A somewhat contrived example. If we do know the width of the parent
 * component, we would just use it instead of wrapping the `Chart` inside
 * `AutoWidth`.
 */
export const StaticWidth = () => (
  <StyledDiv>
    <AutoWidth>
      <MockChart color={chartColor} />
    </AutoWidth>
  </StyledDiv>
);

/**
 * This case just shows that AutoWidth will preserve the width of the child
 * component, if we explicitly pass it.
 */
export const SizedChild = () => (
  <StyledDiv>
    <AutoWidth>
      <MockChart color={chartColor} width={120} />
    </AutoWidth>
  </StyledDiv>
);

/**
 * When using grid, we don't know the width of each box, but we need it for
 * the chart. The AutoWidth component measures the width of the last Grid item
 * element and passes the value to the Chart component.
 */
export const UsingGrid = () => (
  <Grid container spacing={2}>
    <StyledGridItem item xs={4} />
    <StyledGridItem item xs={4} />
    <StyledGridItem item xs={4}>
      <AutoWidth>
        <MockChart color={chartColor} />
      </AutoWidth>
    </StyledGridItem>
  </Grid>
);

const region = states.findByRegionIdStrict("12");

/**
 * Using a real chart this time, we create a Grid with 4 columns.
 */
export const Sparklines = () => (
  <Grid container spacing={2}>
    {[1, 2, 3, 4].map((n) => (
      <StyledGridItem item xs={3} key={`grid-item-${n}`}>
        <AutoWidth>
          <MetricSparklines
            height={height}
            region={region}
            metricBarChart={MetricId.MOCK_CASES}
            metricLineChart={MetricId.MOCK_CASES}
            numDays={30}
          />
        </AutoWidth>
      </StyledGridItem>
    ))}
  </Grid>
);
