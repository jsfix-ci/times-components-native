import { Linking } from "react-native";

export const hasDifferentOrigin = (url: string, baseUrl: string) =>
  url && url.indexOf(baseUrl) === -1 && url.indexOf("://") > -1;

export const urlHasBridgePrefix = (url: string) =>
  url.indexOf("react-js-navigation://") === 0;

export const isUrlChildOfBaseUrl = (url: string, baseUrl: string) =>
  url.indexOf(baseUrl) > -1 && url !== baseUrl;

export const openURLInBrowser = (url: string = "") =>
  Linking.canOpenURL(url).then((supported) => {
    if (!supported) return new Error("Can't open url " + url);
    return Linking.openURL(url);
  });
