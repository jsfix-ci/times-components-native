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
  // data = {},
  // isInline = true,
  // onRenderError = () => null,
  // onRenderComplete = () => null,
  // width = screenWidth,
  // height: heightProp = 0,
  baseUrl = "",
}: DomContextType) => {
  const webViewRef = useRef<WebView>(null);
  // const isVisible = useRef(false);
  // only add additional height if and ad height is provided
  // const adHeight = heightProp
  //   ? heightProp + Number(styles.containerAdditionalHeight.height)
  //   : Number(styles.containerAdditionalHeight.height);

  // const [loaded, setLoaded] = useState(false);
  // const [height, setHeight] = useState(adHeight);

  // const handleNavigationStateChange = useCallback(
  //   ({ url }) => {
  //     if (!urlHasBridgePrefix(url) && hasDifferentOrigin(url, baseUrl)) {
  //       webViewRef.current?.stopLoading();
  //       openURLInBrowser(url);
  //     }
  //     // CATCH ADS INSIDE "times.co.uk" domain.
  //     if (isUrlChildOfBaseUrl(url, baseUrl)) {
  //       webViewRef.current?.stopLoading();
  //       openURLInBrowser(url);
  //     }
  //     console.log("HERE_ SECOND ONE!!", url, baseUrl);
  //   },
  //   [baseUrl, webViewRef],
  // );

  // const handleMessageEvent = useCallback(
  //   (e: WebViewMessageEvent) => {
  //     const json = e.nativeEvent.data;

  //     if (
  //       json.indexOf("isTngMessage") === -1 &&
  //       json.indexOf("unrulyLoaded") === -1
  //     ) {
  //       // don't try and process postMessage events from 3rd party scripts
  //       return;
  //     }
  //     console.log("HERE_ THIRD ONE!!");
  //     const { type, detail } = JSON.parse(json);

  //     switch (type) {
  //       case "renderFailed":
  //         onRenderError();
  //         break;
  //       case "unrulyLoaded": {
  //         if (loaded && isVisible.current) {
  //           inViewport();
  //         }
  //         break;
  //       }
  //       case "renderComplete":
  //         onRenderComplete();
  //         break;
  //       case "setAdWebViewHeight": {
  //         const adHeight = detail.height;
  //         const webViewHeight =
  //           adHeight > 1
  //             ? adHeight + styles.containerAdditionalHeight.height
  //             : 0;

  //         setHeight(isInline ? adHeight : webViewHeight);
  //         break;
  //       }
  //       default:
  //         if (data.debug) logger(type, detail);
  //     }
  //   },
  //   [onRenderError, onRenderComplete, webViewRef],
  // );

  // const outViewport = useCallback(() => {
  //   isVisible.current = false;

  //   //   if (webViewRef.current) {
  //   //     webViewRef.current.injectJavaScript(`
  //   //       if (typeof unrulyViewportStatus === "function") {
  //   //         unrulyViewportStatus(${JSON.stringify({
  //   //       ...deviceInfo,
  //   //       visible: false,
  //   //     })});
  //   //       };
  //   //     `);
  //   //   }
  // }, []);

  // const loadAd = useCallback(() => {
  //   setLoaded(true);
  // }, []);

  // const inViewport = useCallback(() => {
  //   isVisible.current = true;

  //   // if (webViewRef.current) {
  //   //   webViewRef.current.injectJavaScript(
  //   //     `
  //   //     if (typeof unrulyViewportStatus === "function") {
  //   //       unrulyViewportStatus(${JSON.stringify({
  //   //       ...deviceInfo,
  //   //       visible: true,
  //   //     })})
  //   //     };`,
  //   //   );
  //   // }
  // }, [webViewRef]);

  // NOTE: if this generated code is not working, and you don't know why
  // because React Native doesn't report errors in webview JS code, try
  // connecting a debugger to the app, console.log(html), copy and paste
  // the HTML into a file and run it in a browser.

  /**
   * The following HTML renders the ad lib by running a script which loads an iframe
   * into the div with the id, ad-news. This renders the advert or consent form.
   * This id determines what type of advert is shown with more options available here:
   * - https://nidigitalsolutions.jira.com/wiki/spaces/COMM/pages/3617390593/The+Times+-+Supported+Ad+Slots+Positions
   *
   * Notes:
   * - The window.nuk values are related to the selection of article to be shown
   * this allows the library to show relevant articles only
   *
   * - Lines 215 - 230 are related to consent of using the ad library
   * a user must give consent to see ads, this should have been given by now
   * but as these values are hardcoded mock data you should need to give consent in this POC
   */
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
              "commercialSection": "business",
              "pageTitle": "",
              "editionDate": "2022-03-15",
              "editionId": "de0bc2ca-c21e-4082-89b3-a2cd7d23254e",
              "tuples": {
                "cont": "art",
                "path": "/article/china-growth-fears-over-covid-surge-pushes-oil-below-100-and-knocks-shares-r8s9s3gbd",
              }
            },
            "article": {
              "articleId": "2d61cb0c-ac36-11ec-b5dd-c16e85f55725",
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
                "propertyId": 9751,
                "authId": "2d61cb0c-ac36-11ec-b5dd-c16e91f55725",
            }
          }
        </script>

        <script type="text/javascript" src="https://gdpr-tcfv2.sp-prod.net/wrapperMessagingWithoutDetection.js"></script>

      </head>
      <body>
          <div id="ad-header"></div>
          <div id="ad-news"></div>

          <script src="https://ads.thetimes.co.uk/prebid.times_render.min.js" defer=""></script>
          <script src="https://ads.thetimes.co.uk/ads.times_render.min.js" defer=""></script>
      </body>
    </html>
    `;

  return (
    // Note that this ViewportAwareView must be contained by a
    // Viewport.Tracker to work properly
    // <ViewportAwareView onViewportEnter={loadAd} style={{ height, width }}>
    <WebView
      ref={webViewRef}
      // onMessage={handleMessageEvent}
      // onNavigationStateChange={handleNavigationStateChange}
      source={{ html, baseUrl }}
      originWhitelist={
        Platform.OS === "android" ? ["http://.*", "https://.*"] : undefined
      }
      style={{ height: 290, width: 300 }}
      allowsInlineMediaPlayback={true}
      androidLayerType={"software"}
    />
    //   {height !== 0 && (
    //     <ViewportAwareView
    //       onViewportEnter={inViewport}
    //       onViewportLeave={outViewport}
    //       style={calculateViewportVisible(height)}
    //     />
    //   )}
    // </ViewportAwareView>
  );
};

export default DOMContext;
