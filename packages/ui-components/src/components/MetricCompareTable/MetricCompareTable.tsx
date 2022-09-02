import React from "react";
import { Region } from "@actnowcoalition/regions";
import { Metric, MetricCatalog } from "@actnowcoalition/metrics";
import { useMetricCatalog } from "../MetricCatalogContext";
import {
  BaseTable,
  ColumnDefinition,
  TableCell,
  TableCellHead,
} from "../BaseTable";
import { MetricValue } from "../MetricValue";

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
      name: "Region",
      rows,
      renderHeader: ({ column }) => (
        <TableCellHead stickyRow stickyColumn>
          {column.name}s
        </TableCellHead>
      ),
      renderCell: ({ row }) => (
        <TableCell stickyColumn>{row.fullName}</TableCell>
      ),
      sticky: true,
    },
    ...metriColumns,
    ...metriColumns,
  ];

  return <BaseTable rows={regions} columns={columns} />;
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
      <TableCellHead stickyRow>{column.name}</TableCellHead>
    ),
    renderCell: ({ row }) => {
      const { data, error } = metricCatalog.useData(row, metric);

      if (error || !data) {
        return <TableCell />;
      }
      return (
        <TableCell align="right">
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
