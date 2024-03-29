import React from "react";

import { Paper, Stack, Typography } from "@mui/material";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import { ColumnHeader } from ".";
import { SortDirection, Table, TableHead, TableRow } from "..";

export default {
  title: "Components/ColumnHeader",
  component: ColumnHeader,
} as ComponentMeta<typeof ColumnHeader>;

const Template: ComponentStory<typeof ColumnHeader> = (args) => (
  <Paper sx={{ maxWidth: 160 }}>
    <Table>
      <TableHead>
        <TableRow>
          <ColumnHeader {...args} />
        </TableRow>
      </TableHead>
    </Table>
  </Paper>
);

const onClickSort = (direction: SortDirection) =>
  console.log(`Sort direction: ${direction}`);

export const DefaultNotSortable = Template.bind({});
DefaultNotSortable.args = {
  label: "Location",
};

export const SortInactive = Template.bind({});
SortInactive.args = {
  label: "Location",
  onClickSort,
};

export const SortActive = Template.bind({});
SortActive.args = {
  label: "Location",
  sortDirection: SortDirection.ASC,
  onClickSort,
};

export const WithExtendedName = Template.bind({});
WithExtendedName.args = {
  label: (
    <Stack spacing={1}>
      <Typography variant="labelSmall">Metric name</Typography>
      <Typography variant="paragraphSmall">Metric name extended</Typography>
    </Stack>
  ),
  sortDirection: SortDirection.ASC,
  onClickSort,
};

export const AlignedRight = Template.bind({});
AlignedRight.args = {
  label: (
    <Stack spacing={1}>
      <Typography variant="labelSmall">Metric name</Typography>
      <Typography variant="paragraphSmall">Metric name extended</Typography>
    </Stack>
  ),
  sortDirection: SortDirection.ASC,
  onClickSort,
  align: "right",
};
