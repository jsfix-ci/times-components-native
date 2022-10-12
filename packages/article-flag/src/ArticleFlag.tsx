import React from "react";
import { View } from "react-native";
import { Text } from "@times-components-native/text";
import { gqlRgbaToStyle } from "@times-components-native/utils";
import styles from "./styles";
import { colours } from "@times-components-native/styleguide";

interface ArticleFlag {
  title: string;
  color: string;
}

const ArticleFlag = ({
  title,
  color = colours.functional.primary,
}: ArticleFlag) => (
  <View style={styles.view}>
    <View
      style={[
        styles.bullet,
        { backgroundColor: gqlRgbaToStyle(color) || color },
      ]}
    />
    <Text
      accessibilityLabel={`${title} Flag`}
      style={[styles.title, { color: gqlRgbaToStyle(color) || color }]}
      testID={`flag-${title}`}
    >
      {title.toLowerCase()} hhh
    </Text>
  </View>
);

export default ArticleFlag;
