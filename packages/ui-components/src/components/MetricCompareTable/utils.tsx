import React from "react";
import { Metric, MetricCatalog } from "@actnowcoalition/metrics";
import { Region } from "@actnowcoalition/regions";
import { ColumnDefinition } from "../BaseTable";
import { ColumnHeader } from "./ColumnHeader";
import { TableCell } from "./MetricCompareTable.style";
import { MetricValue } from "../MetricValue";

export function getMetricColumn<T>(
  metric: Metric,
  metricIndex: number,
  rows: { region: Region; otherProps: T }[],
  metricCatalog: MetricCatalog
): ColumnDefinition<{ region: Region; otherProps: T }> {
  return {
    id: `${metric.id}-${metricIndex}`,
    name: metric.name,
    rows,
    renderHeader: ({ column }) => (
      <ColumnHeader
        columnTitle={column.name}
        stickyRow
        align="right"
        style={{ minWidth: 110 }}
      />
    ),
    renderCell: ({ row }) => {
      const { data, error } = metricCatalog.useData(row.region, metric);

      if (error || !data) {
        return <TableCell />;
      }
      return (
        <TableCell align="right">
          <MetricValue
            variant="dataTabular"
            region={row.region}
            metric={metric}
            justifyContent="end"
          />
        </TableCell>
      );
    },
  };
}
