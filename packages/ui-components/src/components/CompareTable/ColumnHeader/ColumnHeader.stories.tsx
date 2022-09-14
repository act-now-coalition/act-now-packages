import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Paper, Stack, Typography } from "@mui/material";
import { SortDirection, Table, TableHead, TableRow } from "..";
import { ColumnHeader } from ".";

export default {
  title: "Table/ColumnHeader",
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

export const SortInactive = Template.bind({});
SortInactive.args = {
  label: "Location",
  sortDirection: SortDirection.ASC,
  isSortActive: false,
};

export const SortActive = Template.bind({});
SortActive.args = {
  label: "Location",
  sortDirection: SortDirection.ASC,
  isSortActive: true,
};

export const WithSupportingText = Template.bind({});
WithSupportingText.args = {
  label: (
    <Stack spacing={1}>
      <Typography variant="labelSmall">Metric name</Typography>
      <Typography variant="paragraphSmall">Supporting text</Typography>
    </Stack>
  ),
  sortDirection: SortDirection.ASC,
  isSortActive: true,
};

export const AlignedRight = Template.bind({});
AlignedRight.args = {
  label: (
    <Stack spacing={1}>
      <Typography variant="labelSmall">Metric name</Typography>
      <Typography variant="paragraphSmall">Supporting text</Typography>
    </Stack>
  ),
  sortDirection: SortDirection.ASC,
  isSortActive: true,
  align: "right",
};
