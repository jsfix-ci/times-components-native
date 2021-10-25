import React, { ReactNode } from "react";
import { View } from "react-native";

interface IProps {
  children: ReactNode;
}

// generic wrapper to hold a row of responsive containers
function RowWrapper({ children }: IProps) {
  return (
    <View style={{ flexDirection: "row", flexWrap: "wrap" }}>{children}</View>
  );
}

export default RowWrapper;
