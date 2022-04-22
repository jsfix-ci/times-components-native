import React from "react";
import { View, Text } from "react-native";
import { gqlRgbaToStyle } from "@times-components-native/utils";
import styles from "./styles";
import { colours } from "@times-components-native/styleguide";

interface ArticleFlag {
  allowFontScaling?: boolean;
  title: string;
  color: string;
}

const ArticleFlag = ({
  allowFontScaling = true,
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
      allowFontScaling={allowFontScaling}
      style={[styles.title, { color: gqlRgbaToStyle(color) || color }]}
      testID={`flag-${title}`}
    >
      {title.toLowerCase()}
    </Text>
  </View>
);

export default ArticleFlag;
