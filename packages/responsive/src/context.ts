import { createContext } from "react";
import { Dimensions } from "react-native";
import { calculateResponsiveContext } from "./calculateResponsiveContext";
import { ContextType } from "./types";

const { fontScale, width, height } = Dimensions.get("window");

export default createContext<ContextType>(
  calculateResponsiveContext(width, height, fontScale),
);
