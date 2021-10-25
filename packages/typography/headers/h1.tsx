import React, { ReactNode } from "react";
import { Text } from "react-native";
import { MediaQuery } from "@times-components-native/hooks";

interface IProps {
  children: ReactNode;
}

function H1({ children }: IProps) {
  const screenSize = MediaQuery();

  const getFontSize = () => {
    switch (screenSize) {
      case "EXTRA SMALL":
        return 24;
      case "SMALL":
        return 28;
      case "MEDIUM":
        return 32;
      default:
        return 36;
    }
  };

  const fontSize = getFontSize();

  return (
    <Text style={{ fontSize }} maxFontSizeMultiplier={2}>
      {children}
    </Text>
  );
}

export default H1;
