import { Linking } from "react-native";
import {
  hasDifferentOrigin,
  urlHasBridgePrefix,
  isUrlChildOfBaseUrl,
  openURLInBrowser,
} from "../../src/utils/dom-context-utils";

export default () => {
  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it("hasDifferentOrigin does not allow empty string origins", () => {
    const result = hasDifferentOrigin("", "https://mock-url.com/");
    expect(result).toEqual("");
  });

  it("hasDifferentOrigin does not allow equal origins", () => {
    const result = hasDifferentOrigin(
      "https://mock-url.com/",
      "https://mock-url.com/",
    );
    expect(result).toEqual(false);
  });

  it("hasDifferentOrigin verifies if origin is the same", () => {
    const result = hasDifferentOrigin(
      "http://originB.com",
      "https://mock-url.com/",
    );
    expect(result).toEqual(true);
  });

  it("hasDifferentOrigin returns false if incorrect URL was provided", () => {
    const result = hasDifferentOrigin("about:blank", "https://mock-url.com/");
    expect(result).toEqual(false);
  });

  it("urlHasBridgePrefix should return true of url has react native prefix", () => {
    const result = urlHasBridgePrefix("react-js-navigation://foo");
    expect(result).toEqual(true);
  });

  it("urlHasBridgePrefix should return false if url does not have the react native prefix", () => {
    const result = urlHasBridgePrefix("react://foo");
    expect(result).toEqual(false);
  });

  it("isUrlChildOfBaseUrl should return true if url is child of baseUrl", () => {
    const result = isUrlChildOfBaseUrl("http://foo.com/this", "http://foo.com");
    expect(result).toEqual(true);
  });

  it("isUrlChildOfBaseUrl should return false if url is not child of baseUrl", () => {
    const result = isUrlChildOfBaseUrl("http://foo.com/this", "http://bar.com");
    expect(result).toEqual(false);
  });

  it("openURLInBrowser should try to open a link", done => {
    const navigateTo = "http://originB.com";

    openURLInBrowser(navigateTo).then(() => {
      expect(Linking.canOpenURL).toHaveBeenCalledWith(navigateTo);
      expect(Linking.openURL).toHaveBeenCalledWith(navigateTo);
      done();
    });
  });
};
