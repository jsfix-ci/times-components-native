import { AppRegistry } from "react-native";
import Page from "@times-components-native/pages";
import { FontStorage } from "@times-components-native/typeset";
import ttf from "../../fonts";

Object.keys(ttf).forEach((fontName) => {
  FontStorage.registerFont(fontName, ttf[fontName]);
});

console.log('https://reactnative.dev/docs/hermes ENABLED =', !!global.HermesInternal);
AppRegistry.registerComponent("Article", () => Page("Article"));
AppRegistry.registerComponent("AuthorProfile", () => Page("AuthorProfile"));
AppRegistry.registerComponent("Section", () => Page("Section"));
AppRegistry.registerComponent("Topic", () => Page("Topic"));
AppRegistry.registerComponent("Search", () => Page("Search"));
