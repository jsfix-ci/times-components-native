import {
  editionBreakpoints,
  fonts,
  spacing,
} from "@times-components-native/styleguide";

const fontSizeResolver = {
  [editionBreakpoints.smallTablet]: 19,
  [editionBreakpoints.medium]: 19,
  [editionBreakpoints.wide]: 22,
};

export default breakpoint => ({
  container: {
    paddingVertical: spacing(3),
    paddingHorizontal: spacing(2),
  },
  headline: {
    fontFamily: fonts.headlineRegular,
    fontWeight: "normal",
    fontSize: fontSizeResolver[breakpoint],
    lineHeight: fontSizeResolver[breakpoint],
  },
  imageContainer: {
    flex: 1,
  },
  summaryContainer: {
    flex: 1,
    paddingTop: spacing(2),
  },
});
