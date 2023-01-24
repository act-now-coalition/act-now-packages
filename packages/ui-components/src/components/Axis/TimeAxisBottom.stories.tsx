import React from "react";

import { Box, Typography } from "@mui/material";
import { ComponentMeta } from "@storybook/react";
import { scaleUtc } from "@visx/scale";

import {
  TimeUnit,
  getTimeUnitLabel,
  subtractTime,
} from "@actnowcoalition/time-utils";

import { TimeAxisBottom } from ".";

export default {
  title: "Components/TimeAxisBottom",
} as ComponentMeta<typeof TimeAxisBottom>;

const endDate = new Date("2023-03-01");

const timePeriods = [
  {
    amount: 1,
    timeUnit: TimeUnit.WEEKS,
  },
  {
    amount: 2,
    timeUnit: TimeUnit.WEEKS,
  },
  {
    amount: 1,
    timeUnit: TimeUnit.MONTHS,
  },
  {
    amount: 2,
    timeUnit: TimeUnit.MONTHS,
  },
  {
    amount: 3,
    timeUnit: TimeUnit.MONTHS,
  },
  {
    amount: 4,
    timeUnit: TimeUnit.MONTHS,
  },
  {
    amount: 6,
    timeUnit: TimeUnit.MONTHS,
  },
  {
    amount: 1,
    timeUnit: TimeUnit.YEARS,
  },
  {
    amount: 2,
    timeUnit: TimeUnit.YEARS,
  },
  {
    amount: 3,
    timeUnit: TimeUnit.YEARS,
  },
  {
    amount: 4,
    timeUnit: TimeUnit.YEARS,
  },
  {
    amount: 6,
    timeUnit: TimeUnit.YEARS,
  },
  {
    amount: 9,
    timeUnit: TimeUnit.YEARS,
  },
  {
    amount: 11,
    timeUnit: TimeUnit.YEARS,
  },
  {
    amount: 50,
    timeUnit: TimeUnit.YEARS,
  },
];

const widthList = [900, 700, 600, 400, 300];

interface TestCase {
  startDate: Date;
  endDate: Date;
  label: string;
  width: number;
}

const testMatrix: TestCase[] = timePeriods.flatMap(({ amount, timeUnit }) => {
  return widthList.map((width) => {
    const label = `${amount} ${getTimeUnitLabel(amount, timeUnit)}`;
    return {
      startDate: subtractTime(endDate, amount, timeUnit),
      endDate,
      label,
      width,
    };
  });
});

const TimeAxisChart = ({ startDate, endDate, label, width }: TestCase) => {
  const padding = 30;
  const scaleTime = scaleUtc({
    domain: [startDate, endDate],
    range: [0, width - 2 * padding],
  });

  return (
    <Box sx={{ my: 2 }}>
      <Typography
        variant="overline"
        component="div"
      >{`${label}, ${width}px`}</Typography>
      <svg width={width} height={40} style={{ border: "solid 1px #ddd" }}>
        <TimeAxisBottom
          left={padding}
          top={5}
          scale={scaleTime}
          width={width}
        />
      </svg>
    </Box>
  );
};

export const Sample = () => {
  return (
    <Box>
      {testMatrix.map((test, i) => (
        <TimeAxisChart key={`case-${i}`} {...test} />
      ))}
    </Box>
  );
};
