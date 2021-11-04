import { StyleSheet } from "react-native";
import {
  colours,
  fonts,
  spacing,
  globalSpacingStyles,
} from "@times-components-native/styleguide";

const sharedSummaryContainer = {
  position: "absolute",
  bottom: 0,
  backgroundColor: colours.functional.white,
  width: "100%",
};

const sharedSummary = {
  ...globalSpacingStyles.tabletTeaser,
  fontSize: 14,
  lineHeight: 20,
};

const sharedStyles = {
  summaryContainer: { ...sharedSummaryContainer, paddingTop: spacing(1) },
  summary: { ...sharedSummary },
  bylineMarginBottom: spacing(3),
};

const styles = StyleSheet.create({
  ...sharedStyles,
  container: {
    paddingLeft: spacing(2),
    flex: 1,
  },
  imageContainer: {
    width: "100%",
  },
  headlineMarginBottom: spacing(3),
});

export default styles;
