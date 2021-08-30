// eslint-disable-next-line import/prefer-default-export
import React, { Component } from "react";
export {
  setIsTablet,
  setDimension,
} from "@times-components-native/mocks/dimensions";

jest.mock("NativeAnimatedHelper", () => "NativeAnimatedHelper", {
  virtual: true,
});

jest.mock(
  "react-native-safe-area-view",
  () =>
    class MockSafeAreaView extends Component {
      render() {
        const { children } = this.props;
        return React.createElement("SafeAreaView", this.props, children);
      }
    },
);

jest.mock("react-native-safe-area-context", () => ({
  useSafeArea: () => ({ insets: null }),
}));

jest.mock("@times-components-native/gradient", () => ({
  OverlayGradient: "OverlayGradient",
}));

// eslint-disable-next-line global-require
jest.mock("@times-components-native/svgs", () => require("./mock-svg"));

jest.mock("@times-components-native/utils", () => {
  // eslint-disable-next-line global-require
  const actualUtils = jest.requireActual("../../utils");

  return {
    ...actualUtils,
    convertToPixels: (points) => points - 1,
  };
});
