import { styled } from "../../styles";
import { Box } from "@mui/material";

export const colorDisputedAreas = "#aaa";
export const colorWaterBodies = "rgb(248,248,248)";

/**
 * Note: Disputed areas and borders have very specific styling, so they need
 * to be styled one by one.
 *
 * There are 3 main styles for disputed areas:
 *
 * - Bodies of water: They should have the same color as the ocean.
 * - Most disputed areas: Fill with a distinctive color (dark grey)
 * - Aksai Chin: Diagonal hatch lines of the same width, colored alternately
 *   with the disputed areas color and the color used for China.
 */

export const DisputedAreaPath = styled("path")`
  shape-rendering: geometricPrecision;

  &.Great_Lakes_of_NA,
  &.Lake_Albert,
  &.Lake_Victoria,
  &.Lake_Tanganyika,
  &.Lake_Malawi,
  &.Aral_Sea,
  &.Lake_Titicaca {
    fill: ${colorWaterBodies};
  }

  &.Jammu_and_Kashmir,
  &.Abyei,
  &.Western_Sahara,
  &.Golan {
    fill: ${colorDisputedAreas};
  }

  &.Aksai_Chin {
    fill: url(#diagonalHatch);
  }
`;

/**
 * Note: Disputed areas and borders have very specific styling, so they need
 * to be styled one by one. There are basically 4 styles for borders:
 *
 * - Solid
 * - Dashed
 * - Dotted
 * - Dashed (Kosovo, different dashing style than for other borders)
 *
 * Each border has a name representing each border segment, we use the classes
 * below to style each segment individually. For details on the style guide,
 * see LegalSymbology_v2.docx (Dropbox Paper).
 *
 * Also, in order to be able to show the dashed borders, we add a white border
 * behind each border, and overlay a grey dashed border to ensure that there is
 * enough contrast.
 */

const styleDashed = `
  stroke: ${colorDisputedAreas};
  stroke-width: 0.2;
  stroke-dasharray: 1 0.6;
  stroke-linecap: butt;
`;

const styleDotted = `
  stroke: white;
  stroke-width: 0.2;
  stroke-dasharray: 0.2 0.6;
  stroke-linecap: round;
`;

const styleSolid = `
  stroke: white;
  stroke-width: 0.2;
`;

const styleKosovo = `
  stroke: ${colorDisputedAreas};
  stroke-width: 0.2;
  stroke-dasharray: 0.6;
  stroke-linecap: butt;
`;

export const DisputedBorderPath = styled("path")`
  shape-rendering: geometricPrecision;
  fill: none;
  stroke: none;

  .Background_Border {
    stroke: white;
  }

  // Jammu & Kashmir and Aksai Chin
  &.J_K_IND_Claim,
  &.J_K_PAK_Claim {
    ${styleDashed};
    stroke: white;
  }

  &.J_K_Line_of_Control {
    ${styleDotted};
  }

  &.Aksai_Chin_IND_Claim,
  &.Jammu_and_Kashmir,
  &.Aksai_Chin_CHN_Claim {
    ${styleSolid};
  }

  // Korean DMZ
  &.Korean_DMZ {
    ${styleDashed};
  }

  // Golan, Gaza Strip, and West Bank
  &.Gaza_Strip,
  &.West_Bank {
    ${styleDashed};
  }
  &.Golan {
    ${styleSolid};
  }

  // Bir Tawil & Halayib Triangle
  &.Bir_Tawil_SDN_Claim,
  &.Halayib_Triangle_SDN_Claim {
    ${styleDashed};
  }

  &.Halayib_Triangle_EGY_Claim,
  &.Bir_Tawil_EGY_Claim {
    ${styleSolid};
  }

  // Ilemi Triangle
  &.Ilemi_Triangle {
    ${styleDotted};
  }

  // Arunachal Pradesh
  &.Arunachal_Pradesh {
    ${styleSolid};
  }

  // Kosovo
  &.Kosovo {
    ${styleKosovo};
  }

  // Abyei and Sudan-South Sudan
  &.Sudan-South_Sudan {
    ${styleDashed};
  }

  &.Abyei_SSD_Claim,
  &.Abyei_SDN_Claim {
    ${styleDotted};
  }

  // Western Sahara
  &.Western_Sahara {
    ${styleSolid};
  }
`;

export const ErrorMessage = styled(Box)`
  display: grid;
  place-items: center;
  background-color: #eee;
`;
