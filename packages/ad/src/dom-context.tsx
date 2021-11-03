import React, { useRef, useCallback, useState } from "react";
import { View, Linking, Platform, Dimensions } from "react-native";
import { WebView, WebViewMessageEvent } from "react-native-webview";
// @ts-ignore
import { Viewport } from "@skele/components";
import {
  getApplicationName,
  getBuildNumber,
  getBundleId,
  getDeviceId,
  getReadableVersion,
  getVersion,
} from "react-native-device-info";
import logger from "./utils/logger";
import styles, { calculateViewportVisible } from "./styles/index";
import { webviewEventCallbackSetupAsString } from "./utils/webview-event-callback-setup";
import { AdInitAsString } from "./utils/ad-init";

const { width: screenWidth } = Dimensions.get("screen");

const deviceInfo = {
  applicationName: getApplicationName(),
  buildNumber: getBuildNumber(),
  bundleId: getBundleId(),
  deviceId: getDeviceId(),
  readableVersion: getReadableVersion(),
  version: getVersion(),
};

interface DomContextType {
  baseUrl?: string;
  onRenderComplete?: () => null;
  onRenderError?: () => null;
  data?: any;
  isInline?: boolean;
  width?: number;
  height?: number;
}

const ViewportAwareView = Viewport.Aware(View);

export const hasDifferentOrigin = (url: string, baseUrl: string) =>
  url && url.indexOf(baseUrl) === -1 && url.indexOf("://") > -1;

export const urlHasBridgePrefix = (url: string) =>
  url.indexOf("react-js-navigation://") === 0;

export const isUrlChildOfBaseUrl = (url: string, baseUrl: string) =>
  url.indexOf(baseUrl) > -1 && url !== baseUrl;

export const openURLInBrowser = (url: string = "") =>
  Linking.canOpenURL(url).then((supported) => {
    if (!supported) throw new Error("Can't open url " + url);
    return Linking.openURL(url);
  });

const DOMContext = ({
  height: heightProp = 0,
  baseUrl = "",
  onRenderComplete = () => null,
  onRenderError = () => null,
  data = {},
  isInline = true,
  width = screenWidth,
}: DomContextType) => {
  const webViewRef = useRef<WebView>(null);
  const isVisible = useRef(false);

  const [loaded, setLoaded] = useState(false);
  const [height, setHeight] = useState(
    heightProp + Number(styles.containerAdditionalHeight.height),
  );

  const handleNavigationStateChange = useCallback(
    ({ url }) => {
      if (!urlHasBridgePrefix(url) && hasDifferentOrigin(url, baseUrl)) {
        webViewRef.current?.stopLoading();
        openURLInBrowser(url);
      }
      // CATCH ADS INSIDE "times.co.uk" domain.
      if (isUrlChildOfBaseUrl(url, baseUrl)) {
        webViewRef.current?.stopLoading();
        openURLInBrowser(url);
      }
    },
    [baseUrl, webViewRef],
  );

  const handleMessageEvent = useCallback(
    (e: WebViewMessageEvent) => {
      const json = e.nativeEvent.data;

      if (
        json.indexOf("isTngMessage") === -1 &&
        json.indexOf("unrulyLoaded") === -1
      ) {
        // don't try and process postMessage events from 3rd party scripts
        return;
      }
      const { type, detail } = JSON.parse(json);
      switch (type) {
        case "renderFailed":
          onRenderError();
          break;
        case "unrulyLoaded": {
          if (loaded && isVisible.current) {
            inViewport();
          }
          break;
        }
        case "renderComplete":
          onRenderComplete();
          break;
        case "setAdWebViewHeight": {
          const adHeight = detail.height;
          const webViewHeight =
            adHeight > 1
              ? adHeight + styles.containerAdditionalHeight.height
              : 0;

          setHeight(isInline ? adHeight : webViewHeight);
          break;
        }
        default:
          if (data.debug) logger(type, detail);
      }
    },
    [onRenderError, onRenderComplete, webViewRef],
  );

  const outViewport = useCallback(() => {
    isVisible.current = false;

    if (webViewRef.current) {
      webViewRef.current.injectJavaScript(`
        if (typeof unrulyViewportStatus === "function") {
          unrulyViewportStatus(${JSON.stringify({
            ...deviceInfo,
            visible: false,
          })});
        };
      `);
    }
  }, []);

  const loadAd = useCallback(() => {
    setLoaded(true);
  }, []);

  const inViewport = useCallback(() => {
    isVisible.current = true;

    if (webViewRef.current) {
      webViewRef.current.injectJavaScript(`
          if (typeof unrulyViewportStatus === "function") {
            unrulyViewportStatus(${JSON.stringify({
              ...deviceInfo,
              visible: true,
            })})
          };
        `);
    }
  }, [webViewRef]);

  // NOTE: if this generated code is not working, and you don't know why
  // because React Native doesn't report errors in webview JS code, try
  // connecting a debugger to the app, console.log(html), copy and paste
  // the HTML into a file and run it in a browser.
  const html = `
      <html>
        <head>
        <meta name="viewport" content="initial-scale=1,user-scalable=no">
        <style>
          html, body {
            height: 100%;
            width: 100%;
            margin: 0;
            padding: 0;
            overflow: hidden;
          }
        </style>
        <script>
          window.googletag = window.googletag || {};
          window.googletag.cmd = window.googletag.cmd || [];
          window.pbjs = window.pbjs || {};
          window.pbjs.que = window.pbjs.que || [];
          window.apstag = {
            _Q: [],
            addToQueue(action, d) {
              this._Q.push([action, d]);
            },
            fetchBids() {
              this.addToQueue("f", arguments);
            },
            init() {
              this.addToQueue("i", arguments);
            },
            setDisplayBids() { return null; },
            targetingKeys() {
              return [];
            }
          };
        </script>
        </head>
        <body>
          <div></div>
          <script>
            window.theTimesBaseUrl = "${String(baseUrl)}";
            window.postMessage = function(data) {
              var message = typeof data === "string" ? data : JSON.stringify(data);
              window.ReactNativeWebView.postMessage(message);
            };
            (${webviewEventCallbackSetupAsString})({window});
          </script>
          <script>
          (${AdInitAsString})({
            el: document.getElementsByTagName("div")[0],
            eventCallback: eventCallback,
            data: ${JSON.stringify(data)},
            platform: "native",
            window
          }).init();
          </script>
        </body>
      </html>
    `;

  return (
    // Note that this ViewportAwareView must be contained by a
    // Viewport.Tracker to work properly
    <ViewportAwareView onViewportEnter={loadAd} style={{ height, width }}>
      {(Platform.OS === "ios" || loaded) && (
        <WebView
          ref={webViewRef}
          onMessage={handleMessageEvent}
          onNavigationStateChange={handleNavigationStateChange}
          originWhitelist={
            Platform.OS === "android" ? ["http://.*", "https://.*"] : undefined
          }
          source={{ baseUrl, html }}
          allowsInlineMediaPlayback={true}
          androidLayerType={"software"}
        />
      )}
      {height !== 0 && (
        <ViewportAwareView
          onViewportEnter={inViewport}
          onViewportLeave={outViewport}
          style={calculateViewportVisible(height)}
        />
      )}
    </ViewportAwareView>
  );
};

export default DOMContext;
