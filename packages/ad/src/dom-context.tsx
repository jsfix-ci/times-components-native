import React, { useRef, useEffect } from "react";
import { View, Linking, Platform, NativeModules } from "react-native";
import { WebView } from "react-native-webview";

interface DomContextType {
  baseUrl?: string;
  onRenderComplete?: () => null;
  onRenderError?: () => null;
  data?: any;
  isInline?: boolean;
  width?: number;
  height?: number;
}

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

const DOMContext = ({ data = {}, baseUrl = "" }: DomContextType) => {
  const webViewRef = useRef<WebView>(null);

  useEffect(() => {
    console.log("EVENT HERE ------------");
    console.log("EVENT HERE - ", NativeModules.ReactConfig.sourcepointAuthId);
    console.log(
      "EVENT HERE - ",
      NativeModules.ReactConfig.sourcepointAccountId,
    );
    console.log("EVENT HERE - ", data.pageTargeting.aid);
    console.log("EVENT HERE - ", data.pageTargeting.section);
    console.log("EVENT HERE - ", data.slotTargeting.path);
  }, []);

  const handleMessageEvent = (e) => {
    console.log("EVENT HERE - ", e.nativeEvent.data);
  };

  const accountId = `${NativeModules.ReactConfig.sourcepointAccountId}`;
  const authId = `${NativeModules.ReactConfig.sourcepointAuthId}`;

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
              "commercialSection": "${String(data.pageTargeting.section)}",
              "pageTitle": "",
              "editionDate": "2022-03-15",
              "editionId": "de0bc2ca-c21e-4082-89b3-a2cd7d23254e",
              "tuples": {
                "cont": "art",
                "path": "/article/china-growth-fears-over-covid-surge-pushes-oil-below-100-and-knocks-shares-r8s9s3gbd",
              }
            },
            "article": {
              "articleId": "${String(data.pageTargeting.aid)}",
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
              "accountId": "${String(accountId)}",
              "propertyId": 9751,
              "authId": "${String(authId)}",
            }
          }
        </script>

        <script type="text/javascript" src="https://gdpr-tcfv2.sp-prod.net/wrapperMessagingWithoutDetection.js"></script>

        <script>

          // Used to test if the sourcepoint auth Id was sent to the webview
          (${function (window, id) {
            // post message sends event to the WebView onMessage handler
            // allowing us to log out what happens inside the webview
            window.ReactNativeWebView.postMessage(
              "EVENT HERE - auth id being passed into webview" + id,
            );
          }.toString()})(window, "${String(authId)}")
          
          // Used to show that source point is connected in our webview
          // https://documentation.sourcepoint.com/api/gdpr-tcf-v2-api/iab-__tcfapi-function#gettcdata-command 
          window.__tcfapi('getTCData', 2, function (data) {
            (${function (datainternal, window) {
              window.ReactNativeWebView.postMessage(
                JSON.stringify(datainternal),
              );
            }.toString()})(data, window)
          })

        </script>
      </head>
      <body>
          <div id="ad-news"></div>

          <script src="https://ads.thetimes.co.uk/prebid.times_render.min.js" defer=""></script>
          <script src="https://ads.thetimes.co.uk/ads.times_render.min.js" defer=""></script>
      </body>
    </html>
    `;

  return (
    <View style={{ height: 270, width: 300 }}>
      <WebView
        ref={webViewRef}
        onMessage={handleMessageEvent}
        // onNavigationStateChange={handleNavigationStateChange}
        source={{ html, baseUrl }}
        originWhitelist={
          Platform.OS === "android" ? ["http://.*", "https://.*"] : undefined
        }
        style={{ height: "100%", width: 300 }}
        allowsInlineMediaPlayback={true}
        androidLayerType={"software"}
      />
    </View>
  );
};

export default DOMContext;
