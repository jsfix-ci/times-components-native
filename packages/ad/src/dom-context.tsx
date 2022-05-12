import React, { useState } from "react";
import { View, Platform, Dimensions } from "react-native";
import {
  WebView,
  WebViewMessageEvent,
  WebViewNavigation,
} from "react-native-webview";
import { Viewport } from "@skele/components";
import styles from "./styles/index";
import { webviewEventCallbackSetupAsString } from "./utils/webview-event-callback-setup";
import { AdInitAsString } from "./utils/ad-init";
import {
  hasDifferentOrigin,
  isUrlChildOfBaseUrl,
  openURLInBrowser,
  urlHasBridgePrefix,
} from "./utils/dom-context-utils";
import logger from "./utils/logger";

const { width: screenWidth } = Dimensions.get("screen");

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

const DOMContext = ({
  height: heightProp = 0,
  baseUrl = "",
  onRenderComplete = () => null,
  onRenderError = () => null,
  data = {},
  isInline = true,
  width = screenWidth,
}: DomContextType) => {
  const webViewRef = React.useRef<WebView>(null);

  const adHeight = heightProp
    ? heightProp + Number(styles.containerAdditionalHeight.height)
    : 0;

  const [loaded, setLoaded] = useState(false);
  const [height, setHeight] = useState(adHeight);

  const handleNavigationStateChange = ({ url }: WebViewNavigation) => {
    if (!urlHasBridgePrefix(url) && hasDifferentOrigin(url, baseUrl)) {
      webViewRef.current?.stopLoading();
      openURLInBrowser(url);
    }
    // CATCH ADS INSIDE "times.co.uk" domain.
    if (isUrlChildOfBaseUrl(url, baseUrl)) {
      webViewRef.current?.stopLoading();
      openURLInBrowser(url);
    }
  };

  /**
   * Handles data transfer from the advert webview using eventCallback function calls,
   * eventCallback calls can be found in ad-init.js
   */
  const handleMessageEvent = (e: WebViewMessageEvent) => {
    const jsonData = e.nativeEvent.data;

    // Don't process postMessage events from 3rd party scripts
    if (jsonData.indexOf("isTngMessage") === -1) {
      return;
    }

    const { type, detail } = JSON.parse(jsonData);

    switch (type) {
      case "renderFailed":
        onRenderError();
        break;
      case "renderComplete":
        onRenderComplete();
        break;
      case "setAdWebViewHeight": {
        const adHeight = detail.height;
        const webViewHeight =
          adHeight > 1 ? adHeight + styles.containerAdditionalHeight.height : 0;

        setHeight(isInline ? adHeight : webViewHeight);
        break;
      }
      default:
        if (data.debug) logger(type, detail);
    }
  };

  const loadAd = () => {
    setLoaded(true);
  };

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
          <div id="ad-mpu"></div>
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
            el: document.querySelector("#ad-mpu"),
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
    </ViewportAwareView>
  );
};

export default DOMContext;
