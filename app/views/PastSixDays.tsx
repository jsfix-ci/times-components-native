import React from "react";
import { NavigationComponentProps } from "react-native-navigation";
import { StyleSheet, View } from "react-native";
import { Text } from "@times-components-native/text";

import { GillSansMTStdMedium } from "../utils/fonts";

export const PastSixDaysView: React.FC<NavigationComponentProps> = () => (
  <View style={styles.container}>
    <Text style={styles.title} testID="ViewTitle">
      Past Six Days
    </Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontFamily: GillSansMTStdMedium,
    fontSize: 20,
  },
});
