import React from "react";
import { Story, ComponentMeta } from "@storybook/react";
import { Region, states } from "@actnowcoalition/regions";
import { BaseTable, BaseTableColumn, BaseTableProps } from ".";
import { TableCellHead, TableCell } from "./BaseTable.style";

export default {
  title: "Components/BaseTable",
  component: BaseTable,
} as ComponentMeta<typeof BaseTable>;

interface Row {
  region: Region;
}

const Template: Story<BaseTableProps<Row>> = (args) => (
  <div
    style={{
      width: 400,
      height: 400,
      overflow: "auto",
      border: "solid 1px #0969da",
    }}
  >
    <BaseTable<Row> {...args} />
  </div>
);

const rows: Row[] = states.all.map((region: Region) => ({ region }));

const columnName: BaseTableColumn<Row> = {
  name: "Name",
  rows,
  sticky: true,
  renderHeader: ({ column }) => (
    <TableCellHead stickyRow={true} stickyColumn={column.sticky}>
      {column.name}
    </TableCellHead>
  ),
  renderCell: ({ row }) => (
    <TableCell stickyColumn={columnName.sticky}>
      {row.region.fullName}
    </TableCell>
  ),
};

const columnPopulation: BaseTableColumn<Row> = {
  name: "Population",
  rows,
  renderHeader: ({ column }) => (
    <TableCellHead align="right" stickyRow={true} stickyColumn={column.sticky}>
      {column.name}
    </TableCellHead>
  ),
  renderCell: ({ row }) => (
    <TableCell align="right">{row.region.population}</TableCell>
  ),
};

const columns: BaseTableColumn<Row>[] = [
  columnName,
  columnPopulation,
  columnPopulation,
  columnPopulation,
  columnPopulation,
];

export const Example = Template.bind({});
Example.args = { rows, columns };
