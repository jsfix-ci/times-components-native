import { Platform } from "react-native";
export { version } from './package.json';

//TODO explore how to expose the tokens
export const appToken = Platform.select({
  ios: "<IOS-APP-TOKEN>", //NUK_NEW_RELIC_TOKEN
  android: "<ANDROID-APP-TOKEN>", //NEW_RELIC_APP_TOKEN
});

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
