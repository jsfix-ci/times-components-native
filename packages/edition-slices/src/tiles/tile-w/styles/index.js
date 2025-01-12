import {
  spacing,
  fonts,
  globalSpacingStyles,
} from "@times-components-native/styleguide";

const mediumBreakpointStyles = {
  container: {
    flex: 1,
    flexDirection: "row",
    marginHorizontal: spacing(4),
    paddingHorizontal: spacing(2),
    paddingVertical: spacing(3),
  },
  headline: {
    ...globalSpacingStyles.tabletHeadline,
    fontFamily: fonts.headline,
    fontSize: 30,
    lineHeight: 30,
  },
  summaryContainer: {
    flex: 1,
    paddingRight: spacing(4),
  },
  imageContainer: {
    flex: 1,
  },
  summary: {
    ...globalSpacingStyles.tabletTeaser,
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
  ...mediumBreakpointStyles,
  container: {
    ...mediumBreakpointStyles.container,
    marginHorizontal: spacing(2),
  },
  headline: {
    ...mediumBreakpointStyles.headline,
    fontSize: 40,
    lineHeight: 40,
  },
};

const hugeBreakpointStyles = {
  ...wideBreakpointStyles,
  headline: {
    ...wideBreakpointStyles.headline,
    fontSize: 45,
    lineHeight: 45,
  },
};

const stylesResolver = {
  smallTablet: smallTabletBreakpointStyles,
  medium: mediumBreakpointStyles,
  wide: wideBreakpointStyles,
  huge: hugeBreakpointStyles,
};

export default breakpoint => stylesResolver[breakpoint];
