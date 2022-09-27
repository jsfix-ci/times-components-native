import React from "react";
import { render, screen } from "@testing-library/react-native";
import "react-native-device-info";
import "./mocks";

import Ad from "@times-components-native/ad";


//@ts-ignore TODO hydrate mock with sensible values and remove skip
const adConfig = { sectionName: "News", bidderSlots: [], globalSlots: [] };

jest.mock("react-native-device-info", () => {
  return {
    isTablet: jest.fn(),
  };
});

test.skip("** AD **", async () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  render(<Ad adConfig={adConfig} slotName="ad-section" />);

  expect(screen.toJSON()).toMatchSnapshot();
});
