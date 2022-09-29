import React, { useState } from "react";
import { Stack, Tab, Typography, Tabs } from "@mui/material";
import { MetricId } from "./mockMetricCatalog";
import { states } from "@actnowcoalition/regions";
import { MetricValue } from "../components/MetricValue";

export default {
  title: "Design System/Tabs",
};

const washingtonState = states.findByRegionIdStrict("53");

const TabContent = () => {
  return (
    <Stack spacing={1}>
      <Typography variant="labelLarge" textAlign="left">
        Metric Name
      </Typography>
      <MetricValue
        metric={MetricId.MOCK_CASES}
        region={washingtonState}
        variant="dataEmphasizedSmall"
      />
      <Typography variant="paragraphSmall">Supporting text</Typography>
    </Stack>
  );
};

export const SingleTab = () => <Tab label={<TabContent />} />;

export const MultiTabsWithIndicator = () => {
  const [value, setValue] = useState(1);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <Tabs value={value} onChange={handleChange}>
      <Tab value={1} label={<TabContent />} disableRipple />
      <Tab value={2} label={<TabContent />} disableRipple />
      <Tab value={3} label={<TabContent />} disableRipple />
    </Tabs>
  );
};