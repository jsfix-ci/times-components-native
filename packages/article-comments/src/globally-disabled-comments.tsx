import React from "react";
import { StyleSheet, Text, View } from "react-native";
import styleguide from "@times-components-native/styleguide";
import Context from "@times-components-native/context";

const GloballyDisabledComments = () => (
  <Context.Consumer>
    {({ maxFontSizeMultiplier, minimumFontScale }) => (
      <View style={styles.container}>
        <Text
          style={styles.headline}
          maxFontSizeMultiplier={maxFontSizeMultiplier}
          minimumFontScale={minimumFontScale}
        >
          Comments are currently unavailable
        </Text>
      </View>
    )}
  </Context.Consumer>
);

const { colours, fontFactory, spacing } = styleguide();
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    borderTopColor: colours.functional.keyline,
    borderTopWidth: 1,
    width: "100%",
  },
  headline: {
    color: colours.functional.primary,
    ...fontFactory({
      font: "headline",
      fontSize: "commentsHeadline",
    }),
    marginVertical: spacing(10),
    maxWidth: 315,
    textAlign: "center",
  },
});

export default GloballyDisabledComments;
