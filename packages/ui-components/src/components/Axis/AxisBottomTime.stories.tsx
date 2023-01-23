import React from "react";

import { Box, Typography } from "@mui/material";
import { ComponentMeta } from "@storybook/react";
import { Group } from "@visx/group";
import { scaleUtc } from "@visx/scale";

import {
  TimeUnit,
  getTimeUnitLabel,
  subtractTime,
} from "@actnowcoalition/time-utils";

import { AxisBottom } from ".";

export default {
  title: "Components/TimeAxisBottom",
} as ComponentMeta<typeof AxisBottom>;

const widthList = [900, 600, 400, 300];

const date = new Date("2023-01-01");

const TimePeriod = ({ amount, unit }: { amount: number; unit: TimeUnit }) => {
  const label = `${amount} ${getTimeUnitLabel(amount, unit)}`;
  return (
    <Box>
      <Typography variant="overline">{label}</Typography>
      {widthList.map((width) => (
        <TimeAxis
          key={`item-${width}`}
          width={width}
          startDate={subtractTime(date, amount, unit)}
          endDate={date}
        />
      ))}
    </Box>
  );
};

const TimeAxis = ({
  width,
  startDate,
  endDate,
}: {
  width: number;
  startDate: Date;
  endDate: Date;
}) => {
  const padding = 30;
  const timeScale = scaleUtc({
    domain: [startDate, endDate],
    range: [padding, width - 2 * padding],
  });

  const { numTicks } = formatTimeAxis(startDate, endDate, width);

  return (
    <Box>
      <svg width={width} height={60} style={{ border: "solid 1px #ddd" }}>
        <Group top={padding}>
          <AxisBottom scale={timeScale} numTicks={numTicks} />
        </Group>
      </svg>
    </Box>
  );
};

export const Time10Years = () => (
  <TimePeriod amount={10} unit={TimeUnit.YEARS} />
);

export const Time6Years = () => <TimePeriod amount={6} unit={TimeUnit.YEARS} />;
export const Time4Years = () => <TimePeriod amount={4} unit={TimeUnit.YEARS} />;
export const Time2Years = () => <TimePeriod amount={2} unit={TimeUnit.YEARS} />;

export const Time18Months = () => (
  <TimePeriod amount={18} unit={TimeUnit.MONTHS} />
);
export const Time12Months = () => (
  <TimePeriod amount={12} unit={TimeUnit.MONTHS} />
);
export const Time9Months = () => (
  <TimePeriod amount={9} unit={TimeUnit.MONTHS} />
);
export const Time6Months = () => (
  <TimePeriod amount={6} unit={TimeUnit.MONTHS} />
);
export const Time3Months = () => (
  <TimePeriod amount={3} unit={TimeUnit.MONTHS} />
);
export const Time2Months = () => (
  <TimePeriod amount={2} unit={TimeUnit.MONTHS} />
);
export const Time1Months = () => (
  <TimePeriod amount={1} unit={TimeUnit.MONTHS} />
);

export const Time2Weeks = () => <TimePeriod amount={2} unit={TimeUnit.WEEKS} />;
export const Time1Week = () => <TimePeriod amount={1} unit={TimeUnit.WEEKS} />;

function formatTimeAxis(startDate: Date, endDate: Date, width: number) {
  const maxTickNumber = Math.floor(width / 70);
  return { numTicks: maxTickNumber };
}
