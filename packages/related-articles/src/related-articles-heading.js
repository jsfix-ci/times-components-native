import React from "react";
import { View } from "react-native";
import { Text } from "@times-components-native/text";
import styles from "./styles";

const RelatedArticlesHeading = () => (
  <View style={styles.titleContainer}>
    <Text accessibilityRole="header" aria-level="3" style={styles.title}>
      Related articles
    </Text>
  </View>
);

export default RelatedArticlesHeading;
