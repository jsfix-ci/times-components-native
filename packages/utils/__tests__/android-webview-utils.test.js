import { getAndroidWebViewLayerType } from "../src/android-webview-utils";

describe("getAndroidWebViewLayerType", () => {
  it("returns 'hardware' on Android 9 and up", () => {
    for (let version of [28, 29, 30, 31]) {
      const layerType = getAndroidWebViewLayerType(version);
      expect(layerType).toEqual("hardware");
    }
  });
  it("returns 'none' on Android 8 and below", () => {
    for (let version of [21, 22, 23, 24, 25, 26, 27]) {
      const layerType = getAndroidWebViewLayerType(version);
      expect(layerType).toEqual("none");
    }
  });
});
