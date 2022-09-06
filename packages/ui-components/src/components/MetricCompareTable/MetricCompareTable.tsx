import React from "react";
import { Typography, Stack } from "@mui/material";
import { Region } from "@actnowcoalition/regions";
import { Metric } from "@actnowcoalition/metrics";
import { formatInteger } from "@actnowcoalition/number-format";
import { useMetricCatalog } from "../MetricCatalogContext";
import { BaseTable, ColumnDefinition } from "../BaseTable";
import { ColumnHeader } from "./ColumnHeader";
import { getMetricColumn } from "./utils";
import { TableCell } from "./MetricCompareTable.style";

export interface MetricCompareTableProps {
  regions: Region[];
  metrics: (Metric | string)[];
}

interface Row {
  region: Region;
  otherProps: { rank: number };
}

export const MetricCompareTable: React.FC<MetricCompareTableProps> = ({
  regions,
  metrics: metricOrIds,
}) => {
  const rows: Row[] = regions.map((region, regionIndex) => ({
    region,
    otherProps: { rank: regionIndex + 1 },
  }));

  const metricCatalog = useMetricCatalog();
  const metricColumns = metricOrIds.map((metricOrId, metricIndex) => {
    const metric = metricCatalog.getMetric(metricOrId);
    return getMetricColumn(metric, metricIndex, rows, metricCatalog);
  });

  const columns: ColumnDefinition<Row>[] = [
    {
      id: "location",
      name: "Locations",
      rows,
      renderHeader: ({ column }) => (
        <ColumnHeader
          stickyRow
          stickyColumn
          columnTitle={column.name}
          supportingText="Population"
          align="left"
          style={{ minWidth: 170 }}
        />
      ),
      renderCell: ({ row }) => (
        <TableCell stickyColumn style={{ backgroundColor: "#fff" }}>
          <Stack>
            <Typography variant="labelSmall">{row.region.fullName}</Typography>
            <Typography variant="dataTabular">
              {formatInteger(row.region.population)}
            </Typography>
          </Stack>
        </TableCell>
      ),
      sticky: true,
    },
    ...metricColumns,
  ];

  return <BaseTable rows={rows} columns={columns} />;
};
