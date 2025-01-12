import { AppRegistry } from "react-native";
import { startNewRelicAgent } from "../../newRelicConfig";
import Page from "@times-components-native/pages";
import { FontStorage } from "@times-components-native/typeset";
import ttf from "../../fonts";
import { logboxSetup } from "@times-components-native/utils/src/logbox-utils";

logboxSetup();
startNewRelicAgent();

Object.keys(ttf).forEach(fontName => {
  FontStorage.registerFont(fontName, ttf[fontName]);
});

AppRegistry.registerComponent("Article", () => Page("Article"));
AppRegistry.registerComponent("AuthorProfile", () => Page("AuthorProfile"));
AppRegistry.registerComponent("Section", () => Page("Section"));
AppRegistry.registerComponent("Topic", () => Page("Topic"));
AppRegistry.registerComponent("Search", () => Page("Search"));
