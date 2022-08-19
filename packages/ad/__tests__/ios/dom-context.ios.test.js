import React from "react";
import "../mocks";
import DOMContextNative from "../../src/dom-context";
import TestRenderer from "react-test-renderer";
import * as domContextUtils from "../../src/utils/dom-context-utils";

// prevent function sources appearing in snapshots
jest.mock(
  "../../src/utils/webview-event-callback-setup",
  () => "mockErrorHandler",
);
jest.mock("../../src/utils/ad-init", () => ({
  AdInitAsString: jest.fn(),
}));
jest.mock("react-native-webview", () => ({ WebView: "WebView" }));

describe("ios - dom-context", () => {
  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  const makeMessageEvent = (type, detail) => ({
    nativeEvent: {
      data: JSON.stringify({
        detail,
        isTngMessage: true,
        type,
      }),
    },
  });

  it("does not error on messages containing invalid JSON", () => {
    const testInstance = TestRenderer.create(<DOMContextNative />);

    const WebView = testInstance.root.findByType("WebView");

    const onMessageCall = () =>
      WebView.props.onMessage({
        nativeEvent: {
          data: "Non-JSON string e.g. sent by some 3rd party lib in WebView",
        },
      });

    expect(onMessageCall).not.toThrowError();
  });

  it("calls onRenderComplete when it receives a renderComplete event from the webview", () => {
    const onRenderComplete = jest.fn();

    const testInstance = TestRenderer.create(
      <DOMContextNative onRenderComplete={onRenderComplete} />,
    );

    const WebView = testInstance.root.findByType("WebView");

    expect(onRenderComplete).not.toHaveBeenCalled();

    WebView.props.onMessage(makeMessageEvent("renderComplete"));

    expect(onRenderComplete).toHaveBeenCalledTimes(1);
  });

  it("does not call webview ref injectJavascript when the ad height is not set and viewport NOT in view", () => {
    const mockInjectJavaScript = jest.fn();

    const webViewRefValue = {
      current: null,
    };

    Object.defineProperty(webViewRefValue, "current", {
      get: jest.fn(() => ({ injectJavaScript: mockInjectJavaScript })),
      set: jest.fn(() => ({ injectJavaScript: mockInjectJavaScript })),
    });

    jest.spyOn(React, "useRef").mockReturnValue(webViewRefValue);

    TestRenderer.create(<DOMContextNative height={0} />);

    expect(webViewRefValue.current.injectJavaScript).not.toHaveBeenCalled();
  });

  it("calls onRenderError when it receives a onRenderError event from the webview", () => {
    const onRenderError = jest.fn();

    const testInstance = TestRenderer.create(
      <DOMContextNative onRenderError={onRenderError} />,
    );

    const WebView = testInstance.root.findByType("WebView");

    expect(onRenderError).not.toHaveBeenCalled();
    WebView.props.onMessage(makeMessageEvent("renderFailed"));
    expect(onRenderError).toHaveBeenCalledTimes(1);
  });

  it("handleOriginChange should not open a link when the URL scheme is the magic prefix used by React Native postMessage", () => {
    const spy = jest.spyOn(domContextUtils, "openURLInBrowser");

    const testInstance = TestRenderer.create(
      <DOMContextNative baseUrl="www.thetimes.co.uk" />,
    );

    const WebView = testInstance.root.findByType("WebView");

    WebView.props.onNavigationStateChange({
      url: "react-js-navigation://foo",
    });

    expect(spy).not.toHaveBeenCalled();
  });
});
