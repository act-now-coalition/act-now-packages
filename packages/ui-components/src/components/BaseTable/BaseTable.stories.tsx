import React from "react";
import { Story, ComponentMeta } from "@storybook/react";
import { Region, states } from "@actnowcoalition/regions";
import { BaseTable, BaseTableColumn, BaseTableProps } from ".";

export default {
  title: "Components/BaseTable",
  component: BaseTable,
} as ComponentMeta<typeof BaseTable>;

interface Row {
  region: Region;
}

const Template: Story<BaseTableProps<Row>> = (args) => (
  <div style={{ width: 400, height: 400, overflow: "auto" }}>
    <BaseTable<Row> {...args} />
  </div>
);

const rows: Row[] = states.all.map((region: Region) => ({ region }));

const columnName: BaseTableColumn<Row> = {
  name: "Name",
  rows,
  sticky: true,
  renderCell: ({ row }) => <>{row.region.fullName}</>,
  renderHeader: ({ column }) => <>{column.name}</>,
};

const columnPopulation: BaseTableColumn<Row> = {
  name: "Population",
  rows,
  renderCell: ({ row }) => <>{row.region.population}</>,
  renderHeader: ({ column }) => <>{column.name}</>,
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
