import React from "react";
import { View, Text } from "react-native";
import styles from "./styles";

const RelatedArticlesHeading = () => (
  <View style={styles.titleContainer}>
    <Text
      accessibilityRole="header"
      aria-level="3"
      style={styles.title}
      maxFontSizeMultiplier={2}
      minimumFontScale={0.7}
    >
      Related articles
    </Text>
  </View>
);

export default RelatedArticlesHeading;
