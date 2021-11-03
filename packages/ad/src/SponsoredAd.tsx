import React, { useRef, useState } from "react";
import WebView, { WebViewMessageEvent } from "react-native-webview";
import { Linking, Platform, View } from "react-native";
import { isTablet } from "react-native-device-info";
import { WebViewNavigation } from "react-native-webview/lib/WebViewTypes";
import cheerio from "cheerio";

import styles, { getAdHeightForNAds, TABLET_AD_HEIGHT } from "./styles";

interface WebviewHeightCallbackSetupProps {
  window: any;
  MutationObserver: any;
}

const webviewHeightCallbackSetup = ({
  window,
  MutationObserver,
}: WebviewHeightCallbackSetupProps) => {
  "show source";
  const document = window.document;
  window.eventCallback = (type: any, content: any) => {
    window.ReactNativeWebView.postMessage(
      JSON.stringify({ rar: "the thing", type, content }),
    );
  };
  window.addEventListener("error", (ev: any) => {
    window.eventCallback(
      "error",
      `ev=${JSON.stringify(ev)},msg=${ev.message || ""}, line=${
        ev.lineno || ""
      }, col=${ev.colno || ""}`,
    );
  });
  // eslint-disable-next-line no-console
  window.console.error = (...args: any) => {
    window.eventCallback("error", args.join("\n"));
  };

  window.addEventListener("DOMContentLoaded", () => {
    try {
      const elementToObserve = document.getElementById("dianomi");

      window.ReactNativeWebView.postMessage(
        JSON.stringify({
          elementToObserve,
        }),
      );

      const observer = new MutationObserver(function () {
        const adElement = document.querySelector(".dianomi_context");
        const adHTML = adElement.innerHTML;
        const htmlFirstPass = adHTML.substring(
          adHTML.indexOf("https://www.dianomi.com"),
          adHTML.indexOf("</iframe>"),
        );
        const url = htmlFirstPass.substring(0, htmlFirstPass.indexOf(" ") - 1);
        fetch(url).then((result) => {
          result.text().then((parsedResult) => {
            window.ReactNativeWebView.postMessage(
              JSON.stringify({
                adHtml: parsedResult,
              }),
            );
          });
        });
      });

      observer.observe(elementToObserve, {
        characterData: false,
        childList: true,
        attributes: false,
      });
    } catch (e) {
      window.ReactNativeWebView.postMessage(
        JSON.stringify({ e, width: 0, height: 0 }),
      );
    }
  });
};

const isIOS = Platform.OS === "ios";

const handleRequest = (e: WebViewNavigation) => {
  if (isIOS && e.navigationType !== "click") return true;
  if (!isIOS && e.url.slice(0, 4) !== "http") return true;

  Linking.openURL(e.url);
  return false;
};

const scriptToInject = `window.postMessage = function(data) {
  window.ReactNativeWebView.postMessage(data);
};(${webviewHeightCallbackSetup.toString()})({window,MutationObserver});`;

const numberToContextID: Record<number, string> = {
  1: "251",
  2: "250",
  3: "244",
  4: "243",
};

interface SponsoredAdProps {
  numberOfAds?: number;
}

const SponsoredAd: React.FC<SponsoredAdProps> = ({ numberOfAds = 4 }) => {
  const [height, setHeight] = useState<number>(0);
  const webview = useRef<WebView>(null);

  const handleOnMessage = (event: WebViewMessageEvent) => {
    if (event.nativeEvent.data && !isTablet()) {
      const eventData = JSON.parse(event.nativeEvent.data);
      if (eventData && eventData.adHtml) {
        const $ = cheerio.load(eventData.adHtml);
        const numberOfAdsInHtml = $("div[id^='dianomi_ad_']").length;
        setHeight(getAdHeightForNAds(numberOfAdsInHtml));
      }
    } else {
      setHeight(TABLET_AD_HEIGHT);
    }
  };

  const contextId = numberToContextID[numberOfAds] || numberToContextID[4];
  return (
    <View style={styles.sponsoredAdWrapper}>
      <WebView
        ref={webview}
        onMessage={handleOnMessage}
        injectedJavaScriptBeforeContentLoaded={scriptToInject}
        style={{ ...styles.sponsoredAd, height }}
        originWhitelist={["*"]}
        onShouldStartLoadWithRequest={handleRequest}
        startInLoadingState={true}
        scrollEnabled={false}
        source={{
          html: `
            <script type="text/javascript" id="dianomi_context_script" src="https://www.dianomi.com/js/contextfeed.js"></script>
            <div id="dianomi" class="dianomi_context" data-dianomi-context-id="${contextId}"></div>
          `,
        }}
        javaScriptEnabled
        injectedJavaScriptForMainFrameOnly
        androidLayerType={"software"}
      />
    </View>
  );
};

export default SponsoredAd;
