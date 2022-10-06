import React, { useEffect, useState } from "react";
import {
  Dimensions,
  NativeEventEmitter,
  NativeModules,
  Platform,
  View,
} from "react-native";
import {
  WebView,
  WebViewMessageEvent,
  WebViewNavigation,
} from "react-native-webview";
import { isTablet } from "react-native-device-info";
import { Viewport } from "@skele/components";
import { calculateViewportVisible } from "./styles/index";
import { webviewEventCallbackSetupAsString } from "./utils/webview-event-callback-setup";
import {
  hasDifferentOrigin,
  isUrlChildOfBaseUrl,
  openURLInBrowser,
  urlHasBridgePrefix,
} from "./utils/dom-context-utils";

const config = NativeModules.ReactConfig;

const { width: screenWidth, height: screenHeight } = Dimensions.get("screen");

interface DomContextType {
  baseUrl: string;
  height: number;
  keyId?: string;
  sectionName: string;
  slotName?: string;
  width: number;
}

const { ArticleEvents } = NativeModules;
const articleEventEmitter = new NativeEventEmitter(ArticleEvents);

const ViewportAwareView = Viewport.Aware(View);

const DOMContext = (props: DomContextType) => {
  const {
    keyId = "",
    height,
    baseUrl,
    sectionName,
    slotName = "ad-inarticle-mpu",
    width = screenWidth,
  } = props;

  const getSlotId = () => {
    const slotId = slotName;
    switch (Number(keyId)) {
      case 12:
        return `${slotId}-1`;
      case 18:
        return `${slotId}-2`;
      default:
        return slotId;
    }
  };
  const slotId = getSlotId();
  const webViewRef = React.useRef<WebView>(null);
  const [loadAd, setLoadAd] = useState(false);
  const [adHeight, setAdHeight] = useState(0);
  const [padding, setPadding] = useState(0);
  const networkId = config.adNetworkId;
  const adUnit =
    Platform.OS === "ios" ? "thetimes.mob.ios" : "thetimes.mob.android";

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
    if (webViewRef.current) {
      webViewRef.current.injectJavaScript(`
         newsUkAdLibrary.dynamicRemoveSlotRender("${slotId}")
         .then(newsUkAdLibrary.dynamicSlotRender(newsUkAdLibrary.getSlotConfigsById("${slotId}")));
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

  const handleMessageEvent = (event: WebViewMessageEvent) => {
    try {
      const data = JSON.parse(event.nativeEvent.data);
      //console.log("AD DATA: ", data);
      switch (data.type) {
        case "slotOnLoad":
          const isOneByOne = data.size[0] == 1 && data.size[1] == 1;
          setAdHeight(isOneByOne ? screenHeight : data.size[1]);
          setPadding(20);
          return;
        default:
          return;
      }
    } catch (error) {
      console.log("AD JSON ERROR: ", error);
      console.log(event.nativeEvent.data);
      return;
    }
  };

  const outViewport = () => {
    // Logic for pausing OutStream ads which are visible on ios only
    if (webViewRef.current && Platform.OS === "ios") {
      // ID for iframe is configured by Google Ad Manager(GAM)
      webViewRef.current.injectJavaScript(`
        var frame = document.getElementById('google_ads_iframe_/${networkId}/${adUnit}/${sectionName}_0');

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
      // ID for iframe is configured by Google Ad Manager(GAM)
      webViewRef.current.injectJavaScript(`
        var frame = document.getElementById('google_ads_iframe_/${networkId}/${adUnit}/${sectionName}_0');

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
          "commercialSection": ${sectionName},
          "tuples": {
            "cont": "${slotName === "ad-section" ? "sec" : "art"}",
            "path": "",
            "cpn": "${String(authId)}",
            "device": ${isTablet() ? "tablet" : "mobile"},
          },
        },
        "user": {
          "isLoggedIn": true,
        }
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
      <div id="testId" style="display: flex; width: 100%; align-content: center; justify-content: center; padding-top: ${padding}px; padding-bottom: ${padding}px;">
        <div id="${slotId}"></div>
      </div>
      <script src="${
        Platform.OS === "ios"
          ? "https://ncu-ad-manager-thetimes-co-uk.s3.eu-west-1.amazonaws.com/branches/feature/scb-2046-readding-additional-slots/ads.times_ios.min.js"
          : "https://ads.thetimes.co.uk/ads.times_android.min.js"
      }" ></script>
      <script>
        function checkForGoogleTag() {
          if (window.googletag && window.googletag.pubadsReady) {
            window.googletag.pubads().addEventListener('slotRenderEnded', function(event) {
              const size = event && event.size || [0,0];
              // for debug-forensic sake
              window.lastEventSize = size;
              const res = JSON.stringify({ "size": size, "type":"slotOnLoad"});
              window.ReactNativeWebView.postMessage(res)
            });
            return;
          }
          window.setTimeout(checkForGoogleTag, 100);
        }
        checkForGoogleTag();
      </script>
  </body>
</html>
    `;

  const webViewStyle = {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    height: adHeight,
    width,
  };
  console.log("🚀 ~ file: dom-context.tsx ~ line 254 ~ DOMContext ~ webViewStyle", webViewStyle)
  const viewPortStyle = {
    height: adHeight + padding * 2,
    width,
  };
  console.log("🚀 ~ file: dom-context.tsx ~ line 258 ~ DOMContext ~ viewPortStyle", viewPortStyle)

  const source = { html, baseUrl };

  return (
    <ViewportAwareView
      onViewportEnter={() => setLoadAd(true)}
      style={viewPortStyle}
    >
      {loadAd && (
        <WebView
          cacheEnabled={false}
          cacheMode={"LOAD_NO_CACHE"}
          incognito={true}
          ref={webViewRef}
          onMessage={handleMessageEvent}
          onNavigationStateChange={handleNavigationStateChange}
          source={{ html, baseUrl }}
          originWhitelist={
            Platform.OS === "android" ? ["http://.*", "https://.*"] : undefined
          }
          style={{
            alignItems: "center",
            justifyContent: "center",
            flex: 1,
            height: adHeight,
            width,
          }}
          style={webViewStyle}
          allowsInlineMediaPlayback={true}
          androidLayerType={"software"}
        />
      )}
      {adHeight !== 0 && (
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
