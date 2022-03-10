import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { colours, fonts } from "@times-components-native/styleguide";
import styles from "./styles";

const localStyles = StyleSheet.create({
  container: {
    paddingLeft: 9,
    paddingRight: 8,
    paddingVertical: 4,
    backgroundColor: colours.functional.darkRed,
  },
  bullet: {
    height: 5,
    width: 5,
    backgroundColor: "white",
  },
  title: {
    color: "white",
    fontFamily: fonts.supporting,
    fontWeight: "500",
    paddingTop: 3,
  },
});

interface DiamondArticleFlagType {
  title: string;
}

const DiamondArticleFlag = ({ title }: DiamondArticleFlagType) => (
  <View style={[styles.view, localStyles.container]}>
    <View style={[localStyles.bullet]} />
    <Text
      accessibilityLabel={`${title} Flag`}
      style={[styles.title, localStyles.title]}
      testID={`flag-${title}`}
    >
      {title}
    </Text>
  </View>
);

export default DiamondArticleFlag;
