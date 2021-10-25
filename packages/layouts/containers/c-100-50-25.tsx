import React, { ReactNode } from "react";
import { View } from "react-native";

import { MediaQuery } from "@times-components-native/hooks";

// A generic responsive Container
// EXTRA SMALL = 100
// SMALL = 50
// > SMALL = 25

type StyleObject = { [key: string]: string | number };

interface IProps {
  children: ReactNode;
  responsive?: boolean;
  style?: StyleObject;
}

function CHundredFiftyTwentyFive({
  children,
  responsive = true,
  style = {},
}: IProps) {
  const screenSize = MediaQuery();

  const getWidth = () => {
    switch (screenSize) {
      case "EXTRA SMALL":
        return "100%";
      case "SMALL":
        return "50%";
      default:
        return "25%";
    }
  };

  const width = responsive ? getWidth() : "100%";

  return (
    <View
      style={{
        width,
        ...style,
      }}
    >
      {children}
    </View>
  );
}

export default CHundredFiftyTwentyFive;
