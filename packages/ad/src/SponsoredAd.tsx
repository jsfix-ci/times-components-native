import React, { useCallback, useRef, useState } from "react";
import WebView, { WebViewMessageEvent } from "react-native-webview";
import { Linking, Platform, View, Dimensions, PixelRatio } from "react-native";
import { isTablet } from "react-native-device-info";
import { WebViewNavigation } from "react-native-webview/lib/WebViewTypes";

import styles, { TABLET_AD_HEIGHT } from "./styles";

const ratio = PixelRatio.get();
const { width } = Dimensions.get("window");

interface WebviewHeightCallbackSetupProps {
  window: any;
  document: any;
  MutationObserver: any;
  width: number;
  ratio: number;
}

const webviewHeightCallbackSetup = ({
  window,
  document,
  MutationObserver,
  width,
  ratio,
}: WebviewHeightCallbackSetupProps) => {
  "show source";
  window.ReactNativeWebView.postMessage(JSON.stringify({ running: "error" }));
  document.addEventListener("DOMContentLoaded", function () {
    const elementToObserve = document.getElementById("dianomi");

    window.ReactNativeWebView.postMessage(
      JSON.stringify({ running: elementToObserve.clientHeight }),
    );

    const observer = new MutationObserver(function () {
      try {
        const dianomiAdContainer = document.getElementById("dianomi");
        const adContainerClientHeight = dianomiAdContainer.clientHeight;

        const pixelWidthOfScreen = width * ratio;
        const normalisedAdContainerHeight =
          (pixelWidthOfScreen / window.innerWidth) * adContainerClientHeight;

        window.ReactNativeWebView.postMessage(
          JSON.stringify({ adContainerHeight: normalisedAdContainerHeight }),
        );
      } catch (error) {
        // In case of failure force showing of no ads, rather than showing a 1/2 broken ad
        window.ReactNativeWebView.postMessage(
          JSON.stringify({ adContainerHeight: 0, error: "error" }),
        );
      }
    });

    observer.observe(elementToObserve, {
      characterData: true,
      childList: true,
      attributes: true,
      subtree: true,
    });
  });
};

const isIOS = Platform.OS === "ios";

const handleRequest = (e: WebViewNavigation) => {
  if (isIOS && e.navigationType !== "click") return true;
  if (!isIOS && e.url.slice(0, 4) !== "http") return true;

  Linking.openURL(e.url);
  return false;
};

/*
 * These ids are sent to Dianomi to decide how many ads and
 * what ads to serve in the Webview
 */

interface dianomiContextIdType {
  dianomiContextId: string;
  adsDisplayed: number;
}
const dianomiContextIds: dianomiContextIdType[] = [
  { dianomiContextId: "251", adsDisplayed: 1 },
  { dianomiContextId: "250", adsDisplayed: 2 },
  { dianomiContextId: "244", adsDisplayed: 3 },
  { dianomiContextId: "243", adsDisplayed: 4 },
];

interface SponsoredAdProps {
  numberOfAds: 1 | 2 | 3 | 4;
}

const SponsoredAd: React.FC<SponsoredAdProps> = ({ numberOfAds }) => {
  const { dianomiContextId } = dianomiContextIds[numberOfAds - 1];
  const [height, setHeight] = useState<number>(0);
  const webview = useRef<WebView>(null);

  const handleOnMessage = useCallback((event: WebViewMessageEvent) => {
    if (event.nativeEvent.data && !isTablet()) {
      const eventData = JSON.parse(event.nativeEvent.data);
      if (eventData.adContainerHeight) {
        setHeight(parseInt(eventData.adContainerHeight) / ratio);
      }
    } else {
      setHeight(TABLET_AD_HEIGHT);
    }
  }, []);

  return (
    <View style={styles.sponsoredAdWrapper}>
      <WebView
        ref={webview}
        onMessage={handleOnMessage}
        style={{ height, width: "100%" }}
        containerStyle={{ width: "100%" }}
        originWhitelist={["*"]}
        onShouldStartLoadWithRequest={handleRequest}
        startInLoadingState={true}
        scalesPageToFit={Platform.OS === "android" ? true : false}
        scrollEnabled={false}
        source={{
          html: `
            <html>
              <body>
                <script type="text/javascript" id="dianomi_context_script" src="https://www.dianomi.com/js/contextfeed.js"></script>
                <div id="dianomi" class="dianomi_context" data-dianomi-context-id="${dianomiContextId}"></div>
                <script>
                  (${webviewHeightCallbackSetup.toString()})({window, document, MutationObserver, width:${width}, ratio:${ratio}});
                </script>
              </body>
            </html>
          `,
        }}
        javaScriptEnabled
        injectedJavaScriptForMainFrameOnly
        // Note that changing androidLayerType to "hardware" or "none" causes crashes on Android 12
        androidLayerType={"none"}
      />
    </View>
  );
};

export default SponsoredAd;
