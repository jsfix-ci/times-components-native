import { StyleSheet } from "react-native";
import {
  fonts,
  spacing,
  globalSpacingStyles,
  colours,
} from "@times-components-native/styleguide";

const styles = StyleSheet.create({
  container: {
    paddingBottom: spacing(0),
    paddingRight: spacing(2),
    flex: 1,
  },
  headline: {
    ...globalSpacingStyles.tabletHeadline,
    fontFamily: fonts.headline,
    fontSize: 42,
    lineHeight: 42,
  },
  summary: {
    ...globalSpacingStyles.tabletTeaser,
    fontSize: 14,
    lineHeight: 18,
  },
  headlineMarginBottom: spacing(4),
  straplineMarginTop: spacing(2),
  straplineMarginBottom: spacing(3),
  bylineMarginBottom: 0,
  imageContainer: {
    width: "100%",
    marginBottom: spacing(2),
  },
  strapline: {
    fontFamily: fonts.headlineRegular,
    color: colours.functional.primary,
    fontSize: 24,
    lineHeight: 24,
  },
});

export default styles;
