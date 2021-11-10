import type { AndroidLayerType } from "react-native-webview/lib/WebViewTypes";

/**
 * Due to various issues rendering very long web content on Android, we need to use a different
 * 'layer type' depending on the OS version.
 *
 * On Android API 28 and above, the 'none' layer type can result in crashes during any screen
 * animation (e.g. RecyclerView animations or the Android 12 overscroll stretch). The 'software'
 * layer type can result in web views not displaying at all. The 'hardware' layer type results
 * in fewer crashes.
 *
 * On Android API 27 and below, the 'hardware' layer type can result in immediate crashes. The
 * 'software' layer type can result in web views not displaying at all. The 'none' layer type
 * displays with no known issues.
 *
 * @param androidApiVersion Android API level of the OS version that is running on the device
 * @returns The layer type to use when rendering a WebView on Android.
 */
export const getAndroidWebViewLayerType: (
  androidApiVersion: number,
) => AndroidLayerType = function (androidApiVersion) {
  if (androidApiVersion >= 28) {
    return "hardware";
  }

  return "none";
};
