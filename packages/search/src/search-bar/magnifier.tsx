import React from "react";
import { RightOrientedGlassMagnifier } from "@times-components-native/icons/src/icons";
import { ViewStyle, View } from "react-native";

interface MagnifierProps {
  color?: string;
  style?: ViewStyle;
  testID?: string;
}

const Magnifier: React.FC<MagnifierProps> = ({ color, style, testID }) => (
  <View style={style} testID={testID}>
    <RightOrientedGlassMagnifier color={color} />
  </View>
);

export default Magnifier;
