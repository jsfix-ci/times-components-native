import { StyleSheet } from "react-native";
import {
  colours,
  spacing,
  globalSpacingStyles,
} from "@times-components-native/styleguide";

const styles = StyleSheet.create({
  container: {
    paddingLeft: spacing(2),
    flex: 1,
  },
  imageContainer: {
    width: "100%",
  },
  headlineMarginBottom: spacing(3),
  summary: {
    ...globalSpacingStyles.tabletTeaser,
    fontSize: 14,
    lineHeight: 20,
  },
  summaryContainer: {
    backgroundColor: colours.functional.white,
    bottom: 0,
    paddingTop: spacing(1),
    position: "absolute",
    width: "100%",
  },
  bylineMarginBottom: spacing(3),
});

export default styles;
