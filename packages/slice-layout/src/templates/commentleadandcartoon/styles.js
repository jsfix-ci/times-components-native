import {
  editionBreakpoints,
  spacing,
} from "@times-components-native/styleguide";

const defaultBreakpointStyles = {
  cartoon: {
    width: "66.7%",
  },
  container: {
    flex: 1,
    flexDirection: "row",
    paddingHorizontal: spacing(4),
    paddingVertical: spacing(1),
  },
  lead: {
    width: "33.3%",
  },
};

const smallTabletBreakpointStyles = {
  ...defaultBreakpointStyles,
  container: {
    ...defaultBreakpointStyles.container,
    paddingHorizontal: spacing(1),
  },
};

const wideBreakpointStyles = {
  ...defaultBreakpointStyles,
  container: {
    flex: 1,
    flexDirection: "row",
    paddingHorizontal: spacing(2),
    paddingVertical: spacing(1),
  },
};

const stylesResolver = {
  [editionBreakpoints.smallTablet]: smallTabletBreakpointStyles,
  [editionBreakpoints.medium]: defaultBreakpointStyles,
  [editionBreakpoints.wide]: wideBreakpointStyles,
  [editionBreakpoints.huge]: wideBreakpointStyles,
};

export default breakpoint => stylesResolver[breakpoint];
