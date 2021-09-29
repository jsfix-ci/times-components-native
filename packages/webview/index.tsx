import React from "react";
import WebView, { WebViewProps } from "react-native-webview";
import { NativeModules } from "react-native";

const config = NativeModules.ReactConfig;

export const WebViewWithConsent = (props: WebViewProps) => {
  let injectedJavaScriptBeforeContentLoaded =
    props.injectedJavaScriptBeforeContentLoaded || ``;

  injectedJavaScriptBeforeContentLoaded =
    `document.cookie='authId=${config.authId};'` +
    injectedJavaScriptBeforeContentLoaded;

  return (
    <WebView
      injectedJavaScriptBeforeContentLoaded={
        injectedJavaScriptBeforeContentLoaded
      }
      {...props}
    />
  );
};
