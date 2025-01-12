import { Dimensions } from "react-native";
import { tabletWidth } from "@times-components-native/styleguide";

export const acceptedWidths = [
  320,
  440,
  660,
  800,
  1080,
  1280,
  1440,
  1670,
  1920,
  2308,
];

// We want to ensure a small number of caches that are more frequently "warm"
// so we limit the number of resolutions we will request for assets
// across devices to a common set
export const normaliseWidthForAssetRequestCache = widthInPixels => {
  const nWidth = acceptedWidths.find(w => widthInPixels <= w);

  return nWidth || acceptedWidths[acceptedWidths.length - 1];
};

export const screenWidth = isTablet =>
  isTablet ? tabletWidth : Dimensions.get("window").width;
