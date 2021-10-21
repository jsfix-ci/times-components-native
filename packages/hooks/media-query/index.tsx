import { useWindowDimensions } from "react-native";

export type TMediaQuerySize =
  | "EXTRA SMALL"
  | "SMALL"
  | "MEDIUM"
  | "LARGE"
  | "EXTRA LARGE";

function MediaQuery(): TMediaQuerySize {
  const { width, fontScale } = useWindowDimensions();
  const breakpoint = width / fontScale;

  let size: TMediaQuerySize = "EXTRA SMALL";

  // 480px, 768px, 1024px, and 1280px

  if (breakpoint >= 480 && breakpoint < 768) {
    size = "SMALL";
  }
  if (breakpoint >= 768 && breakpoint < 1024) {
    size = "MEDIUM";
  }
  if (breakpoint >= 1024 && breakpoint < 1280) {
    size = "LARGE";
  }
  if (breakpoint >= 1280) {
    size = "EXTRA LARGE";
  }

  return size;
}

export default MediaQuery;
