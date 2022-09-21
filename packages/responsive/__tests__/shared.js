/* eslint-disable global-require */
import React from "react";
import { Dimensions } from "react-native";
import TestRenderer from "react-test-renderer";
import { setDimension } from "@times-components-native/mocks/dimensions";
import Responsive, { ResponsiveContext } from "../src/responsive";
import shared from "./shared.base";

jest.spyOn(Dimensions, "get").mockReturnValue({ width: 500, height: 1000 });

jest.mock("react-native-safe-area-context", () => ({
  initialWindowMetrics: {
    insets: {
      bottom: 10,
      top: 5,
    },
  },
}));

jest.mock("react-native-device-info", () => ({
  isTablet: () => false,
}));

export default () => {
  shared();

  it("width values should update on device rotation", () => {
    const testInstance = TestRenderer.create(
      <Responsive>
        <ResponsiveContext.Consumer>
          {(context) => JSON.stringify(context)}
        </ResponsiveContext.Consumer>
      </Responsive>,
    );

    expect(testInstance).toMatchSnapshot();
    setDimension({ height: 500, width: 1000 });
    expect(testInstance).toMatchSnapshot("after width update");
  });
};
