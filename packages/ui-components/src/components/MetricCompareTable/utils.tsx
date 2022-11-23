import {
  ColumnDefinition,
  ColumnHeader,
  SortDirection,
  getAriaSort,
} from "../CompareTable";
import { Stack, Typography } from "@mui/material";
import { StyledLink, StyledTableCell } from "./MetricCompareTable.style";

import { Metric } from "@actnowcoalition/metrics";
import { MetricValue } from "../MetricValue";
import React from "react";
import { RegionDB } from "@actnowcoalition/regions";
import { Row } from "./MetricCompareTable";
import { formatPopulation } from "../../common/utils";
import isNumber from "lodash/isNumber";

export function createMetricColumn(
  regionDB: RegionDB,
  metric: Metric,
  sortDirection: SortDirection,
  sortColumnId: string,
  onClickSort: (direction: SortDirection, columnId: string) => void
): ColumnDefinition<Row> {
  return {
    columnId: metric.id,
    name: metric.name,
    renderHeader: ({ column }) => {
      const isSortActive = sortColumnId === column.columnId;
      return (
        <ColumnHeader
          label={
            <HeaderLabel
              primary={column.name}
              secondary={metric.extendedName}
            />
          }
          sortDirection={isSortActive ? sortDirection : undefined}
          onClickSort={(dir) => onClickSort(dir, column.columnId)}
          aria-sort={getAriaSort(isSortActive, sortDirection)}
        />
      );
    },
    renderCell: ({ row }) => (
      <StyledTableCell>
        <StyledLink
          href={regionDB.getRegionUrl(row.region)}
          sx={{ justifyContent: "end" }}
        >
          <MetricValue
            metric={metric}
            region={row.region}
            variant="dataTabular"
            justifyContent="end"
          />
        </StyledLink>
      </StyledTableCell>
    ),
    sorterAsc: (rowA, rowB) => {
      const { currentValue: valueA } =
        rowA.multiMetricDataStore.metricData(metric);
      const { currentValue: valueB } =
        rowB.multiMetricDataStore.metricData(metric);

      if (isNumber(valueA) && isNumber(valueB)) {
        return valueA - valueB;
      }

      if (!isNumber(valueA) && !isNumber(valueB)) {
        return 0;
      } else {
        // Sort locations with a metric value before locations that are
        // missing the value
        return isNumber(valueA) ? -1 : 1;
      }
    },
  };
}

export function createLocationColumn(
  regionDB: RegionDB,
  sortDirection: SortDirection,
  sortColumnId: string,
  onClickSort: (direction: SortDirection, columnId: string) => void
): ColumnDefinition<Row> {
  return {
    columnId: "location",
    name: "Location",
    renderHeader: ({ column }) => {
      const isSortActive = sortColumnId === column.columnId;
      return (
        <ColumnHeader
          label={<HeaderLabel primary={column.name} secondary="Population" />}
          sortDirection={isSortActive ? sortDirection : undefined}
          onClickSort={(dir) => onClickSort(dir, column.columnId)}
          aria-sort={getAriaSort(isSortActive, sortDirection)}
          stickyColumn
          stickyRow
        />
      );
    },
    renderCell: ({ row }) => (
      <StyledTableCell stickyColumn>
        <StyledLink href={regionDB.getRegionUrl(row.region)}>
          <Stack spacing={0.5}>
            <Typography variant="labelSmall">{row.region.fullName}</Typography>
            <Typography variant="paragraphSmall">
              {formatPopulation(row.region.population)}
            </Typography>
          </Stack>
        </StyledLink>
      </StyledTableCell>
    ),
    sorterAsc: (rowA, rowB) =>
      rowA.region.fullName < rowB.region.fullName ? -1 : 1,
  };
}

function HeaderLabel({
  primary,
  secondary,
}: {
  primary: string;
  secondary: string;
}) {
  return (
    <Stack spacing={1}>
      <Typography variant="labelSmall">{primary}</Typography>
      <Typography variant="paragraphSmall">{secondary}</Typography>
    </Stack>
  );
}
