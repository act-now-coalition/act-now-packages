import React from "react";
import { Story, ComponentMeta } from "@storybook/react";
import { Paper, Typography, Stack } from "@mui/material";
import { states, Region } from "@actnowcoalition/regions";
import { formatInteger } from "@actnowcoalition/number-format";
import { Metric } from "@actnowcoalition/metrics";
import { MetricId, metricCatalog } from "../../stories/mockMetricCatalog";
import { useMetricCatalog } from "../MetricCatalogContext";
import { MetricValue } from "../MetricValue";
import { SortDirection, SortControls } from "../SortControls";
import {
  TableCell,
  SortableTable,
  SortableTableProps,
  ColumnDefinition,
} from ".";

type TableCellProps = React.ComponentProps<typeof TableCell>;

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

const sortColumnId = "population";
const sortDirection = SortDirection.DESC;

const columns: ColumnDefinition<RowItem>[] = [
  {
    id: "name",
    rows,
    renderHeader: ({ column }) => (
      <ColumnHeader
        stickyColumn
        stickyRow
        label="Location"
        align="left"
        direction={sortDirection}
        activeSort={column.id === sortColumnId}
      />
    ),
    renderCell: ({ row }) => (
      <TableCell stickyColumn>{row.region.shortName}</TableCell>
    ),
    compareFn: (rowA, rowB) =>
      rowA.region.shortName < rowB.region.shortName ? -1 : 1,
  },
  {
    id: "fips",
    rows,
    renderHeader: ({ column }) => (
      <ColumnHeader
        label="FIPS"
        direction={sortDirection}
        activeSort={column.id === sortColumnId}
      />
    ),
    renderCell: ({ row }) => (
      <TableCell align="right">
        <Typography variant="dataTabular">{row.region.regionId}</Typography>
      </TableCell>
    ),
    compareFn: (rowA, rowB) =>
      rowA.region.regionId < rowB.region.regionId ? -1 : 1,
  },
  {
    id: "population",
    rows,
    renderHeader: ({ column }) => (
      <ColumnHeader
        label="Population"
        direction={sortDirection}
        activeSort={column.id === sortColumnId}
      />
    ),
    renderCell: ({ row }) => (
      <TableCell align="right">
        <Typography variant="dataTabular">
          {formatInteger(row.region.population)}
        </Typography>
      </TableCell>
    ),
    compareFn: (rowA, rowB) => rowA.region.population - rowB.region.population,
  },
  {
    id: "cases",
    rows,
    renderHeader: ({ column }) => (
      <ColumnHeader
        label={metricCases.name}
        direction={sortDirection}
        activeSort={column.id === sortColumnId}
        sx={{ minWidth: 200 }}
      />
    ),
    renderCell: ({ row }) => (
      <MetricCell region={row.region} metric={metricCases} />
    ),
    compareFn: (rowA, rowB) => {
      const metricValueA = metricCatalog.useData(rowA.region, metricCases);
      const metricValueB = metricCatalog.useData(rowB.region, metricCases);
      return metricValueA < metricValueB ? -1 : 1;
    },
  },
];

const MetricCell: React.FC<{ region: Region; metric: Metric }> = ({
  region,
  metric,
}) => {
  const metricCatalog = useMetricCatalog();
  const { data, error } = metricCatalog.useData(region, metric);

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

interface ColumnHeaderProps extends TableCellProps {
  label: string;
  direction: SortDirection;
  activeSort: boolean;
}

const ColumnHeader: React.FC<ColumnHeaderProps> = ({
  label,
  direction,
  activeSort,
  ...tableCellProps
}) => (
  <TableCell align="right" stickyRow {...tableCellProps}>
    <Stack alignItems={tableCellProps.align === "left" ? "start" : "end"}>
      <Typography variant="labelSmall">{label}</Typography>
      <SortControls
        active={activeSort}
        direction={direction}
        onClick={(sortDirection) => console.log(sortDirection)}
      />
    </Stack>
  </TableCell>
);

const Template: Story<SortableTableProps<RowItem>> = (args) => (
  <Paper sx={{ width: 400, height: 600, overflow: "auto" }}>
    <SortableTable {...args} />
  </Paper>
);

export const Example = Template.bind({});
Example.args = { rows, columns, sortColumnId, sortDirection };

export const SortByPopulation = Template.bind({});
SortByPopulation.args = {
  rows,
  columns,
  sortColumnId,
  sortDirection,
};
