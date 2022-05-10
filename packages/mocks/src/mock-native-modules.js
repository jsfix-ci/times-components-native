/* eslint-env jest */

export default () => {
  jest.mock("react-native", () => {
    const rn = jest.requireActual("react-native");
    rn.NativeModules.ReactConfig = { timezone: "Europe/London" };
    rn.NativeModules.ArticleEvents = {
      addListener: jest.fn(),
      removeListeners: jest.fn(),
    };
    rn.NativeModules.SectionEvents = {
      addListener: jest.fn(),
    };
    rn.NativeModules.ReactAnalytics = { track: jest.fn() };
    rn.NativeModules.Linking = { openURL: jest.fn() };
    return rn;
  });
};
