import { Platform } from "react-native";
import Config from "react-native-config";
export { version } from "./package.json";

export const appToken = Platform.select({
  ios: Config.RN_NUK_NEW_RELIC_TOKEN_IOS, // NUK_NEW_RELIC_TOKEN on the iOS app
  android: Config.RN_NUK_NEW_RELIC_TOKEN_ANDROID, // NEW_RELIC_APP_TOKEN on the Android app
});
console.log("🚀 ~ file: newRelicConfig.js ~ line 9 ~ appToken", appToken);

export const agentConfiguration = {
  //Android Specific
  // Optional:Enable or disable collection of event data.
  analyticsEventEnabled: Platform.OS === "android",

  // Optional:Enable or disable crash reporting.
  crashReportingEnabled: true,

  // Optional:Enable or disable interaction tracing. Trace instrumentation still occurs, but no traces are harvested. This will disable default and custom interactions.
  interactionTracingEnabled: true,

  // Optional:Enable or disable reporting successful HTTP requests to the MobileRequest event type.
  networkRequestEnabled: true,

  // Optional:Enable or disable reporting network and HTTP request errors to the MobileRequestError event type.
  networkErrorRequestEnabled: true,

  // Optional:Enable or disable capture of HTTP response bodies for HTTP error traces, and MobileRequestError events.
  httpRequestBodyCaptureEnabled: true,

  //Android Specific
  // Optional: Enable or disable agent logging.
  loggingEnabled: Platform.OS === "android",

  //iOS Specific
  // Optional:Enable/Disable automatic instrumentation of WebViews
  webViewInstrumentation: Platform.OS === "ios",
};
