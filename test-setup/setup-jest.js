/* eslint-disable */
import Adapter from "enzyme-adapter-react-16";
import Enzyme from "enzyme";
import { NativeModules } from "react-native";
import mockRNCNetInfo from "@react-native-community/netinfo/jest/netinfo-mock.js";

Enzyme.configure({ adapter: new Adapter() });

if (typeof window !== "undefined")
  window.HTMLCanvasElement.prototype.getContext = () => null;

jest.mock("react-native-device-info", () => {
  return {
    getApplicationName: jest.fn(),
    getBuildNumber: jest.fn(),
    getBundleId: jest.fn(),
    getDeviceId: jest.fn(),
    getReadableVersion: jest.fn(),
    getVersion: jest.fn(),
  };
});

// const rn = require("react-native");
// jest.spyOn(rn, 'addListener')

jest.mock("react-native", () => {
  const rn = jest.requireActual("react-native");

  rn.NativeModules.ArticleEvents = {
    addListener: jest.fn(),
    onArticleLoaded: jest.fn(),
  };
  rn.NativeModules.SectionEvents = {
    addListener: jest.fn(),
    onSectionLoaded: jest.fn(),
    getSectionData: jest.fn().mockReturnValue(Promise.resolve("{}")),
  };
  rn.NativeModules.ReactAnalytics = { track: jest.fn() };
  return rn;
});

jest.mock("@react-native-community/netinfo", () => mockRNCNetInfo);

jest.mock("react-native-image-zoom-viewer", () => "ImageZoomView");

jest.mock("react-native/Libraries/Animated/NativeAnimatedHelper");
