import {
  colours,
  fonts,
  fontSizes,
  spacing,
  editionBreakpoints,
  globalSpacingStyles,
} from "@times-components-native/styleguide";

const headlineFontSizeResolver = {
  [editionBreakpoints.smallTablet]: 30,
  [editionBreakpoints.medium]: 30,
  [editionBreakpoints.wide]: 40,
  [editionBreakpoints.huge]: 45,
};

const keylinePadding = {
  [editionBreakpoints.smallTablet]: spacing(2),
  [editionBreakpoints.medium]: spacing(2),
  [editionBreakpoints.wide]: spacing(3),
  [editionBreakpoints.huge]: spacing(3),
};

const styles = breakpoint => ({
  byline: {
    color: colours.section.comment,
    fontFamily: fonts.supporting,
    fontSize: fontSizes.cardMetaMobile,
    letterSpacing: 1,
    fontWeight: "100",
    textTransform: "uppercase",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: spacing(2),
    paddingRight: keylinePadding[breakpoint],
  },
  headline: {
    ...globalSpacingStyles.tabletHeadline,
    color: colours.functional.brandColour,
    fontFamily: fonts.headline,
    fontSize: headlineFontSizeResolver[breakpoint],
    lineHeight: headlineFontSizeResolver[breakpoint],
    textAlign: "center",
    paddingBottom: spacing(2),
    paddingTop: spacing(1),
  },
  imageContainer: {
    overflow: "hidden",
    width: 97,
    marginBottom: spacing(3),
  },
  strapline: {
    color: colours.functional.secondary,
    fontFamily: fonts.bodyRegular,
    fontSize: fontSizes.meta,
    lineHeight: 20,
    textAlign: "center",
    paddingBottom: 0,
  },
  summaryContainer: {
    paddingTop: spacing(1),
    alignItems: "center",
  },
});

export default styles;
