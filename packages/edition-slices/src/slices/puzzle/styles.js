import {
  editionBreakpoints,
  spacing,
} from "@times-components-native/styleguide";

const smallBreakpointStyles = {
  container: {
    flex: 1,
    paddingHorizontal: spacing(2),
  },
  tileContainer: {
    flex: 1,
  },
};

const mediumBreakpointStyles = {
  container: {
    flex: 1,
    flexDirection: "row",
    paddingTop: spacing(3),
    paddingHorizontal: spacing(4),
  },
  tileContainer: {
    width: "33.3%",
  },
};

const smallTabletBreakpointStyles = {
  ...mediumBreakpointStyles,
  container: {
    ...mediumBreakpointStyles.container,
    paddingHorizontal: spacing(1),
  },
};

const wideBreakpointStyles = {
  ...mediumBreakpointStyles,
  container: {
    ...mediumBreakpointStyles.container,
    paddingHorizontal: spacing(2),
  },
};

const breakPointsStyles = {
  [editionBreakpoints.small]: smallBreakpointStyles,
  [editionBreakpoints.smallTablet]: smallTabletBreakpointStyles,
  [editionBreakpoints.medium]: mediumBreakpointStyles,
  [editionBreakpoints.wide]: wideBreakpointStyles,
  [editionBreakpoints.huge]: wideBreakpointStyles,
};

export default breakpoint => breakPointsStyles[breakpoint];
