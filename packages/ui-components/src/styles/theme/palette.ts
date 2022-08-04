// (In progress) - color names matching what exists in Figma's Act Now design system (as of 8/4/22)
const colors = {
  text: {
    emphasized: "#121314",
    default: "#3C4245",
    deemphasized: "#5F6C72",
    light: "#F6F6F6",
  },
  background: {
    light: "#FFFFFF",
    medium: "", // TODO - Josh to translate to hex in figma
    dark: "#121314",
  },
  border: {
    default: "#5f6c7233", // TODO - Josh to translate to hex in figma
  },
  action: {
    primary: "#464FC7",
    primaryHover: "#1D27B1",
  },
  severity: {
    100: "#00D474",
    200: "#FFC900",
    300: "#FF9600",
    400: "#D9002C",
    500: "#790019",
  },
  gradient: {
    100: "#CCB7FA",
    200: "#B292F9",
    300: "#9670F7",
    400: "#794DF3",
    500: "#5936B6",
  },
};

const palette = {
  primary: {
    main: colors.action.primary,
    dark: colors.action.primaryHover,
  },
  secondary: {
    light: colors.text.deemphasized,
    main: colors.text.default,
    dark: colors.text.emphasized,
  },
  common: {
    black: "black",
    white: "white",
  },
  success: {
    main: colors.severity[100], // severity100
  },
  text: {
    primary: colors.text.default,
    secondary: colors.text.emphasized,
    secondaryLight: colors.text.deemphasized,
    light: colors.text.light,
  },
  severity: {
    100: colors.severity[100],
    200: colors.severity[200],
    300: colors.severity[300],
    400: colors.severity[400],
    500: colors.severity[500],
  },
  gradient: {
    100: colors.gradient[100],
    200: colors.gradient[200],
    300: colors.gradient[300],
    400: colors.gradient[400],
    500: colors.gradient[500],
  },
};

export default palette;
