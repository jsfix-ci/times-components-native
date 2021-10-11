import React, { ReactNode } from "react";
import { View, StyleProp, ViewStyle } from "react-native";
import calculateContentWidth from "@times-components-native/utils/src/calculate-content-width";

type Props = {
  orientation: string;
  windowWidth: number;
  style?: StyleProp<ViewStyle>;
  children: ReactNode;
};

const TabletContentContainer = ({
  orientation,
  windowWidth,
  style,
  children,
}: Props) => {
  console.log("STYLE: ", style);
  return (
    <View
      style={[
        {
          flex: 1,
          flexDirection: "row",
          justifyContent: "center",
          width: "100%", //calculateContentWidth(windowWidth, orientation),
          alignSelf: "center",
        },
        style,
      ]}
    >
      {children}
    </View>
  );
};

export default TabletContentContainer;
