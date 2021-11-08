import { StyleSheet } from "react-native";
import {
  fonts,
  spacing,
  globalSpacingStyles,
} from "@times-components-native/styleguide";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: spacing(2),
  },
  imageContainer: {
    width: "100%",
    marginBottom: spacing(1),
  },
  headlineMarginBottom: spacing(3),
  bylineMarginBottom: spacing(3),
  headline: {
    ...globalSpacingStyles.tabletHeadline,
    fontFamily: fonts.headline,
    fontSize: 22,
    lineHeight: 22,
  },
  summary: {
    ...globalSpacingStyles.tabletTeaser,
    fontSize: 14,
    lineHeight: 18,
  },
});

export default styles;
