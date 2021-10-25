import React, { ReactNode } from "react";
import { View } from "react-native";

import { MediaQuery } from "@times-components-native/hooks";

// A generic responsive Container
// EXTRA SMALL = 100
// > EXTRA SMALL = 50

interface IProps {
  children: ReactNode;
}

function CHundredFifty({ children }: IProps) {
  const screenSize = MediaQuery();

  const getWidth = () => {
    switch (screenSize) {
      case "EXTRA SMALL":
        return "100%";
      default:
        return "50%";
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

export default CHundredFifty;
