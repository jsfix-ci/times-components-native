import {
  editionBreakpoints,
  spacing,
} from "@times-components-native/styleguide";

const smallBreakpointStyles = {
  item: {
    width: "50%",
  },
  itemContainer: {
    flex: 1,
    flexDirection: "row",
  },
};

const defaultBreakpointStyles = {
  container: {
    flex: 1,
    flexDirection: "row",
    marginHorizontal: spacing(4),
  },
  columnsContainer: {
    flex: 2,
    flexDirection: "row",
  },
  columnItem: {
    flex: 1,
  },
  rowsContainer: {
    flex: 1,
    paddingVertical: spacing(1),
  },
  colSeparatorStyle: {
    marginVertical: spacing(3),
  },
};

const smallTabletBreakpointStyles = {
  ...defaultBreakpointStyles,
  container: {
    ...defaultBreakpointStyles.container,
    marginHorizontal: spacing(1),
  },
};

const wideBreakpointStyles = {
  ...defaultBreakpointStyles,
  container: {
    ...defaultBreakpointStyles.container,
    marginHorizontal: spacing(2),
  },
};

const stylesResolver = {
  [editionBreakpoints.small]: smallBreakpointStyles,
  [editionBreakpoints.smallTablet]: smallTabletBreakpointStyles,
  [editionBreakpoints.medium]: defaultBreakpointStyles,
  [editionBreakpoints.wide]: wideBreakpointStyles,
  [editionBreakpoints.huge]: wideBreakpointStyles,
};

export default breakpoint => stylesResolver[breakpoint];
