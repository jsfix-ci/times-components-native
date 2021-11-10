import React, { ReactNode } from "react";
import { View } from "react-native";

import { MediaQuery } from "@times-components-native/hooks";

// A generic responsive Container
// EXTRA SMALL = 100
// SMALL = 50
// >SMALL = 40
interface IProps {
  children: ReactNode;
}

function CHundredFiftyForty({ children }: IProps) {
  const screenSize = MediaQuery();

  const getWidth = () => {
    switch (screenSize) {
      case "EXTRA SMALL":
        return "100%";
      case "SMALL":
        return "50%";
      default:
        return "40%";
    }
  };

  const width = getWidth();

  return (
    <View
      style={{
        width,
      }}
    >
      {children}
    </View>
  );
}

export default CHundredFiftyForty;