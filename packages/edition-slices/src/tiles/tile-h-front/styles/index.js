import { StyleSheet } from "react-native";
import {
  colours,
  fonts,
  spacing,
  globalSpacingStyles,
} from "@times-components-native/styleguide";

const sharedSummary = {
  ...globalSpacingStyles.tabletTeaser,
  fontSize: 14,
  lineHeight: 20,
};

const sharedStyles = {
  summary: { ...sharedSummary },
  bylineMarginBottom: spacing(3),
  headlineMarginBottom: spacing(4),
  straplineMarginTop: spacing(2),
  straplineMarginBottom: spacing(3),
};

const styles = StyleSheet.create({
  ...sharedStyles,
  container: {
    paddingBottom: 0,
    paddingRight: spacing(2),
    flex: 1,
    overflow: "hidden",
  },
  headline: {
    ...globalSpacingStyles.tabletHeadline,
    fontFamily: fonts.headline,
    fontSize: 42,
    lineHeight: 42,
    marginBottom: spacing(2),
  },
  strapline: {
    fontFamily: fonts.headlineRegular,
    color: colours.functional.primary,
    fontSize: 22,
    lineHeight: 22,
  },
});

export default styles;
