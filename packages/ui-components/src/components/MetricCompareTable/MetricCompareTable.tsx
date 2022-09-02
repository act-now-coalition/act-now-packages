import React from "react";
import { Typography, Stack, IconButton } from "@mui/material";
import { Region } from "@actnowcoalition/regions";
import { Metric, MetricCatalog } from "@actnowcoalition/metrics";
import { useMetricCatalog } from "../MetricCatalogContext";
import { formatInteger } from "@actnowcoalition/number-format";
import {
  BaseTable,
  ColumnDefinition,
  TableCell,
  TableCellHead,
} from "../BaseTable";
import { MetricValue } from "../MetricValue";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

export interface MetricCompareTableProps {
  regions: Region[];
  metrics: (Metric | string)[];
}

export const MetricCompareTable: React.FC<MetricCompareTableProps> = ({
  regions,
  metrics: metricOrIds,
}) => {
  const metricCatalog = useMetricCatalog();

  const metriColumns = metricOrIds.map((metricOrId) => {
    const metric = metricCatalog.getMetric(metricOrId);
    return getMetricColumn(metric, rows, metricCatalog);
  });

  const rows: Region[] = regions;
  const columns: ColumnDefinition<Region>[] = [
    {
      name: "Locations",
      rows,
      renderHeader: ({ column }) => (
        <TableCellHead
          stickyRow
          stickyColumn
          style={{
            fontWeight: "normal",
            verticalAlign: "bottom",
            backgroundColor: "#fff",
          }}
          sx={{ p: 0.5 }}
        >
          <Stack direction="column" justifyItems="flex-end">
            <Typography variant="labelSmall" sx={{ ml: 0.5 }}>
              {column.name}
            </Typography>
            <Typography variant="paragraphSmall" sx={{ ml: 0.5 }}>
              Population
            </Typography>
            <SortControls />
          </Stack>
        </TableCellHead>
      ),
      renderCell: ({ row }) => (
        <TableCell
          stickyColumn
          style={{ backgroundColor: "#fff" }}
          sx={{ p: 0.5 }}
        >
          <Stack>
            <Typography variant="labelSmall">{row.fullName}</Typography>
            <Typography variant="dataTabular">
              {formatInteger(row.population)}
            </Typography>
          </Stack>
        </TableCell>
      ),
      sticky: true,
    },
    ...metriColumns,
    ...metriColumns,
  ];

  return (
    <BaseTable
      rows={regions}
      columns={columns}
      size="small"
      cellPadding="none"
    />
  );
};

function getMetricColumn(
  metric: Metric,
  rows: Region[],
  metricCatalog: MetricCatalog
): ColumnDefinition<Region> {
  return {
    name: metric.name,
    rows,
    renderHeader: ({ column }) => (
      <TableCellHead
        stickyRow
        align="right"
        style={{
          minWidth: 110,
          justifyContent: "bottom",
          backgroundColor: "#fff",
        }}
        sx={{ p: 0.5 }}
      >
        <Stack direction="column">
          <Typography variant="labelSmall">{column.name}</Typography>
        </Stack>
      </TableCellHead>
    ),
    renderCell: ({ row }) => {
      const { data, error } = metricCatalog.useData(row, metric);

      if (error || !data) {
        return <TableCell />;
      }
      return (
        <TableCell align="right" sx={{ p: 0.5 }}>
          <MetricValue
            variant="dataTabular"
            region={row}
            metric={metric}
            justifyContent="space-between"
          />
        </TableCell>
      );
    },
  };
}

const SortControls: React.FC = () => {
  return (
    <Stack direction="row" spacing={0}>
      <IconButton size="small">
        <KeyboardArrowDownIcon fontSize="small" />
      </IconButton>
      <IconButton size="small">
        <KeyboardArrowUpIcon fontSize="small" />
      </IconButton>
    </Stack>
  );
};
