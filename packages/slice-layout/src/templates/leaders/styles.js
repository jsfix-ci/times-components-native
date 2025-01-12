import {
  colours,
  editionBreakpoints,
  spacing,
} from "@times-components-native/styleguide";

const smallBreakpointStyles = {
  container: {
    paddingBottom: spacing(1),
  },
};

const mediumBreakpointStyles = {
  columnItems: {
    paddingHorizontal: spacing(3),
    width: "33%",
  },
  container: {
    flex: 1,
    flexDirection: "row",
    paddingHorizontal: spacing(1),
  },
  itemColSeparator: {
    borderColor: colours.functional.keyline,
    borderRightWidth: 1,
    borderStyle: "solid",
    marginVertical: spacing(6),
  },
};

const wideBreakpointStyles = {
  columnItems: {
    paddingHorizontal: spacing(4),
    width: "33%",
  },
  container: {
    flex: 1,
    flexDirection: "row",
  },
  itemColSeparator: {
    borderColor: colours.functional.keyline,
    borderRightWidth: 1,
    borderStyle: "solid",
    marginTop: spacing(6),
    marginBottom: spacing(12),
  },
};

const stylesResolver = {
  [editionBreakpoints.small]: smallBreakpointStyles,
  [editionBreakpoints.smallTablet]: mediumBreakpointStyles,
  [editionBreakpoints.medium]: mediumBreakpointStyles,
  [editionBreakpoints.wide]: wideBreakpointStyles,
  [editionBreakpoints.huge]: wideBreakpointStyles,
};

export default breakpoint => stylesResolver[breakpoint];
