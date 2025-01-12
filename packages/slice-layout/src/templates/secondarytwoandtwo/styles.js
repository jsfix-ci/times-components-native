import { spacing } from "@times-components-native/styleguide";

const smallBreakpointStyles = {
  itemContainer: {
    flex: 1,
    flexDirection: "row",
  },
  itemHalfWidth: {
    width: "50%",
  },
};

const mediumBreakpointStyles = {
  container: {
    flex: 1,
    marginHorizontal: spacing(4),
  },
  item: {
    width: "50%",
  },
  itemContainer: {
    flex: 1,
    flexDirection: "row",
    paddingBottom: spacing(1),
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
  container: {
    flex: 1,
    flexDirection: "row",
    marginHorizontal: spacing(2),
  },
  secondaryItemContainer: {
    width: "33.4%",
  },
  supportItemContainer: {
    width: "16.6%",
  },
};

const stylesToReturn = {
  huge: wideBreakpointStyles,
  medium: mediumBreakpointStyles,
  small: smallBreakpointStyles,
  smallTablet: smallTabletBreakpointStyles,
  wide: wideBreakpointStyles,
};

export default breakpoint =>
  stylesToReturn[breakpoint] || smallBreakpointStyles;
