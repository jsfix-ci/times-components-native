import { spacing } from "@times-components-native/styleguide";

const smallBreakpointStyles = {
  leadContainer: {
    flex: 1,
    flexDirection: "row",
  },
  leadItem: {
    paddingBottom: spacing(1),
    width: "50%",
  },
};

export const sharedMediumAndWide = {
  rowItemContainer: {
    flex: 1,
  },
  supportContainer: {
    flex: 1,
    flexDirection: "row",
  },
  supportItem: {
    width: "50%",
  },
  supportsWrapper: {
    width: "50%",
  },
};

const mediumBreakpointStyles = {
  ...sharedMediumAndWide,
  container: {
    flex: 1,
    flexDirection: "row",
    marginHorizontal: spacing(4),
    marginVertical: spacing(1),
  },
};

const smallTabletBreakpointStyles = {
  ...mediumBreakpointStyles,
  container: {
    ...mediumBreakpointStyles.container,
    marginHorizontal: spacing(1),
  },
};

const wideBreakpointStyles = {
  ...sharedMediumAndWide,
  container: {
    flex: 1,
    flexDirection: "row",
    marginHorizontal: spacing(2),
    marginVertical: spacing(1),
  },
};

const stylesResolver = {
  small: smallBreakpointStyles,
  smallTablet: smallTabletBreakpointStyles,
  medium: mediumBreakpointStyles,
  wide: wideBreakpointStyles,
  huge: wideBreakpointStyles,
};

export default breakpoint => stylesResolver[breakpoint] || {};
