import React from "react";
import { Linking, Platform } from "react-native";
import TestRenderer from "react-test-renderer";
import {
  addSerializers,
  compose,
  flattenStyleTransform,
  minimaliseTransform,
  minimalNativeTransform,
  print,
} from "@times-components-native/jest-serializer";

import InteractiveWrapper from "../../src/interactive-wrapper";

const omitProps = new Set([
  "javaScriptEnabled",
  "messagingEnabled",
  "saveFormDataDisabled",
  "scalesPageToFit",
  "thirdPartyCookiesEnabled",
]);

addSerializers(
  expect,
  compose(
    print,
    flattenStyleTransform,
    minimalNativeTransform,
    minimaliseTransform((value, key) => omitProps.has(key)),
  ),
);

const config = {
  dev: false,
  environment: "jest",
  platform: Platform.OS,
  version: "0.0.0",
};

afterEach(() => {
  jest.resetModules();
  jest.clearAllMocks();
});

beforeEach(() => {
  console.error = jest.fn(); // eslint-disable-line no-console
});

const setUpNavigationTest = canOpenURLImpl => {
  jest.spyOn(Linking, "canOpenURL").mockImplementation(canOpenURLImpl);
  jest
    .spyOn(Linking, "openURL")
    .mockImplementation(() => new Promise(resolve => resolve()));

  const interactiveWrapper = new InteractiveWrapper();
  interactiveWrapper.webview = {
    postMessage: jest.fn(),
    reload: jest.fn(),
  };
  return interactiveWrapper;
};

const props = {
  attributes: {
    chaptercounter: "Chapter%20one",
    heading: "A heading",
    standfirst: "A standfirst",
  },
  config,
  element: "chapter-header",
  id: "a0534eee-682e-4955-8e1e-84b428ef1e79",
  source:
    "//components.timesdev.tools/lib2/times-chapter-header-1.0.0/chapter-header.html",
};

it("renders correctly", () => {
  const testInstance = TestRenderer.create(<InteractiveWrapper {...props} />);
  expect(testInstance.toJSON()).toMatchSnapshot();
});

it("should not render if error", () => {
  const testInstance = TestRenderer.create(<InteractiveWrapper {...props} />);
  testInstance.root.instance.setState({ hasError: true });
  expect(testInstance.toJSON()).toMatchSnapshot();
});

it("openURLInBrowser should try to open a link", done => {
  setUpNavigationTest(() => Promise.resolve(true));

  const navigateTo = "https://www.thetimes.co.uk";

  InteractiveWrapper.openURLInBrowser(navigateTo)
    .then(() => {
      expect(Linking.canOpenURL).toHaveBeenCalledWith(navigateTo);
      expect(Linking.openURL).toHaveBeenCalledWith(navigateTo);
      done();
    })
    .catch(done);
});

it("openURLInBrowser should try to open an invalid link", done => {
  setUpNavigationTest(() => Promise.resolve(false));

  const navigateTo = "failing url";

  InteractiveWrapper.openURLInBrowser(navigateTo)
    .then(() => {
      expect(Linking.canOpenURL).toHaveBeenCalledWith(navigateTo);
      expect(console.error).toHaveBeenCalledWith("Cant open url", navigateTo); // eslint-disable-line no-console
      done();
    })
    .catch(done);
});

it("openURLInBrowser should try to open a link and fail", done => {
  setUpNavigationTest(() => Promise.reject(new Error("mock err")));

  const navigateTo = "failing url";

  InteractiveWrapper.openURLInBrowser(navigateTo)
    .then(() => {
      expect(Linking.canOpenURL).toHaveBeenCalledWith(navigateTo);
      expect(console.error).toHaveBeenCalled(); // eslint-disable-line no-console
      done();
    })
    .catch(done);
});

it("onLoadEnd sends a postMessage", () => {
  const component = setUpNavigationTest(() => Promise.resolve(true));
  component.onLoadEnd();
  expect(component.webview.postMessage).toHaveBeenCalled();
});

it("handleOnShouldStartLoadWithRequest should return error if canOpenURL throws error", done => {
  setUpNavigationTest(() => Promise.reject(new Error("mock err")));

  const navigateTo = "https://www.thetimes.co.uk";

  expect(InteractiveWrapper.openURLInBrowser(navigateTo)).rejects.toEqual({
    error: new Error("mock err"),
  });
  done();
});

it("handleOnShouldStartLoadWithRequest should initiate opening the URL in a browser", () => {
  const component = setUpNavigationTest(() => Promise.resolve(true));
  jest.spyOn(InteractiveWrapper, "openURLInBrowser");
  component.handleOnShouldStartLoadWithRequest({
    url: "https://www.thetimes.co.uk",
  });
  expect(InteractiveWrapper.openURLInBrowser).toHaveBeenCalled();
});

it("handleOnShouldStartLoadWithRequest should not open a link when the origin is the same", () => {
  const component = setUpNavigationTest(() => Promise.resolve(true));
  jest.spyOn(InteractiveWrapper, "openURLInBrowser");
  component.handleOnShouldStartLoadWithRequest({
    url:
      "http://jotn9sgpg6.execute-api.eu-west-1.amazonaws.com/same-origin-different-url",
  });
  expect(InteractiveWrapper.openURLInBrowser).not.toHaveBeenCalled();
});
