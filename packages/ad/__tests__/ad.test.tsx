import React from "react";
import { render, screen } from "@testing-library/react-native";
import "react-native-device-info";
import "./mocks";

import Ad from "@times-components-native/ad";

jest.mock("react-native-device-info", () => {
  return {
    isTablet: jest.fn(),
  };
});

test("** AD **", async () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  render(
    <Ad
      adConfig={{ sectionName: "News", slug: "slug", isLive: false }}
      slotName="ad-section"
    />,
  );

  expect(screen.toJSON()).toMatchSnapshot();
});
