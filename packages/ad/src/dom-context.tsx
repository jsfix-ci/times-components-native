import React, { useEffect, useState } from "react";
import {
  View,
  Platform,
  Dimensions,
  NativeModules,
  NativeEventEmitter,
} from "react-native";
import {
  WebView,
  WebViewMessageEvent,
  WebViewNavigation,
} from "react-native-webview";
import { Viewport } from "@skele/components";
import styles, { calculateViewportVisible } from "./styles/index";
import { webviewEventCallbackSetupAsString } from "./utils/webview-event-callback-setup";
// import { AdInitAsString } from "./utils/ad-init";
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

const { ArticleEvents } = NativeModules;
const articleEventEmitter = new NativeEventEmitter(ArticleEvents);

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

  const [loaded, setLoaded] = useState(true);
  const [height, setHeight] = useState(adHeight);

  useEffect(() => {
    const onArticleDisappearEventsListener = articleEventEmitter.addListener(
      "onArticleDisappear",
      onArticleDisappear,
    );

    return onArticleDisappearEventsListener.remove;
  }, []);

  /**
   * Destroys all ad slots when article is swiped off screen
   * Uses articleEventEmitter as articles are rendered whilst off screen
   * causing ads to continue playing when un-muted
   */
  const onArticleDisappear = () => {
    if (webViewRef.current && Platform.OS === "ios") {
      webViewRef.current.injectJavaScript(`
        /**
         *  destroySlots is added in the HTML provided to the webview
         *  used to destroy any live adverts post swiping away from current article
         */ 
        destroySlots();
        true;
      `);
    }
  };

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
    let data;
    try {
      data = JSON.parse(jsonData);
    } catch (error) {
      return;
    }
    const { type, detail } = data;

    // Don't process postMessage events from 3rd party scripts
    if (jsonData.indexOf("isTngMessage") === -1) {
      return;
    }

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

  /**
   * Used by viewport aware component to allow the advert in
   * the webview to render for android platforms.
   *
   * Currently doesn't work with its cause being the android scroll view wrapper.
   * Read more here - https://nidigitalsolutions.jira.com/browse/TNLT-9065
   */
  const loadAd = () => {
    setLoaded(true);
  };

  const outViewport = () => {
    // Logic for pausing OutStream ads which are visible on ios only
    if (webViewRef.current && Platform.OS === "ios") {
      const { networkId, adUnit, section } = data;

      // ID for iframe is configured by Google Ad Manager(GAM)
      webViewRef.current.injectJavaScript(`
        var frame = document.getElementById('google_ads_iframe_/${networkId}/${adUnit}/${section}_0');

        if (frame) {
          frame.contentWindow.postMessage({target: 'nexd', action: 'pause'});
        }

        true;
      `);
    }
  };

  const inViewport = () => {
    // Logic for playing OutStream ads which are visible on ios only
    if (webViewRef.current && Platform.OS === "ios") {
      const { networkId, adUnit, section } = data;

      // ID for iframe is configured by Google Ad Manager(GAM)
      webViewRef.current.injectJavaScript(`
        var frame = document.getElementById('google_ads_iframe_/${networkId}/${adUnit}/${section}_0');

        if (frame) {
          frame.contentWindow.postMessage({target: 'nexd', action: 'resume'});
        }

        true;
      `);
    }
  };

  const authId = `${NativeModules.ReactConfig.sourcepointAuthId}`;
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
      }
    </style>
    <script>
      window.nuk = {
        "ads": {
          "blocked": false,
          "commercialSection": "comment",
          "pageTitle": "",
          "editionDate": "2022-07-12",
          "editionId": "2ac1b6ed-c6b3-470a-a71c-5ffe911302fb",
          "tuples": {
            "cont": "art",
            "path": "article/the-tory-right-favours-betrayal-over-reality-btfwrhhh6",
            "cpn": "${String(authId)}"
          },
          "user": {
            "isLoggedIn": true,
          }
        },
        
      };
    </script>
    <script>
      !function () { var e = function () { var e, t = "__tcfapiLocator", a = [], n = window; for (; n;) { try { if (n.frames[t]) { e = n; break } } catch (e) { } if (n === window.top) break; n = n.parent } e || (!function e() { var a = n.document, r = !!n.frames[t]; if (!r) if (a.body) { var i = a.createElement("iframe"); i.style.cssText = "display:none", i.name = t, a.body.appendChild(i) } else setTimeout(e, 6); return !r }(), n.__tcfapi = function () { for (var e, t = arguments.length, n = new Array(t), r = 0; r < t; r++)n[r] = arguments[r]; if (!n.length) return a; if ("setGdprApplies" === n[0]) n.length > 3 && 2 === parseInt(n[1], 10) && "boolean" == typeof n[3] && (e = n[3], "function" == typeof n[2] && n[2]("set", !0)); else if ("ping" === n[0]) { var i = { gdprApplies: e, cmpLoaded: !1, cmpStatus: "stub" }; "function" == typeof n[2] && n[2](i) } else a.push(n) }, n.addEventListener("message", (function (e) { var t = "string" == typeof e.data, a = {}; try { a = t ? JSON.parse(e.data) : e.data } catch (e) { } var n = a.__tcfapiCall; n && window.__tcfapi(n.command, n.version, (function (a, r) { var i = { __tcfapiReturn: { returnValue: a, success: r, callId: n.callId } }; t && (i = JSON.stringify(i)), e.source.postMessage(i, "*") }), n.parameter) }), !1)) }; "undefined" != typeof module ? module.exports = e : e() }();
    </script>
    <script type="text/javascript">
      window._sp_ = {
        "config":{
          "mmsDomain": "https://cmp.thetimes.co.uk",
          "wrapperAPIOrigin": "https://wrapper-api.sp-prod.net/tcfv2",
          "accountId": 259,
          "propertyId": 5049,
          "authId": "${String(authId)}",
        }
      }
    </script>
    <script type="text/javascript" src="https://gdpr-tcfv2.sp-prod.net/wrapperMessagingWithoutDetection.js"></script>
    <script>
      window.theTimesBaseUrl = "${String(baseUrl)}";
      window.postMessage = function(data) {
      var message = typeof data === "string" ? data : JSON.stringify(data);
      window.ReactNativeWebView.postMessage(message);
      };
      (${webviewEventCallbackSetupAsString})({window});
    </script>
  </head>
  <body>
  <script>
  </script>
      <div style="display: flex; width: 100%; justify-content: center; align-items: center;">
        <div id="ad-news"></div>
      </div>
      <script src="https://ads.thetimes.co.uk/prebid.times_render.min.js" defer=""></script>
      <script src="https://ncu-ad-manager-thetimes-co-uk.s3.eu-west-1.amazonaws.com/branches/feature/scb-xxxx-testing-adlib-on-tnl-apps/ads.times_render.min.js?sdjflsd" defer=""></script>
  </body>
</html>
    `;

  return (
    <ViewportAwareView onViewportEnter={loadAd} style={{ height, width }}>
      {(Platform.OS === "ios" || loaded) && (
        <WebView
          ref={webViewRef}
          onMessage={handleMessageEvent}
          onNavigationStateChange={handleNavigationStateChange}
          source={{ html, baseUrl }}
          originWhitelist={
            Platform.OS === "android" ? ["http://.*", "https://.*"] : undefined
          }
          style={{
            height,
            width,
          }}
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
