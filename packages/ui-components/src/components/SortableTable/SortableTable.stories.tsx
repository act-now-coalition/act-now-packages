import React from "react";
import { Story, ComponentMeta } from "@storybook/react";
import { Paper, Typography } from "@mui/material";
import { states, Region } from "@actnowcoalition/regions";
import { formatInteger } from "@actnowcoalition/number-format";
import { Metric } from "@actnowcoalition/metrics";
import { MetricId, metricCatalog } from "../../stories/mockMetricCatalog";
import { MetricValue } from "../MetricValue";
import {
  TableCell,
  SortableTable,
  SortableTableProps,
  ColumnDefinition,
} from ".";
import { useData } from "../../common/hooks";

export default {
  title: "Components/SortableTable",
  component: SortableTable,
} as ComponentMeta<typeof SortableTable>;

interface RowItem {
  region: Region;
}

const rows: RowItem[] = states.all
  .sort((a, b) => (a.population > b.population ? -1 : 1))
  .map((region) => ({ region }));

const metricCases = metricCatalog.getMetric(MetricId.MOCK_CASES);

const columns: ColumnDefinition<RowItem>[] = [
  {
    id: "name",
    rows,
    renderHeader: () => (
      <TableCell stickyRow stickyColumn>
        Location
      </TableCell>
    ),
    renderCell: ({ row }) => (
      <TableCell stickyColumn>{row.region.shortName}</TableCell>
    ),
  },
  {
    id: "fips",
    rows,
    renderHeader: () => (
      <TableCell align="right" stickyRow>
        FIPS
      </TableCell>
    ),
    renderCell: ({ row }) => (
      <TableCell align="right">
        <Typography variant="dataTabular">{row.region.regionId}</Typography>
      </TableCell>
    ),
  },
  {
    id: "population",
    rows,
    renderHeader: () => (
      <TableCell align="right" stickyRow>
        Population
      </TableCell>
    ),
    renderCell: ({ row }) => (
      <TableCell align="right">
        <Typography variant="dataTabular">
          {formatInteger(row.region.population)}
        </Typography>
      </TableCell>
    ),
  },
  {
    id: "cases",
    rows,
    renderHeader: () => (
      <TableCell align="right" sx={{ minWidth: 200 }} stickyRow>
        {metricCases.name}
      </TableCell>
    ),
    renderCell: ({ row }) => (
      <MetricCell region={row.region} metric={metricCases} />
    ),
  },
];

const MetricCell: React.FC<{ region: Region; metric: Metric }> = ({
  region,
  metric,
}) => {
  const { data, error } = useData(region, metric);

  if (!data || error) {
    return null;
  }

  return (
    <TableCell align="right">
      <MetricValue
        region={region}
        metric={metric}
        variant="dataTabular"
        justifyContent="end"
      />
    </TableCell>
  );
};

const Template: Story<SortableTableProps<RowItem>> = (args) => (
  <Paper sx={{ width: 400, height: 600, overflow: "auto" }}>
    <SortableTable {...args} />
  </Paper>
);

export const Example = Template.bind({});
Example.args = { rows, columns };
