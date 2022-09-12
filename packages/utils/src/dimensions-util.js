import { Dimensions } from "react-native";

export const getDimensions = (
  width = Dimensions.get("window").width,
  height = Dimensions.get("window").height,
) => ({ width, height });

export const addDimensionsListener = (type, handler) => {
  Dimensions.addEventListener(type, handler);
  return handler;
};

export const removeDimensionsListener = (type, handler) => {
  Dimensions.removeEventListener(type, handler);
};
