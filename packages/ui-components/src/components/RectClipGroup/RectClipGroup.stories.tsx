import { ComponentMeta } from "@storybook/react";
import React from "react";
import { RectClipGroup } from ".";

export default {
  title: "Charts/RectClipGroup",
  component: RectClipGroup,
} as ComponentMeta<typeof RectClipGroup>;

export const Example = () => (
  <svg width={300} height={300} style={{ border: "solid 1px #ddd" }}>
    <RectClipGroup width={100} height={100} x={100} y={100} rx={20} ry={20}>
      {/* The parts of the circles that are outside the RectClipGroup are hidden */}
      <circle cx={150} cy={170} r={50} fill="#c6ff00" />
      <circle cx={200} cy={160} r={20} fill="#ff9100" />
      <circle cx={120} cy={120} r={40} fill="#00b0ff" />
    </RectClipGroup>
    {/* The purple circle won't be clipped because it's outside the RectClipGroup */}
    <circle cx={190} cy={90} r={30} fill="#651fff" />
  </svg>
);
